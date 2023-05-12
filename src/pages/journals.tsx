/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import Connector from '../services/APIConnector'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  Sorting,
  WithSearch,
} from '@elastic/react-search-ui'
import { SearchDriverOptions } from '@elastic/search-ui'
import { Layout } from '@elastic/react-search-ui-views'
import '@elastic/react-search-ui-views/lib/styles/styles.css'
import Navbar from '../components/Navbar'
import Indicators from '../components/Indicators'
import ClearFilters from '../components/ClearFilters'
import CustomResultViewJournals from '../components/CustomResultViewJournals'
import ButtonFieldSelect from '../components/ButtonFieldSelect'
// import OperatorSelect from '../components/OperatorSelect'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'
type Props = {
  // Add custom props here
}
// or getServerSideProps: GetServerSideProps<Props> = async ({ locale })
export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'navbar'])),
  },
})

const connector = new Connector()

const configDefault = {
  debug: true,
  urlPushDebounceLength: 500,
  alwaysSearchOnInitialLoad: true,
  hasA11yNotifications: true,
  apiConnector: connector,
  searchQuery: {
    index: 'ca-journal',
    track_total_hits: true,
    operator: 'OR',
    search_fields: {
      title: {},
    },
    result_fields: {
      id: {
        raw: {},
      },
      title: {
        raw: {},
      },
      issn: {
        raw: {},
      },
    },
  },

}
type SortOptionsType = {
  name: string
  value: any[]
}
const SORT_OPTIONS: SortOptionsType[] = [
  {
    name: 'Relevance',
    value: [],
  },
  {
    name: 'Title ASC',
    value: [
      {
        field: 'title.keyword',
        direction: 'asc',
      },
    ],
  },
  {
    name: 'Title DESC',
    value: [
      {
        field: 'title.keyword',
        direction: 'desc',
      },
    ],
  },
]

export default function App() {
  const [config, setConfig] = useState(configDefault)
  const { t } = useTranslation('common')
  // tradução
  SORT_OPTIONS.forEach((option) => (option.name = t(option.name)))

  return (
    <div>
      <Navbar />
      <div className="page-search">
        <SearchProvider config={config}>
          <WithSearch
            mapContextToProps={({ wasSearched }) => ({ wasSearched })}
          >
            {({ wasSearched }) => {
              return (
                <div className="App">
                  <ErrorBoundary>
                    <div className="container page">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="page-title">
                            <h2>{t('Journals')}</h2>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="card search-card">
                            <div className="card-body">
                              <ul
                                className="nav nav-tabs"
                                id="myTab"
                                role="tablist"
                              >
                                <li className="nav-item" role="presentation">
                                  <ButtonFieldSelect
                                    title={t('Title')}
                                    active={true}
                                    config={config}
                                    searchField="name"
                                  />
                                </li>
                                <li className="nav-item" role="presentation">
                                  <ButtonFieldSelect
                                    title={t('Research field')}
                                    active={false}
                                    config={config}
                                    searchField="researchArea"
                                  />
                                </li>
                              </ul>
                              <div className="tab-content" id="myTabContent">
                                <div
                                  className="tab-pane fade show active"
                                  id="home"
                                  role="tabpanel"
                                  aria-labelledby="home-tab"
                                >
                                  <SearchBox
                                    view={({ value, onChange, onSubmit }) => (
                                      <form
                                        onSubmit={onSubmit}
                                        className="row g-3 mb-3"
                                      >
                                        <div className="col">
                                          <input
                                            className="form-control seacrh-box"
                                            type="text"
                                            value={value}
                                            onChange={(e) =>
                                              onChange(e.target.value)
                                            }
                                          />
                                        </div>
                                        <div className="col-auto">
                                          <input
                                            className="btn btn-light search-btn"
                                            type="submit"
                                            value={t('Search') || ''}
                                            disabled={
                                              !value || value.length < 3
                                            }
                                          />
                                        </div>
                                      </form>
                                    )}
                                  />
                                  <ClearFilters />
                                </div>

                                {/* <OperatorSelect config={config} /> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.content}>
                      <Layout
                        // header={}
                        sideContent={
                          <div>
                            {wasSearched && (
                              <Sorting
                              label={t('Sort by') || ''}
                                sortOptions={SORT_OPTIONS}
                              />
                            )}
                            {/* <Facet
                              key={'1'}
                              field={'nationality.keyword'}
                              label={'nacionalidade'}
                            />
                            <Facet
                              key={'2'}
                              field={'researchArea.keyword'}
                              label={'Área de pesquisa'}
                            /> */}
                          </div>
                        }
                        bodyContent={<Results resultView={CustomResultViewJournals} />}
                        bodyHeader={
                          <React.Fragment>
                            {wasSearched && <PagingInfo />}
                            {wasSearched && <ResultsPerPage />}
                          </React.Fragment>
                        }
                        bodyFooter={<Paging />}
                      />
                      <div className={styles.indicators}>
                        <div className="sui-layout-header">
                          <div className="sui-layout-header__inner"></div>
                        </div>
                        {/* <Indicators config={config} /> */}
                      </div>
                    </div>
                  </ErrorBoundary>
                </div>
              )
            }}
          </WithSearch>
        </SearchProvider>
      </div>
    </div>
  )
}