import Head from "next/head";
import Authenticate from "../components/Authenticate";
import SidebarLayout from "../components/dashboard/SidebarLayout";

const permissions = ["KREATIVE_ID_USER"];

export default function WalletPage() {
  return (
    <Authenticate permissions={permissions}>
      <Head>
        <title>Wallet | MyKreative | Account Management for Dreamers</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://cdn.kreativeusa.com/mykreative/k-icon-favicon.ico"
        />
      </Head>
      <main>
        <SidebarLayout
          title={`Your Wallet`}
          subtitle={"Discover your transaction history and how many DreamCoin you've earned."}
        >
          <></>
        </SidebarLayout>
      </main>
    </Authenticate>
  );
}
