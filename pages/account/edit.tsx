import Head from "next/head";
import Authenticate from "../../components/Authenticate";
import SidebarLayout from "../../components/dashboard/SidebarLayout";
import EditAccountForm from "../../components/account/EditAccountForm";

export default function EditAccount(): JSX.Element {
  return (
    <Authenticate permissions={["KREATIVE_ID_USER"]}>
      <Head>
        <title>Edit Account | MyKreative | Account Management for Dreamers</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://cdn.kreativeusa.com/mykreative/k-icon-favicon.ico"
        />
      </Head>
      <main>
        <SidebarLayout
          title={`Edit your Kreative account`}
          subtitle={"Safely edit your username, information, and contact information."}
        >
          <EditAccountForm />
        </SidebarLayout>
      </main>
    </Authenticate>
  );
}