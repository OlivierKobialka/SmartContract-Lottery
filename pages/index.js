import { Inter } from 'next/font/google'
import Head from 'next/head'
import { Header } from './components'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Head>
        <title>Smart Contract Lottery</title>
        <meta name="description" content="Smart Contract Lottery" />
      </Head>
      <Header />
    </div>
  )
}
