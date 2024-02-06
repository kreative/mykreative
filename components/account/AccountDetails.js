import Image from "next/image";
import Link from "next/link";
import { useAtom } from "jotai";

import { accountStore } from "@/stores/accountStore";

export default function AccountDetails() {
  const [account] = useAtom(accountStore);

  return (
    <div className="overflow-hidden border border-gray-200 bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center">
          <div className="flex items-center">
            <Image
              className="h-12 w-12 rounded-full"
              src={account.profilePicture}
              alt="User account profile picture"
              width={48}
              height={48}
            />
            <div className="mx-4">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                Account information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                View your account details and keep your information up to date
              </p>
            </div>
          </div>
          <div className="flex-grow">
            <div className="flex justify-end mt-1">
              <Link href="/account/edit" className="inline-flex items-center">
                <span className="text-md shadow px-6 py-2 bg-black text-white rounded-md hover:bg-black/90">
                  Manage
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 text-lg text-gray-900 sm:col-span-2 sm:mt-0">
              {account.firstName} {account.lastName}
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email address</dt>
            <dd className="mt-1 text-lg text-gray-900 sm:col-span-2 sm:mt-0">
              {account.email}
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Email verified
            </dt>
            <dd className="mt-1 text-lg text-gray-900 sm:col-span-2 sm:mt-0">
              {account.emailVerified
                ? "Email is verified"
                : "Email is not verified"}
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Phone number</dt>
            <dd className="mt-1 text-lg text-gray-900 sm:col-span-2 sm:mt-0">
              {account.phoneNumber != null ? (
                <span>
                  {`+${account.phoneCountryCode} `}
                  {account.phoneNumber}
                </span>
              ) : (
                <span>No phone number set</span>
              )}
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Wallet balance
            </dt>
            <dd className="mt-1 text-lg text-gray-900 sm:col-span-2 sm:mt-0">
              {`${account.walletBalance} coins`}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
