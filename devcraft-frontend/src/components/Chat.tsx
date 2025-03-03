import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{
    id: number;
    text: string;
    createdAt: string;
    User: { email: string };
  }>>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/chat');
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text: newMessage })
      });

      if (!response.ok) throw new Error('Send message failed');
      
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <>
      <motion.button
        className="chat-toggle"
        onClick={() => setIsOpen(!isOpen)}
        animate={{
          right: isOpen ? 350 : 30,
          rotate: isOpen ? 180 : 0,
          transition: { type: 'spring', stiffness: 100 }
        }}
      >
        {isOpen ? '❯' : 'Global Chat'}
      </motion.button>  

      <motion.div
        className="chat-container"
        initial={{ x: 300 }}
        animate={{ x: isOpen ? 0 : 400 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className="chat-header">
          <h3>Global Chat</h3>
          <button onClick={() => setIsOpen(false)}>×</button>
        </div>
        
        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className="message">
              <div className="message-header">
                <span className="author">{msg.User.email}</span>
                <span className="time">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </span>
              </div>
              <div className="message-text">{msg.text}</div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="chat-form">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit">Send</button>
        </form>
      </motion.div>
    </>
  );
};

export default Chat;