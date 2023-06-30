import './App.css'
import { withAuthenticator } from '@aws-amplify/ui-react'
import MainRoutes from './MainRoutes'
import Navbar from './components/Navbar'
import { FetchProvider } from './context/fetchContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <FetchProvider>
      <div className='App relative bg-black min-h-screen flex flex-col h-[100%]'>
        <Navbar />
        <MainRoutes />
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"  
        />
      </div>
    </FetchProvider>
  )
}

export default withAuthenticator(App)
