import '../assets/styles/main.scss'

import { Provider } from 'react-redux'
import { AppProvider } from '../context';
import type { AppProps } from 'next/app'
import store from '../app/store';
import Header from '../layout/header/Header';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AppProvider>
        <Header />
        <main className="wrapper">
          <Component {...pageProps} />
        </main>
      </AppProvider>
    </Provider>
  )
}
