import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import TechCard from '../components/TechCard';
import Chat from '../components/Chat';

const Home = () => {
  const navigate = useNavigate();
  const directions = [
    'DevOps', 'Frontend', 'Backend', 
    'Mobile', 'Data Science', 'Cyber Security'
  ];

  const handleNavigation = (tech: string) => {
    if (tech === 'DevOps') navigate('/devops');
  };

  return (
    <motion.div 
      className="home-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="main-title">Devcraft</h1>
      <h2 className="choose-direction">Выбери направление</h2>

      <div className="cards-container">
        {directions.map((direction) => (
          <TechCard
            key={direction}
            tech={direction}
            onClick={() => handleNavigation(direction)}
          />
        ))}
      </div>
      
      {/* Добавляем компонент чата */}
      <Chat />
    </motion.div>
  );
};

export default Home;