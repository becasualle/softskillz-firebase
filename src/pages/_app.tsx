import '../assets/styles/main.scss'

import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import store from '../app/store';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <section className="wrapper">
        <Component {...pageProps} />
      </section>
    </Provider>
  )
}
