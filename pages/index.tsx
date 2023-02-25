import Head from "next/head";
import Image from "next/image";

import Splash from "../components/marketing/Splash";
import Footer from "../components/marketing/Footer";

export default function Home() {
  return (
    <div>
      <Head>
        <title>MyKreative | Account Management for Dreamers</title>
        <meta
          name="description"
          content="Account management, privacy and monitoring for the Dreamers of Kreative"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://cdn.kreativeusa.com/mykreative/k-icon-favicon.ico"
        />
      </Head>
      <main>
        <Splash />
        <Footer />
      </main>
    </div>
  );
}
