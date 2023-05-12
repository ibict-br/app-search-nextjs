/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
// @ts-ignore
const Graph = dynamic(import('react-graph-vis'), { ssr: false })
import 'vis-network/styles/vis-network.css'
// import { Edge, Node, Options } from 'vis-network'
import { useTranslation } from 'next-i18next'
import { Node } from 'vis'

// Exemplo https://codesandbox.io/s/vis-test-fhir-test-2-forked-0m1l1x?file=/src/index.js:1774-1820
const nodes: Node[] = [
  {
    id: 1,
    label: 'Publications',
    title: '40.565 ',
    level: 1,
    shape: 'circle',
    color: '#F7964D',
    font: {
      color: '#ffffff',
    },
  },
  {
    id: 2,
    label: 'Person',
    title: '10.00 ',
    level: 2,
    shape: 'circle',
    color: '#CB6CE6',
    font: {
      color: '#ffffff',
    },
  },
  {
    id: 3,
    label: 'Institutions',
    title: '140 ',
    level: 3,
    shape: 'circle',
    color: '#00dafc',
  },
  {
    id: 4,
    label: 'Journals',
    title: '253 ',
    level: 4,
    shape: 'circle',
    color: '#FF5757',
    font: {
      color: '#ffffff',
    },
  },
]

const keysLanguage = ['Publications', 'Person', 'Institutions', 'Journals']

const edges = [
  { from: 1, to: 2, id: 1 },
  { from: 1, to: 4, id: 3 },
  // { from: 2, to: 3, id: 2 },
  // { from: 2, to: 4, id: 14 },
  // { from: 1, to: 4, id: 3 },
  { from: 3, to: 4, id: 12 },

  // { from: 4, to: 5, id: 6 },
  { from: 4, to: 2, id: 13 },
  { from: 1, to: 3, id: 2 },
  { from: 3, to: 2, id: 7 },
  { from: 1, to: 5, id: 8 },

  { from: 7, to: 8, id: 9 },
  { from: 1, to: 7, id: 10 },
  { from: 8, to: 8, id: 11 },
]

const options = {
  edges: {
    color: '#fff',
    smooth: {
      enabled: true,
      type: 'continuous',
      roundness: 0,
    },
  },
  nodes: {
    shape: 'dot',
    size: 64,
  },
  interaction: {
    // dragNodes: false,
    // dragView: false,
    hover: true,
    // zoomView: false,
  },
  layout: {
    hierarchical: {
      enabled: false,
      nodeSpacing: 100,
    },
  },
}

function VisGraph() {
  const [graph, setGraph] = useState({ nodes, edges })
  const { t } = useTranslation('common')

  //nodes.forEach((node) => (node.title = node.title.concat(node.label)))

  const pages = [
    '/publications',
    '/person',
    '/institutions',
    '/journals',
    '/#',
    '/#',
  ]

  const events = {
    click: function (event: any) {
      if (event.nodes[0] && pages[event.nodes[0] - 1]) {
        window.location.href = pages[event.nodes[0] - 1]
      }
    },
  }

  useEffect(() => {
    const newNodes: Node[] = []
    for (let i = 0; i < keysLanguage.length; i++) {
      // @ts-ignore
      nodes[i].label = t(keysLanguage[i])
      // @ts-ignore
      if (!nodes[i].title?.includes(nodes[i].label)) {
        // @ts-ignore
        nodes[i].title += nodes[i].label
      }
      newNodes.push({ ...nodes[i] })
    }

    setGraph({ ...graph, nodes: newNodes })
    console.log(graph)
    // }
  }, [t])

  return (
    <div className="graph">
      {/** 
      // @ts-ignore */}
      <Graph graph={graph} options={options} events={events} />
    </div>
  )
}
export default VisGraph