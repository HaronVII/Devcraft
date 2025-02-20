import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';

const DevOps = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.div
      className="devops-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Блок сайдбара */}
      <div ref={sidebarRef} className="sidebar-wrapper">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
      </div>

      {/* Основной контент */}
      <div className={`devops-content ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
        <div className="header-section">
          <h2>Добро пожаловать в раздел DevOps!</h2>
        </div>
        
        <div className="content-section">
          <div className="description-box">
            <p>Здесь вы сможете изучить ключевые технологии DevOps:</p>
            <ul className="tech-list">
              <li>Контейнеризация приложений</li>
              <li>Оркестрация контейнеров</li>
              <li>Инфраструктура как код</li>
              <li>Мониторинг и логирование</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DevOps;