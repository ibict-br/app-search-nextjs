/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ErrorBoundary,
  Facet,
  Paging,
  PagingInfo,
  Results,
  ResultsPerPage,
  SearchBox,
  SearchProvider,
  Sorting,
  WithSearch,
} from '@elastic/react-search-ui';
import { Layout } from '@elastic/react-search-ui-views';
import '@elastic/react-search-ui-views/lib/styles/styles.css';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import React from 'react';
import ClearFilters from '../components/ClearFilters';
import CustomResultViewInstitutions from '../components/customResultView/CustomResultViewInstitutions';
import OrgUnitIndicators from '../components/indicators/OrgUnitIndicators';
import Connector from '../services/APIConnector';
import styles from '../styles/Home.module.css';
type Props = {
  // Add custom props here
};
// or getServerSideProps: GetServerSideProps<Props> = async ({ locale })
export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'navbar'])),
  },
});

const INDEX_NAME = 'pesqdf-orgunit';
const connector = new Connector(INDEX_NAME);
const config = {
  debug: true,
  urlPushDebounceLength: 500,
  alwaysSearchOnInitialLoad: true,
  hasA11yNotifications: true,
  apiConnector: connector,
  searchQuery: {
    track_total_hits: true,
    operator: 'OR',
    search_fields: {
      name_text: {},
    },
    result_fields: {
      id: {
        raw: {},
      },
      name: {
        raw: {},
      },
      country: {
        raw: {},
      },
      state: {
        raw: {},
      },
      city: {
        raw: {},
      },
      vivo_link: {
        raw: {},
      },
    },
    facets: {
      country: { type: 'value' },
      state: { type: 'value' },
      city: { type: 'value' },
    },
  },
  autocompleteQuery: {
    results: {
      resultsPerPage: 5,
      search_fields: {
        name_suggest: {
          weight: 3,
        },
      },
      result_fields: {
        name: {
          snippet: {
            size: 100,
            fallback: true,
          },
        },
        vivo_link: {
          raw: {},
        },
      },
    },
    suggestions: {
      types: {
        results: { fields: ['name_completion'] },
      },
      size: 5,
    },
  },
};
type SortOptionsType = {
  name: string;
  value: any[];
};
const SORT_OPTIONS: SortOptionsType[] = [
  {
    name: 'Relevance',
    value: [],
  },
  {
    name: 'Nome ASC',
    value: [
      {
        field: 'name',
        direction: 'asc',
      },
    ],
  },
  {
    name: 'Nome DESC',
    value: [
      {
        field: 'name',
        direction: 'desc',
      },
    ],
  },
];

const indicatorsState = {
  config,
  data: [],
};

export default function App() {
  // const [config, setConfig] = useState(configDefault)
  const { t } = useTranslation('common');
  // tradução
  SORT_OPTIONS.forEach((option) => (option.name = t(option.name)));

  return (
    <div>
      <Head>
        <title>{`BrCris - ${t('Institutions')}`}</title>
      </Head>
      <div className="page-search">
        <SearchProvider config={config}>
          <WithSearch mapContextToProps={({ wasSearched }) => ({ wasSearched })}>
            {({ wasSearched }) => {
              return (
                <div className="App">
                  <ErrorBoundary>
                    <div className="container page">
                      <div className="page-title">
                        <h2>{t('Institutions')}</h2>
                      </div>
                    </div>

                    <div className={styles.content}>
                      <Layout
                        header={
                          <SearchBox
                            autocompleteMinimumCharacters={3}
                            autocompleteResults={{
                              linkTarget: '_blank',
                              sectionTitle: t('Open link') || '',
                              titleField: 'name',
                              urlField: 'vivo_link',
                              shouldTrackClickThrough: true,
                            }}
                            autocompleteSuggestions={false}
                            debounceLength={0}
                          />
                        }
                        sideContent={
                          <div>
                            {wasSearched && <Sorting label={t('Sort by') || ''} sortOptions={SORT_OPTIONS} />}
                            <div className="filters">
                              <span className="sui-sorting__label">{t('Filters')}</span>
                            </div>
                            <Facet key={'1'} field={'country'} label={t('Country')} />
                            <Facet key={'2'} field={'state'} label={t('State')} />
                            <Facet key={'3'} field={'city'} label={t('City')} />
                          </div>
                        }
                        bodyContent={<Results resultView={CustomResultViewInstitutions} />}
                        bodyHeader={
                          <React.Fragment>
                            {wasSearched && (
                              <div className="d-flex align-items-center">
                                <PagingInfo />
                                <ClearFilters />
                              </div>
                            )}
                            {wasSearched && <ResultsPerPage />}
                          </React.Fragment>
                        }
                        bodyFooter={<Paging />}
                      />
                      <div className={styles.indicators}>
                        {/** 
                        // @ts-ignore */}
                        <OrgUnitIndicators indicatorsState={indicatorsState} />
                      </div>
                    </div>
                  </ErrorBoundary>
                </div>
              );
            }}
          </WithSearch>
        </SearchProvider>
      </div>
    </div>
  );
}
