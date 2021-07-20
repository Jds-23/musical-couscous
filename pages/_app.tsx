import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "../styles/globals.css";
import { Theme, ThemeContext } from "../context/StateProvider";
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
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ExternalStateProvider>
        <ThemeContext.Provider value={{ theme: themeState, setTheme }}>
          <ChakraProvider theme={theme}>
            <ThemeProvider theme={themeState === "Dark" ? dark : light}>
              <ModalProvider>
                <Component {...pageProps} />
              </ModalProvider>
            </ThemeProvider>
          </ChakraProvider>
        </ThemeContext.Provider>
      </ExternalStateProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
