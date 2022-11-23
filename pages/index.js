import Head from 'next/head'
import Image from 'next/image'
import Graph from 'react-graph-vis'
import styles from '../styles/Home.module.css'

export default function Home() {
  const graphs = {
    "nodes": [
      {
          "id": "0x337f",
          "label": "0x89e73303049ee32919903c09e8de5629b84f59eb",
          "title": "address"
      },
      {
          "id": "0x33a9",
          "label": "BUSD -> 0.1",
          "title": "transactions"
      },
      {
          "id": "0x3380",
          "label": "0x9fb34d03374786a14e776d246f62eabdd9caaefe",
          "title": "address"
      },
      {
          "id": "0x337e",
          "label": "BUSD -> 0.001",
          "title": "transactions"
      }
  ],
  "edges": [
      {
          "from": "0x33a9",
          "to": "0x337f"
      },
      {
          "from": "0x3380",
          "to": "0x337e"
      },
      {
          "from": "0x337e",
          "to": "0x337f"
      },
      {
          "from": "0x3380",
          "to": "0x33a9"
      }
  ]
  };
  const options = {
    edges: {
      color: "#000000"
    },
    height: "600px",
    width: "1200px",
    physics: {
      enabled: true
    },
    interaction: { multiselect: true, dragView: true }
  };
  return (
    <div>
      <Head>
        <title>DePocket Token Flow</title>
        <meta name="description" content="DePocket token flow that support your user to tracking any token flow on any wallet" />
        <link rel="icon" href="https://app.depocket.com/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          DePocket Token Flow
        </h1>
        <div className={styles.content}>
          <Graph
            graph={graphs}
            options={options}
          ></Graph>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by DePocket {' '}
          <span className={styles.logo}>
            <Image src="https://app.depocket.com/icons/logo.svg" alt="DePocket Logo" width={16} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
