import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { withAuthenticator } from '@aws-amplify/ui-react'
import Book from './components/Book'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h2>BookBox</h2>
        <Book title="Tiny Dancer" author="Dr. Seuss" description="This is the new book about a guy who was very tiny and learned to dance with a bunch of animals as his instructor. He entered a competition where he had to get at least a 7 to be successful. He ultimately won the competition and enjoyed the rest of his life." thumbnail={reactLogo} />
      </div>  
    </>
  )
}

export default withAuthenticator(App)
