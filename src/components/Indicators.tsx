/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import useSWR, { Key } from 'swr'
import { withSearch } from '@elastic/react-search-ui'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  parsing: {
    xAxisKey: 'key',
    yAxisKey: 'doc_count',
  },
  responsive: true,
  aspectRatio: 1,
  plugins: {
    legend: {
      position: 'bottom' as const,
      display: false,
    },
    title: {
      display: true,
      text: 'Artigos por ano',
    },
  },
}

const fetcher = (args: any) =>
  fetch(args.url, {
    body: JSON.stringify(args.params),
    method: 'POST',
  }).then((res) => res.json())

const apiUrl: Key = '/api/charts'
function ListenFilters({ filters, searchTerm }) {
  const { data } = useSWR(
    {
      url: apiUrl,
      params: { filters, searchTerm, indicator: 'publicationDate.keyword' },
    },
    fetcher
  )

  const labels = data != null ? data.map((d: any) => d.key) : []
  return (
    <div className="container">
      <Bar
        options={options}
        width="500"
        data={{
          labels: labels,
          datasets: [
            {
              data: data,
              label: 'Artigos por ano',
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)',
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)',
              ],
              borderWidth: 1,
            },
          ],
        }}
      />
    </div>
  )
}

export default withSearch(({ filters, searchTerm }) => ({
  filters,
  searchTerm,
}))(ListenFilters)
