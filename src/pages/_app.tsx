import { SWRConfig } from "swr";
import type { AppProps } from "next/app";

import "@/styles/globals.css";
import { customFetcher } from "@/utils/api";

export default function App({
  Component,
  pageProps,
}: AppProps) {
  return (
    <SWRConfig value={{ fetcher: customFetcher }}>
      <Component {...pageProps} />
    </SWRConfig>
  );
}
