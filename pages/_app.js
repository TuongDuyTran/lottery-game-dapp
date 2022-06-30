import '../styles/globals.css'
import { useRouter } from 'next/router'
import {DataProvider} from '../context/dataContext'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  
  return (
    <DataProvider>
      <Component key={router.asPath} {...pageProps} />
    </DataProvider>
  )
}

export default MyApp
