import Head from "next/head";
import Header from "../components/Header";
import Main from "../components/Main";

import '@rainbow-me/rainbowkit/styles.css'
import {
    getDefaultWallets,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit'
import {
    chain,
    configureChains,
    createClient,
    WagmiConfig,
} from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider } = configureChains(
    [chain.ropsten, chain.mainnet, chain.polygon, chain.polygonMumbai],
    [
        alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
        publicProvider()
    ]
)

const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    chains
})

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
})

const styles = {
  container: `h-full w-full bg-[#fff]`,
};

export default function Home() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div className={styles.container}>
          <Head>
            <title>Momentix - Tickets That Become Memories</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          </Head>
          {/* Navbar */}
          <Header />
          {/* Main */}
          <Main />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
