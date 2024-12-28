import type { AppProps } from "next/app";
import "primeflex/primeflex.css";
import "primereact/resources/themes/saga-blue/theme.css"; 
import "primereact/resources/primereact.min.css"; 
import "primeicons/primeicons.css"; 
import "../src/styles/globals.css";
import TopBar from "@/components/topBar";
import Footer from "@/components/footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <TopBar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
