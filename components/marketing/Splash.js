import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

export default function Splash() {
  return (
    <div className="relative isolate overflow-hidden bg-white">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
        />
      </svg>
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:py-28 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-10">
          <Image
            className="h-11 w-auto"
            src="https://cdn.kreativeusa.com/mykreative/mykreative-logo-default.png"
            alt="Logo for MyKreative Website and App"
            width={400}
            height={200}
          />
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <div className="inline-flex space-x-6">
              <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-sm font-semibold leading-6 text-purple-700 ring-1 ring-inset ring-indigo-600/10">
                Welcome Dreamer
              </span>
              <a href="#">
                <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                  <span>Just shipped v1.0</span>
                  <ChevronRightIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </div>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            It&apos;s your Kreative, manage it your way.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            MyKreative gives you complete access to your Kreative account.
            Manage your details, secure your private information, and monitor
            your activity.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              href="/account"
              className="shadow-lg rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Access MyKreative
            </Link>
            <Link
              href="https://support.kreativeusa.com/mykreative"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Get support <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <Image
              src="https://cdn.kreativeusa.com/mykreative/app-screenshot-v2.png"
              alt="Website screenshot for MyKreative"
              width={2432}
              height={1442}
              className="w-[84rem] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
