import { motion } from 'framer-motion';

type TechCardProps = {
  tech: string;
  onClick: () => void;
};

const TechCard = ({ tech, onClick }: TechCardProps) => {
  return (
    <motion.div
      className="tech-card"
      whileHover={{ 
        scale: 1.05,
        rotate: Math.random() * 4 - 2 // Случайный наклон
      }}
      transition={{ 
        type: "spring",
        stiffness: 200,
        damping: 10
      }}
      onClick={onClick}
    >
      <h3 className="tech-title">{tech}</h3>
      {tech === 'DevOps' && (
        <div className="status-badge">
          <span>🚀 Доступно</span>
        </div>
      )}
    </motion.div>
  );
};

export default TechCard;