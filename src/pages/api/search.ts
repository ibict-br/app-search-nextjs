/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ElasticsearchAPIConnector from '@elastic/search-ui-elasticsearch-connector';
import { NextApiRequest, NextApiResponse } from 'next';
import { untranslatedFieldsNames } from '../../components/SearchSanitization';
import logger from '../../services/Logger';
import QueryFormat from '../../services/QueryFormat';
// https://docs.elastic.co/search-ui/api/connectors/elasticsearch#customise-the-elasticsearch-request-body
function builConnector(index: string) {
  const connector = new ElasticsearchAPIConnector(
    {
      host: process.env.HOST_ELASTIC,
      index: index || '',
      apiKey: process.env.API_KEY,
    },
    (requestBody, requestState, queryConfig) => {
      requestBody.track_total_hits = true;
      if (!requestState.searchTerm) return requestBody;

      // transforming the query before sending to Elasticsearch using the requestState and queryConfig
      const searchFields: any = queryConfig.search_fields;
      // @ts-ignore
      if (requestState.searchTerm.indexOf('(') < 0) {
        // @ts-ignore
        requestState.searchTerm = `(all:${requestState.searchTerm})`;
      }
      console.log('requestState.searchTerm', requestState.searchTerm);
      const query = untranslatedFieldsNames(requestState.searchTerm);
      console.log('query', query);
      const fullQuery = new QueryFormat().toElasticsearch(query, Object.keys(searchFields));
      requestBody.query = fullQuery;
      return requestBody;
    }
  );
  return connector;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { requestState, queryConfig } = req.body;
    const connector = builConnector(queryConfig.index);
    const response = await connector.onSearch(requestState, queryConfig);
    res.json(response);
  } catch (err) {
    logger.error(err);
    res.status(400).json({ error: err.message });
  }
}
