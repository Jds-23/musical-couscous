import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "../styles/globals.css";
import { WalletAddressContext } from "../context/StateProvider";
import { useState } from "react";
function MyApp({ Component, pageProps }) {
  const [address, setAddress] = useState("");
  const theme = extendTheme({
    fonts: {
      body: "Eurostile",
    },
    colors: {
      brand: {
        100: "#f7fafc",
        900: "#1a202c",
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
