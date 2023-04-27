import Head from 'next/head'
import { Header2, LotteryEntrance } from './components'


export default function Home() {
  return (
    <div>
      <Head>
        <title>Smart Contract Lottery ⇋</title>
        <meta name="description" content="Smart Contract Lottery" />
      </Head>
      {/* <Header /> */}
      <Header2 />
      <LotteryEntrance />
    </div>
  )
}
