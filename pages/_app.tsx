import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "@next/font/local";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";

const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-Regular.eot",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-Italic.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-Italic.eot",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-Medium.eot",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-MediumItalic.woff",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-MediumItalic.eot",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-Bold.eot",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-BoldItalic.woff",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-BoldItalic.eot",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <style jsx global>{`
          html {
            font-family: ${satoshi.style.fontFamily};
          }
        `}</style>
        <Component {...pageProps} />
      </CookiesProvider>
    </QueryClientProvider>
  );
}
