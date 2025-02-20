import { motion } from 'framer-motion';

// Типы для пропсов
type SidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
};

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const topics = ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'Grafana', 'Prometheus'];

  return (
    <motion.div
      className="sidebar-container"
      animate={{ x: isOpen ? 0 : -300 }} // Оставляем 20px видимыми
      transition={{ type: 'spring', stiffness: 100 }}
      onClick={onToggle}
    >
      <motion.div className="sidebar">
        <h3>Темы для изучения</h3>
        <ul>
          {topics.map((topic) => (
            <li key={topic} className="sidebar-item">
              {topic}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;