import { SWRConfig } from "swr";
import { RecoilRoot, RecoilEnv } from "recoil";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import "@/styles/globals.css";
import { customFetcher } from "@/utils/api";

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED =
  false;

export default function App({
  Component,
  pageProps,
}: AppProps) {
  return (
    <RecoilRoot>
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          fetcher: customFetcher,
        }}
      >
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </SWRConfig>
    </RecoilRoot>
  );
}
