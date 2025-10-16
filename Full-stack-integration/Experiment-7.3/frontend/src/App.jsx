import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import ChatWindow from './components/ChatWindow';

const SOCKET_URL = 'http://localhost:5000';

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const s = io(SOCKET_URL);
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  return (
    <div className="app-container">
      <ChatWindow socket={socket} />
    </div>
  );
}

export default App;