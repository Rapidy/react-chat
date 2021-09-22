import React, { useState, useEffect, useRef } from 'react';
import socket from '../socket';

function Chat({ users, messages, userName, roomId, onAddMessage }) {
  const [messageValue, setMessageValue] = useState('');
  const messageRef = useRef(null);

  function onSendMessage() {
    if (messageValue.trim() !== '') {
      socket.emit('ROOM:NEW_MESSAGE', {
        userName,
        roomId,
        text: messageValue,
      });

      onAddMessage({
        userName,
        text: messageValue,
      });

      setMessageValue('');
    }
  }

  function onEnterMessage(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      onSendMessage();
      e.preventDefault();
    }
  }

  useEffect(() => {
    messageRef.current.scrollTo(0, messageRef.current.scrollHeight);
  }, [messages]);

  return (
    <div className='chat'>
      <div className='chat-users'>
        Комната: <b>{roomId}</b>
        <hr />
        <b>Онлайн ({users.length}):</b>
        <ul>
          {users.map((name, i) => (
            <li key={`${name}_${i}`}>{userName !== name ? name : `${name} (Вы)`}</li>
          ))}
        </ul>
      </div>
      <div className='chat-messages'>
        <div ref={messageRef} className='messages'>
          {messages.map((message, i) => (
            <div
              key={i}
              className={message.userName === userName ? 'message myMessage' : 'message'}>
              <p>{message.text}</p>
              <span>{message.userName === userName ? 'Вы' : message.userName}</span>
            </div>
          ))}
        </div>
        <form>
          <textarea
            onKeyDown={onEnterMessage}
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
            className='form-control'
            rows='3'></textarea>
          <button onClick={onSendMessage} type='button' className='btn btn-primary'>
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
