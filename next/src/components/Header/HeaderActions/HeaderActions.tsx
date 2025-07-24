'use client';
import MobileHamburger from '@/components/MobileHamburger/MobileHamburger';
import { Dictionary, SupportedLanguage } from '@/models/locale';
import { useSession } from 'next-auth/react';

interface HeaderActionsProps {
  dictionary: Dictionary;
  lang: SupportedLanguage;
}

export default function HeaderActions({
  dictionary,
  lang,
}: HeaderActionsProps) {
  const { data } = useSession();
  const session = data;

  return (
    <>

      <MobileHamburger dictionary={dictionary} lang={lang} session={session} />
    </>
  );
}
