import Head from 'next/head'
import Image from 'next/image'
import FeatureSelection from '../components/menu/selection'
import TokenFlow from '../components/tokenflow/index'
import RelatedWallet from '../components/relationwallet/index'
import styles from '../styles/Home.module.css'

export default function Home() {
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
          <FeatureSelection
            className={styles.content_wrapper}
            components={
              {
                "Token Flow":{
                  id: 1,
                  container: <TokenFlow/>,
                },
                "Wallet Relation":{
                  id: 1,
                  container: <RelatedWallet/>
                }
              }
            }
          />
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
