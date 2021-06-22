import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "../styles/globals.css";
import { WalletAddressContext } from "../context/StateProvider";
import type { AppProps } from "next/app";
import { useState } from "react";
function MyApp({ Component, pageProps }: AppProps) {
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
    <WalletAddressContext.Provider value={{ address, setAddress }}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </WalletAddressContext.Provider>
  );
}

export default MyApp;
