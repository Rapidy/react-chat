import React, { useState } from 'react';
import axios from 'axios';

export default function JoinBlock(props) {
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoading, setLoading] = useState(false);

  async function onEnter() {
    if (!userName || !roomId) {
      alert('Введите все данные');
    } else {
      const obj = {
        roomId,
        userName,
      };

      setLoading(true);
      await axios.post('/rooms', obj);
      props.onLogin(obj);
    }
  }

  return (
    <div className='join-block'>
      <input
        type='text'
        placeholder='Room ID'
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <input
        type='text'
        placeholder='Username'
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button disabled={isLoading} onClick={onEnter} className='btn btn-success'>
        {isLoading ? 'ВХОД...' : 'ВОЙТИ'}
      </button>
    </div>
  );
}
