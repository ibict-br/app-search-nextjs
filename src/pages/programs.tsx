/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ErrorBoundary,
  Facet,
  Paging,
  PagingInfo,
  Results,
  ResultsPerPage,
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
import React, { useState } from 'react';
import CustomSearchBox from '../components/CustomSearchBox';
import DefaultQueryConfig from '../components/DefaultQueryConfig';
import CustomResultViewPrograms from '../components/customResultView/CustomResultViewPrograms';
import CustomViewPagingInfo from '../components/customResultView/CustomViewPagingInfo';
import ProgramsIndicators from '../components/indicators/ProgramsIndicators';
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

const INDEX_NAME = 'pesqdf-program';
const configDefault = {
  ...DefaultQueryConfig(INDEX_NAME),
  searchQuery: {
    operator: 'OR',
    search_fields: {
      name_text: {},
    },
    result_fields: {
      name: {
        raw: {},
      },
      orgunit: {
        raw: [],
      },
      capesResearchArea: {
        raw: {},
      },
      cnpqResearchArea: {
        raw: {},
      },
      evaluationArea: {
        raw: {},
      },
    },
    disjunctiveFacets: ['name', 'capesResearchArea'],
    facets: {
      name: { type: 'value' },
      capesResearchArea: { type: 'value' },
      cnpqResearchArea: { type: 'value' },
      'orgunit.name': { type: 'value' },
      evaluationArea: { type: 'value' },
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
      size: 4,
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

export default function App() {
  // const [config, setConfig] = useState(configDefault)
  const { t } = useTranslation('common');
  // tradução
  SORT_OPTIONS.forEach((option) => (option.name = t(option.name)));

  const [config, setConfig] = useState(configDefault);

  function updateOpetatorConfig(op: string) {
    setConfig({ ...config, searchQuery: { ...config.searchQuery, operator: op } });
  }

  const [indicatorsState, setIndicatorsState] = useState({
    config,
    data: [],
  });

  const receiveChildData = (data: any) => {
    setIndicatorsState(data);
  };

  return (
    <div>
      <Head>
        <title>{`BrCris - ${t('Programs')}`}</title>
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
                        <h1>{t('Programs')}</h1>
                      </div>
                    </div>

                    <div className={styles.content}>
                      <Layout
                        header={
                          <CustomSearchBox
                            titleFieldName="name"
                            itemLinkPrefix="gprog_"
                            updateOpetatorConfig={updateOpetatorConfig}
                            indexName={INDEX_NAME}
                          />
                        }
                        sideContent={
                          <div>
                            {wasSearched && <Sorting label={t('Sort by') || ''} sortOptions={SORT_OPTIONS} />}
                            <div className="filters">
                              {wasSearched && <span className="sui-sorting__label">{t('Filters')}</span>}
                            </div>
                            <Facet key={'1'} field={'name'} label={t('Name')} />
                            <Facet key={'2'} field={'orgunit.name'} label={t('Institution')} />
                            <Facet key={'3'} field={'capesResearchArea'} label={t('Capes research area')} />
                            <Facet key={'4'} field={'cnpqResearchArea'} label={t('CNPq research area')} />
                            <Facet key={'5'} field={'evaluationArea'} label={t('Evaluation area')} />
                          </div>
                        }
                        bodyContent={<Results resultView={CustomResultViewPrograms} />}
                        bodyHeader={
                          <React.Fragment>
                            {wasSearched && (
                              <div className="d-flex align-items-center">
                                <PagingInfo view={CustomViewPagingInfo} />
                                {/* <ClearFilters /> */}
                              </div>
                            )}
                            {wasSearched && <ResultsPerPage options={[10, 20, 50]} />}
                          </React.Fragment>
                        }
                        bodyFooter={<Paging />}
                      />
                      {/** 
                        // @ts-ignore */}
                      <ProgramsIndicators indicatorsState={indicatorsState} sendDataToParent={receiveChildData} />
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
