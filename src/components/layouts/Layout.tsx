/* eslint-disable @typescript-eslint/ban-ts-comment */
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';
import { Alert } from '../Alert';
import Footer from '../Footer';
import Navbar from '../Navbar';
import CookieConsent from '../banners/CookieConsent';

export default function Layout({ children }: PropsWithChildren) {
  const BRCRIS_HOST_BASE = process.env.BRCRIS_HOST_BASE || 'https://brcris.ibict.br';
  const router = useRouter();
  const locales = router.locales;
  const defaultLocale = router.defaultLocale;
  const currentPath = router.asPath;
  console.log('router:', router);
  return (
    <>
      <Head>
        {locales?.map((lang) => (
          <link
            key={lang}
            rel="alternate"
            hrefLang={lang}
            href={`${BRCRIS_HOST_BASE}${lang != defaultLocale ? '/' + lang : ''}${currentPath}`}
          />
        ))}
      </Head>
      <Navbar />
      <Alert />
      <main>{children}</main>
      <CookieConsent />
      <Footer />
    </>
  );
}
