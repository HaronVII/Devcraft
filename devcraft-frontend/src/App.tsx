import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DevOps from './pages/DevOps';
import AuthPage from './pages/AuthPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Публичные маршруты */}
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Защищенные маршруты */}
        <Route element={<ProtectedRoute />}>
          <Route 
            path="/" 
            element={
              <>
                <Navbar />
                <Home />
              </>
            } 
          />
          <Route 
            path="/devops" 
            element={
              <>
                <Navbar />
                <DevOps />
              </>
            } 
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;