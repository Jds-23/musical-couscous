import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "../styles/globals.css";
import { Theme, ThemeContext, AppProvider } from "../context/StateProvider";
import type { AppProps } from "next/app";
import { useState } from "react";
import { light, dark } from "@pancakeswap-libs/uikit";
import { ThemeProvider } from "styled-components";
import { ModalProvider } from "@pancakeswap-libs/uikit";
import { Web3ReactProvider } from "@web3-react/core";
import { ExternalStateProvider } from "../context/ExternalState";
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from "@ethersproject/providers";
function getLibrary(
  provider: ExternalProvider | JsonRpcFetchFunc,
  connector: any
) {
  return new Web3Provider(provider); // this will vary according to whether you use e.g. ethers or web3.js
}
function MyApp({ Component, pageProps }: AppProps) {
  const [themeState, setTheme] = useState(Theme.Dark);
  const [address, setAddress] = useState("");
  const theme = extendTheme({
    fonts: {
      body: "Eurostile",
    },
    colors: {
      brand: {
        100: "#f7fafc",
        900: "#1a202c",
        500: "#7a71a7",
      },
    },
  });
  const SCTheme = themeState === "Dark" ? dark : light;
  // @ts-ignore
  SCTheme.zIndices.modal = 1001;
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <AppProvider>
        <ExternalStateProvider>
          <ThemeContext.Provider value={{ theme: themeState, setTheme }}>
            <ChakraProvider theme={theme}>
              <ThemeProvider theme={SCTheme}>
                <ModalProvider>
                  <Component {...pageProps} />
                </ModalProvider>
              </ThemeProvider>
            </ChakraProvider>
          </ThemeContext.Provider>
        </ExternalStateProvider>
      </AppProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
