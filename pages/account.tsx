import Authenticate from "../components/Authenticate";

const permissions = ["KREATIVE_ID_USER"];

export default function AccountPage() {
  return (
    <Authenticate permissions={permissions}>
      <div>
        <p className="text-4xl text-center">Account Dashboard</p>
      </div>
    </Authenticate>
  )
}