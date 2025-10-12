import { SupportedLanguage } from '@/models/locale';
import Image from 'next/image';

import bannerDesktop from '../../../public/banner.png';

// mobile banner tasarlayana kadar desktop banner kullandım .
// import bannerMobile from '../../../public/banner_mobile.png';

interface BannerProps {
  lang: SupportedLanguage;
}
export default function Banner({ }: BannerProps) {
  return (
    <section className="mb-20">
      {' '}
      {/* <-- boşluk eklendi */}
      <div className="h-48 bg-secondary-400 transition-all duration-300 max-md:h-32">
        <div className="relative flex h-full w-full justify-center overflow-hidden">
          <div className="relative z-10 flex h-full w-full max-md:h-32" />
          <Image
            alt="Luuppi banner"
            className="object-cover"
            draggable={false}
            quality={100}
            sizes="100vw"
            src={bannerDesktop}
            style={{ objectFit: 'cover' }}
            fill
            priority
          />
        </div>
      </div>
    </section>
  );
}
