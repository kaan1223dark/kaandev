import { NextRequest } from 'next/server';
import 'server-only';
import { stripe } from '.';
import { logger } from '../utils/logger';
import { getRawBody } from '../utils/raw-body';

export const checkReturn = async (req: NextRequest) => {
  const sig = req.headers.get('stripe-signature');

  // 👇 Eğer ortam değişkeni yoksa, MOCK veriyi döndür
  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    logger.info('Stripe webhook secret or signature missing — using mock result');
    return {
      orderId: 'mock-order-id',
      successful: true,
      status: 'completed',
    };
  }

  try {
    const rawBody = await getRawBody(req);
    const event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    switch (event.type) {
      case 'checkout.session.completed':
        // Payment successful
        const session = event.data.object;
        return {
          orderId: session.metadata?.orderId,
          successful: true,
          status: 'completed',
        };

      case 'checkout.session.expired':
        return {
          orderId: event.data.object.metadata?.orderId,
          successful: false,
          status: 'expired',
        };

      case 'payment_intent.payment_failed':
        return {
          orderId: event.data.object.metadata?.orderId,
          successful: false,
          status: 'failed',
        };

      case 'payment_intent.canceled':
        return {
          orderId: event.data.object.metadata?.orderId,
          successful: false,
          status: 'canceled',
        };
    }

    return null;
  } catch (error) {
    logger.error('Error processing webhook', error);
    throw new Error('Error processing webhook');
  }
};

