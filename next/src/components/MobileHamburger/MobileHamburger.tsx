'use client';
import { NavLink, navLinksMobile } from '@/libs/constants';
import { Dictionary, SupportedLanguage } from '@/models/locale';
import { Session } from 'next-auth';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState } from 'react';
import { FaLockOpen } from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import './MobileHamburger.css';

const InstallPwaButton = dynamic(() => import('./InstallPwaButton'), {
  ssr: false,
});

interface MobileNavbarProps {
  dictionary: Dictionary;
  lang: SupportedLanguage;
  session: Session | null;
}

export default function MobileHamburger({
  dictionary,
  lang,
  session,
}: MobileNavbarProps) {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const displayLink = (link: NavLink): boolean => {
    const isAuthenticated = Boolean(
      link.authenticationLevel === 'authenticated' && session?.user,
    );
    const isLuuppiHato = Boolean(
      link.authenticationLevel === 'luuppi-hato' && session?.user?.isLuuppiHato,
    );
    const isUnrestricted = !link.authenticationLevel;

    // TODO: Remove this when migration period is over
    if (
      link.translation === 'migrate_account' &&
      session?.user?.isLuuppiMember
    ) {
      return false;
    }

    return isAuthenticated || isLuuppiHato || isUnrestricted;
  };

  return (
    <>
      <button
        aria-label={
          open
            ? `${dictionary.general.close} ${dictionary.general.menu.toLowerCase()}`
            : `${dictionary.general.open} ${dictionary.general.menu.toLowerCase()}`
        }
        className="btn btn-ghost lg:hidden"
        onClick={toggleMenu}
      >
        <HiMenu size={34} />
      </button>
      <dialog
        className={`modal text-base-content ${open && 'modal-open lg:hidden'}`}
        id="mobileNavbar"
      >
        <div className="modal-box flex h-full min-h-dvh w-screen max-w-full gap-4 rounded-none">
          <ul className="menu h-max w-full flex-nowrap gap-2">
            {navLinksMobile
              .filter((link) => displayLink(link))
              .map((link, index) => (
                <li
                  key={link.translation}
                  className={`${index === navLinksMobile.length - 1 ? 'pb-6' : ''}`}
                >
                  {Boolean(link.sublinks?.length) ? (
                    <div className="flex items-center justify-between bg-secondary-400 font-bold text-white hover:cursor-auto hover:bg-secondary-400">
                      {
                        dictionary.navigation[
                        link.translation as keyof typeof dictionary.navigation
                        ]
                      }
                    </div>
                  ) : (
                    <Link
                      className="flex items-center justify-between font-bold"
                      href={
                        link.href?.startsWith('/')
                          ? `/${lang}${link.href as string}`
                          : link.href!
                      }
                      onClick={() => setOpen(false)}
                    >
                      <span>
                        {
                          dictionary.navigation[
                          link.translation as keyof typeof dictionary.navigation
                          ]
                        }
                      </span>
                      {link.authenticationLevel && (
                        <FaLockOpen className="text-gray-400/50" size={18} />
                      )}
                    </Link>
                  )}
                  {Boolean(link.sublinks?.length) && (
                    <ul className="my-4">
                      {link.sublinks?.map((sublink) => (
                        <li key={sublink.translation}>
                          <Link
                            className={`${sublink.href === '/'
                              ? 'disabled cursor-not-allowed opacity-50'
                              : ''
                              } font-bold`} // TODO: REMOVE DISABLED LINKS
                            href={
                              sublink.href.startsWith('/')
                                ? `/${lang}${sublink.href as string}`
                                : sublink.href
                            }
                            onClick={() => setOpen(false)}
                          >
                            {
                              dictionary.navigation[
                              sublink.translation as keyof typeof dictionary.navigation
                              ]
                            }
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            <li>
              <InstallPwaButton dictionary={dictionary} />
            </li>
          </ul>
          <div className="sticky top-0 z-10 flex justify-end">
            <div className="flex h-full flex-col items-center gap-4">
              <button
                aria-label={`${dictionary.general.close} ${dictionary.general.menu.toLowerCase()}`}
                className="btn btn-circle btn-primary"
                onClick={() => setOpen(false)}
              >
                <IoMdClose size={32} />
              </button>
              <LanguageSwitcher />

            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
