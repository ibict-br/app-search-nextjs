import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Iframe from '../../components/dashboards/Iframe';

type Props = {
  // Add custom props here
};
// or getServerSideProps: GetServerSideProps<Props> = async ({ locale })
export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'navbar'])),
  },
});

export default function Theses() {
  const { t } = useTranslation('common');
  return (
    <>
      <Head>
        <title>{`BrCris - ${t('Theses and Dissertations dashboard')}`}</title>
      </Head>
      <div className="page-search">
        <div className="App">
          <div className="container page">
            <div className="page-title">
              <h1>{t('Theses and Dissertations dashboard')}</h1>
            </div>
            <Iframe url="https://dashboardbrcris.ibict.br/app/dashboards#/view/174dc8c0-d73b-11ee-99d5-5b22668b83a8?embed=true&amp;_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-15m%2Cto%3Anow))" />
          </div>
        </div>
      </div>
    </>
  );
}
