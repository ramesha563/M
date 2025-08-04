
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode'; 
// import jwtDecode from "jwt-decode";


import { FiHome, FiUser, FiLogOut, FiEdit, FiUserPlus, FiPhone } from 'react-icons/fi';



const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const updateUserFromStorage = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser || null);
  };

useEffect(() => {
  const token = localStorage.getItem('token');

  const checkTokenExpiry = () => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          // 🔒 Token expired
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          window.dispatchEvent(new Event("userChanged"));
          
          toast.error("Session expired. Please login againnn.", {
  autoClose: false,   // 👈 Don't auto-close
  closeOnClick: false, // 👈 User must click to close
  draggable: false,
  closeButton: true,   // 👈 Show ✖ button
});

          navigate("/login");
        }
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  };

  checkTokenExpiry(); // ⏱️ Immediately check after mount
  updateUserFromStorage(); // Update profile image etc.

  const interval = setInterval(checkTokenExpiry, 2000); // 🔁 Check every 2 seconds

  const handleUserChange = () => updateUserFromStorage();
  window.addEventListener('userChanged', handleUserChange);

  return () => {
    clearInterval(interval);
    window.removeEventListener('userChanged', handleUserChange);
  };
}, []);



const handleLogout = () => {
  const confirmed = window.confirm("Are you sure you want to logout?");
  if (!confirmed) return;

  localStorage.removeItem('token');
  localStorage.removeItem('user');
  setUser(null);
  window.dispatchEvent(new Event("userChanged"));

  toast.success("Logout successful!");
  setTimeout(() => {
    navigate('/login');
  }, 1500); // 👈 Give toast time to appear
};


  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">
          <Link to="/">MyApp</Link>
        </div>

        <button className="nav-toggle" onClick={toggleMenu}>☰</button>

        <ul className={`nav-links ${menuOpen ? 'show' : ''}`}>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <FiHome /> Home
            </Link>
          </li>
               <li>
            <Link to="/crud" onClick={() => setMenuOpen(false)}>
              <FiEdit /> CRUD
            </Link>
          </li>

          <li>
  <Link to="/contact" onClick={() => setMenuOpen(false)}>
    <FiPhone /> Contact
  </Link>
</li>

        
          {user ? (
            <>
        
              <li>
              {/* <img
  src={
    user.image
      ? `http://localhost:5050/uploads/${user.image}`
      : '/default-avatar.png'
  }
  alt="profile"
  className="nav-profile-img"
  onClick={() => {
    navigate('/profile');
    setMenuOpen(false);
  }}
/> */}
<img
  src={
    user?.image
      ? user.image
      : '/default-avatar.png'
  }
  alt="profile"
  className="nav-profile-img"
  onClick={() => {
    navigate('/profile');
    setMenuOpen(false);
  }}
/>


              </li>
               

              <li>
                <button onClick={handleLogout} className="logout-btn">
                  <FiLogOut /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signup" onClick={() => setMenuOpen(false)}>
                  <FiUserPlus /> Signup
                </Link>
              </li>
              <li>
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <FiUser /> Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default Navbar;
