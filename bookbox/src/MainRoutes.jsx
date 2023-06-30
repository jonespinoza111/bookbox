import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Search from './pages/Search'
import BookDetails from './pages/BookDetails'
import ViewList from './pages/ViewList'
import MyLists from './pages/MyLists'
import CategoryResults from './pages/CategoryResults'

const MainRoutes = () => {
  return (
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/book/:id" element={<BookDetails />} />
        <Route exact path="/list/:id" element={<ViewList />} />
        <Route exact path="/lists" element={<MyLists />} />
        <Route exact path="/:category" element={<CategoryResults />} />
        {/* <Route path="/add">
          <AddBook />
        </Route> */}
    </Routes>
  )
}

export default MainRoutes
