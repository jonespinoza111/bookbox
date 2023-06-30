import './App.css'
import { withAuthenticator } from '@aws-amplify/ui-react'
import MainRoutes from './MainRoutes'
import Navbar from './components/Navbar'
import { FetchProvider } from './context/fetchContext'

function App() {
  return (
    <FetchProvider>
      <div className='App relative bg-black min-h-screen flex flex-col h-[100%]'>
        <Navbar />
        <MainRoutes />
      </div>
    </FetchProvider>
  )
}

export default withAuthenticator(App)
