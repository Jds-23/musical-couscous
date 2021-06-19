import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
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
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
