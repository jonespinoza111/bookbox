import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'

const MainRoutes = () => {
  return (
    <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route path="/search">
          <Search />
        </Route>
        <Route path="/add">
          <AddBook />
        </Route> */}
    </Routes>
  )
}

export default MainRoutes
