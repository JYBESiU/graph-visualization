import { SWRConfig } from "swr";
import { RecoilRoot } from "recoil";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import "@/styles/globals.css";
import { customFetcher } from "@/utils/api";

export default function App({
  Component,
  pageProps,
}: AppProps) {
  return (
    <RecoilRoot>
      <SWRConfig value={{ fetcher: customFetcher }}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </SWRConfig>
    </RecoilRoot>
  );
}
