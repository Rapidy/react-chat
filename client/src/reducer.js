export default function reducer(state, action) {
  switch (action.type) {
    case 'JOIN_ROOM':
      return {
        ...state,
        isJoined: true,
        roomId: action.payload.roomId,
        userName: action.payload.userName,
      };

    case 'SET_DATA':
      return {
        ...state,
        users: action.payload.users,
        messages: action.payload.messages,
      };

    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
      };

    case 'NEW_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    default:
      return state;
  }
}
