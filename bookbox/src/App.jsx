import './App.css'
import { withAuthenticator } from '@aws-amplify/ui-react'
import MainRoutes from './MainRoutes'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className='App relative bg-black min-h-screen flex flex-col w-[100vw] h-[100%]'>
      <Navbar />
      <MainRoutes />
    </div>
  )
}

export default withAuthenticator(App)
