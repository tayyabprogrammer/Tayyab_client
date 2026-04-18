// client/src/pages/admin/MessagesManage.jsx
import { useState, useEffect } from 'react';
import { getMessages, markAsRead, deleteMessage } from '../../services/api';

const MessagesManage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, unread, read

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data } = await getMessages();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    await markAsRead(id);
    fetchMessages();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      await deleteMessage(id);
      fetchMessages();
    }
  };

  const filteredMessages = messages.filter(msg => {
    if (filter === 'unread') return !msg.read;
    if (filter === 'read') return msg.read;
    return true;
  });

  if (loading) return <div style={{ color: '#fff' }}>Loading messages...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
        <h1 style={{ color: '#fff' }}>Contact Messages</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setFilter('all')} style={{ ...filterButton, background: filter === 'all' ? '#00ffff' : 'transparent', color: filter === 'all' ? '#0a0a0a' : '#00ffff' }}>All ({messages.length})</button>
          <button onClick={() => setFilter('unread')} style={{ ...filterButton, background: filter === 'unread' ? '#ffaa00' : 'transparent', color: filter === 'unread' ? '#0a0a0a' : '#ffaa00' }}>Unread ({messages.filter(m => !m.read).length})</button>
          <button onClick={() => setFilter('read')} style={{ ...filterButton, background: filter === 'read' ? '#00ff88' : 'transparent', color: filter === 'read' ? '#0a0a0a' : '#00ff88' }}>Read ({messages.filter(m => m.read).length})</button>
        </div>
      </div>

      {filteredMessages.length === 0 ? (
        <div style={{ color: '#888', textAlign: 'center', padding: '60px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px' }}>
          📭 No messages in this folder
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {filteredMessages.map(msg => (
            <div key={msg._id} style={{ 
              background: msg.read ? 'rgba(255,255,255,0.03)' : 'rgba(0,255,255,0.05)',
              border: msg.read ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,255,255,0.2)',
              borderRadius: '16px',
              padding: '20px',
              transition: 'all 0.3s'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '10px' }}>
                    <h3 style={{ color: '#00ffff', margin: 0 }}>{msg.name}</h3>
                    {!msg.read && <span style={{ background: '#ff0000', padding: '2px 10px', borderRadius: '20px', fontSize: '0.7rem', color: '#fff' }}>NEW</span>}
                    <span style={{ color: '#888', fontSize: '0.8rem' }}>{msg.email}</span>
                  </div>
                  <p style={{ color: '#ccc', lineHeight: 1.6, marginBottom: '12px' }}>{msg.message}</p>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <small style={{ color: '#666' }}>📅 {new Date(msg.createdAt).toLocaleString()}</small>
                    {msg.read && <small style={{ color: '#00ff88' }}>✓ Read</small>}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {!msg.read && (
                    <button onClick={() => handleMarkAsRead(msg._id)} style={{ ...actionButton, background: '#00ff88', color: '#0a0a0a' }}>
                      Mark as Read
                    </button>
                  )}
                  <button onClick={() => handleDelete(msg._id)} style={{ ...actionButton, background: '#ff0000' }}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const filterButton = {
  padding: '8px 20px',
  borderRadius: '30px',
  border: '1px solid',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'all 0.3s'
};

const actionButton = {
  padding: '8px 16px',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'all 0.3s'
};

export default MessagesManage;