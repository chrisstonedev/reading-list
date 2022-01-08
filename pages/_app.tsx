import '../styles/globals.css'

type Props = {
  Component: () => any,
  pageProps: object
};

// noinspection JSUnusedGlobalSymbols
export default function MyApp({ Component, pageProps }: Props) {
  return <Component {...pageProps} />
}
