// src/components/Navbar.tsx
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
      <motion.nav className="navbar">
        <div className="nav-content">
          <h2 className="logo">DevCraft</h2>
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            className="logout-button"
        >
          Выйти
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;