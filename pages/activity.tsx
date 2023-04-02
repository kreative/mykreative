import Head from "next/head";
import Authenticate from "../components/Authenticate";
import SidebarLayout from "../components/dashboard/SidebarLayout";

const permissions = ["KREATIVE_ID_USER"];

export default function ActivityPage() {
  return (
    <Authenticate permissions={permissions}>
      <Head>
        <title>Activity | MyKreative | Account Management for Dreamers</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://cdn.kreativeusa.com/mykreative/k-icon-favicon.ico"
        />
      </Head>
      <main>
        <SidebarLayout
          title={`Your Activity`}
          subtitle={"View everything you've done across Kreative."}
        >
          <div>
            <p className="text-lg text-gray-500">Coming soon!</p>
          </div>
        </SidebarLayout>
      </main>
    </Authenticate>
  );
}
