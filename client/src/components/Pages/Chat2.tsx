import React, { ReactElement } from 'react';
import {io} from 'socket.io-client';
import moment from 'moment';
import Message from '../models/Message';
// const <input  = require('@material-ui/core<input')
const socket = io('http://localhost:3000');
const Chat2 = (): ReactElement => {
  const [state, setState] = React.useState<Message>({message: '', name: ''});
  const [chat, setChat] = React.useState([]);
  React.useEffect((): void => {
    socket.on('message', ({name, message }) => {
      setChat([...chat, {name, message}]);
    });
  }, [state]);
  const onTextChange = (e): void => {
    setState({...state, [e.target.name]: e.target.value});
  };
  const onMessageSubmit = (e): void => {
    e.preventDefault();
    const {name, message} = state;
    socket.emit('message', {name, message});
    setState({message: '', name});
  };
  // const renderChat = (): ReactElement[] => {
  //   return chat.map((message: Message): ReactElement => (
  //     <div>
  //       <h1>
  //         {message.message}
  //       </h1>
  //     </div>
  //   ));
  // };
  // const time: string = moment().format('h:mm a');
  return (
    <div>


      <ul>
        {chat.map((message, index) => {
          return <div key={index}>
            {/* <span id='messagename'>{message.name}</span>
            <span id='message'>{message.message}</span>
            <span id='time'>{moment().format('h:mm a')}</span> */}
            {`${message.name}: ${message.message} ${moment().format('h:mm a')}`}
          </div>;
        })}
      </ul>

      <form onSubmit={onMessageSubmit}>
        <h1>Messenges</h1>


        <div>
          <input
            placeholder='enter username'
            name="name"
            onChange={(e): void => onTextChange(e)}
            value={state.name}

          />
          <input
            placeholder='enter message'
            name="message"
            onChange={(e): void => onTextChange(e)}
            value={state.message}

          />
        </div>
        <button>Send Message</button>
      </form>

    </div>
  );
};
export default Chat2;
