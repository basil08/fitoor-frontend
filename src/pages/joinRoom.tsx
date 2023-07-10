import { useState } from 'react';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom'; // Add this

import * as io from "socket.io-client";

// const socket = io.connect("https://localhost:8080/ws");

const socket = io.connect('ws://localhost:8000', {
    path: '/ws/socket.io',
    transports: ['websocket', 'polling', 'flashsocket']
});

const JoinRoom = () => {
    const [username, setUN] = useState('');
    const [room, setRoom] = useState('');
    const navigate = useNavigate();

    const joinRoom = () => {
        if (room !== '' && username !== '') {
          socket.emit('join_room', { username, room });
        }
        navigate('/chatroom', { replace: true });
      };

    return (
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1>{`<>DevRooms</>`}</h1>
          <input className={styles.input} placeholder='Username...' onChange={(e) => setUN(e.target.value)} />
  
          <select className={styles.input}
          onChange={(e) => setRoom(e.target.value)} // Add this
          >
            <option>-- Select Room --</option>
            <option value='javascript'>JavaScript</option>
            <option value='node'>Node</option>
            <option value='express'>Express</option>
            <option value='react'>React</option>
          </select>
  
          <button onClick={() => joinRoom()} className='btn btn-secondary' style={{ width: '100%' }}>Join Room</button>
        </div>
      </div>
    );
  };
  
  export default JoinRoom;