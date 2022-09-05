import '../styles/globals.css'

import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import makeStore from '../app/store';

export default function MyApp({ Component, pageProps }: AppProps) {
  const store = makeStore(pageProps.initialState);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
