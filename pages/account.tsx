import Head from "next/head";
import { useAtom } from "jotai";
import Authenticate from "../components/Authenticate";
import SidebarLayout from "../components/dashboard/SidebarLayout";
import AccountDetails from "../components/dashboard/AccountDetails";
import { accountStore } from "@/stores/accountStore";

const permissions = ["KREATIVE_ID_USER"];

export default function AccountPage() {
  const [account] = useAtom(accountStore);

  return (
    <Authenticate permissions={permissions}>
      <Head>
        <title>MyKreative | Account Management for Dreamers</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://cdn.kreativeusa.com/mykreative/k-icon-favicon.ico"
        />
      </Head>
      <main>
        <SidebarLayout
          title={`Welcome to your Kreative, @${account?.username} 👋`}
          subtitle={"Manage your account details here."}
        >
          <AccountDetails />
        </SidebarLayout>
      </main>
    </Authenticate>
  );
}
