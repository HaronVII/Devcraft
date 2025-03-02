import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate , Link } from 'react-router-dom';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Запрос к вашему API
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) throw new Error('Ошибка авторизации');
      
      const { token } = await response.json();
      localStorage.setItem('token', token);
      navigate('/');
    } catch (err) {
      setError('Неверные учетные данные');
    }
  };

  return (
    <motion.div
      className="auth-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="auth-card">
        <h2 className="auth-title">DevCraft Auth</h2>
        
        <form onSubmit={handleLogin} className="auth-form">
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="auth-button"
          >
            Войти
          </motion.button>
          
          <div className="auth-link">
           Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
          </div>
        </form>
      </div>
    </motion.div>
    );
};

export default AuthPage;