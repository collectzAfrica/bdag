import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <main className={``}>
      <Head></Head>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        <meta name="description" content=" Website for COIN NODE" />
        <link rel="icon" href="/wallets/coinbase.png" />
      </Head>
      <Component {...pageProps} />
    </main>
  );
}
