import type { AppProps } from 'next/app';
import 'primeflex/primeflex.css';  // Estilos do PrimeFlex
import 'primereact/resources/themes/saga-blue/theme.css';  // Tema do PrimeReact
import 'primereact/resources/primereact.min.css';  // Estilos do PrimeReact
import 'primeicons/primeicons.css';  // Ícones do PrimeReact
import '../src/styles/globals.css'; 
import NavBar from '@/components/navBar';
import Footer from '@/components/footer';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
   
      <NavBar />
      <Component {...pageProps} />
      <Footer/>
    </>
  );
}

export default MyApp;
