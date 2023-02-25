import Link from "next/link";

const navigation = {
  main: [
    { name: "Contact Us", href: "https://kreativeusa.com/contact-us" },
    { name: "Get Support", href: "https://support.kreativeusa.com/mykreative" },
    { name: "Manage Account", href: "/account" },
    { name: "Privacy Policy", href: "https://support.kreativeusa.com/legal/privacy-policy" },
    { name: "Terms & Conditions", href: "https://support.kreativeusa.com/legal/terms-and-conditions" },
  ],
};

export default function FooterComponent() {
  return (
    <footer className="bg-white border-t-2 border-gray-200">
      <div className="mx-auto max-w-7xl overflow-hidden pb-10 pt-12 px-6 sm:pb-12 lg:px-8">
        <nav
          className="-mb-6 columns-2 lg:space-x-12 md:space-x-6 sm:flex sm:justify-center"
          aria-label="Footer"
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <Link
                href={item.href}
                className="text-md leading-6 text-gray-600 hover:text-gray-900"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <p className="mt-10 text-center text-sm leading-5 text-gray-500">
          &copy;{" "}
          <Link
            href="https://kreativeusa.com"
            className="hover:underline underline-offset-2 hover:text-black"
          >
            2023 Kreative, LLC. All rights reserved.
          </Link>{" "}
          <Link
            href="https://kreativedreamflow.com"
            className="hover:underline underline-offset-2 hover:text-indigo-700"
          >
            Website made &hearts; with by Kreative Dreamflow.
          </Link>
        </p>
      </div>
    </footer>
  );
}