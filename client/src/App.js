import { useEffect, useReducer } from 'react';
import reducer from './reducer';
import socket from './socket';
import axios from 'axios';

import JoinBlock from './components/JoinBlock';
import Chat from './components/Chat';

function App() {
  const [state, dispatch] = useReducer(reducer, {
    isJoined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  });

  async function onLogin(obj) {
    dispatch({
      type: 'JOIN_ROOM',
      payload: obj,
    });
    socket.emit('ROOM:JOIN', obj);

    const { data } = await axios.get(`/rooms/${obj.roomId}`);
    setData(data);
  }

  function setUsers(users) {
    dispatch({
      type: 'SET_USERS',
      payload: users,
    });
  }

  function setData(data) {
    dispatch({
      type: 'SET_DATA',
      payload: data,
    });
  }

  function addMessage(message) {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message,
    });
  }

  useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE', addMessage);
  }, []);

  window.socket = socket;

  return (
    <div className='wrapper'>
      {!state.isJoined ? (
        <JoinBlock onLogin={onLogin} />
      ) : (
        <Chat {...state} onAddMessage={addMessage} />
      )}
    </div>
  );
}

export default App;
