import { AppProps } from 'next/app';
import { globalStyles } from './styles/global';
import { Container, Header } from './styles/pages/app';
import LogoImg from '../../public/assets/logo-ignite.svg';
import Image from 'next/image';

globalStyles();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={LogoImg} alt="" />
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}

export default MyApp;