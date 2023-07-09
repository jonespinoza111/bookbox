import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const handleLogout = async () => {
    try {
      await Auth.signOut();
      // Redirect or perform any additional logic after successful logout
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              BookBox
            </Link>
          </div>
          <div className="flex">
            <Link to="/search" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Search
            </Link>
            <Link to="/lists" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              My Lists
            </Link>
            <Link to="/reviews" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              My Reviews
            </Link>
            <div className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer" onClick={handleLogout}>
              Logout
            </div>
            
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
