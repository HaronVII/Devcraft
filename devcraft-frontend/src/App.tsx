import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DevOps from './pages/DevOps';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/devops" element={<DevOps />} />
      </Routes>
    </Router>
  );
}

export default App;