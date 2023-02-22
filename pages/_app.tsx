import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "@next/font/local";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";

// custom craftwork sans font loading locally
const craftworkSans = localFont({
  src: [
    {
      path: "../public/fonts/CraftworkSans-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/CraftworkSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/CraftworkSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/CraftworkSans-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/CraftworkSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/CraftworkSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-craftworksans",
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <div className={`${craftworkSans.variable} font-sans`}>
          <Component {...pageProps} />
        </div>
      </CookiesProvider>
    </QueryClientProvider>
  );
}
