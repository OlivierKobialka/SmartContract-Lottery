import Head from 'next/head'
import { Header, Header2 } from './components'


export default function Home() {
  return (
    <div>
      <Head>
        <title>Smart Contract Lottery ⇋</title>
        <meta name="description" content="Smart Contract Lottery" />
      </Head>
      {/* <Header /> */}
      <Header2 />
    </div>
  )
}
