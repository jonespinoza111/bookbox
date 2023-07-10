import { Auth } from 'aws-amplify';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { useUserContext } from '../context/UserContext';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const drawerRef = useRef(null);
  const { userInfo } = useUserContext();

  const handleLogout = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              BookBox
            </Link>
          </div>

          <div className={`hidden md:flex flex-row items-center`}>
            <span className='text-gray-200 mr-5'>Welcome, {userInfo.username}</span>
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
          <div className="flex items-center md:hidden">
            <div className="flex">
              <button
                type="button"
                className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
                onClick={toggleMenu}
              >
                <FaBars />
              </button>
            </div>
            <div className={`fixed inset-y-0 right-0 w-64 bg-gray-700 z-40 text-white transform transition duration-300 ease-in-out flex flex-col ${
                isMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`} ref={drawerRef}>
              <span className='text-gray-200 px-3 py-2'>{userInfo.username}</span>
              <Link
                to="/search"
                className="text-gray-300 hover:bg-gray-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                onClick={toggleMenu}
              >
                Search
              </Link>
              <Link
                to="/lists"
                className="text-gray-300 hover:bg-gray-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                onClick={toggleMenu}
              >
                My Lists
              </Link>
              <Link
                to="/reviews"
                className="text-gray-300 hover:bg-gray-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                onClick={toggleMenu}
              >
                My Reviews
              </Link>
              <div
                className="text-gray-300 hover:bg-gray-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                onClick={() => {
                  toggleMenu();
                  handleLogout();
                }}
              >
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
