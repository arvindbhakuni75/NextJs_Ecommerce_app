
import '@/styles/globals.css'
import store from '@/store/store'
import { Provider } from 'react-redux'
import { Navbar } from '@/components'
import CheckOut from '@/components/CheckOut'
import SearchResult from '@/components/SearchResult'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
    <Navbar />
    <CheckOut />
    <SearchResult />
    <Component {...pageProps} />
    </Provider>
  )
}
