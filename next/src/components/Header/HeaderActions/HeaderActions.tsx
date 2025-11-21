'use client';
import MobileHamburger from '@/components/MobileHamburger/MobileHamburger';
import { Dictionary, SupportedLanguage } from '@/models/locale';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { RiLoginCircleLine } from 'react-icons/ri';
import UserDropdown from '../../UserDropdown/UserDropdown';

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
      <div className="flex items-center justify-center max-lg:hidden" />
      {session && (
        <div className="flex items-center justify-center max-lg:hidden">
          <UserDropdown dictionary={dictionary} lang={lang} session={session} />
        </div>
      )}
      {!session && (
        <Link href="/auth/login">
          <button
            className={
              'custom-scroll-text btn btn-ghost flex items-center rounded-lg bg-primary-600 px-4 py-2 text-lg font-bold transition-all max-xl:text-base max-lg:hidden'
            }
            type="button"
          >
            {dictionary.general.login}
            <RiLoginCircleLine className="ml-2 inline-block" size={24} />
          </button>
        </Link>
      )}
      <MobileHamburger dictionary={dictionary} lang={lang} session={session} />
    </>
  );
}