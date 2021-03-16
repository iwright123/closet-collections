import React, { ReactElement } from 'react';
import {io} from 'socket.io-client';
import moment from 'moment';
import Message from '../models/Message';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
// const <input  = require('@material-ui/core<input')
const socket = io('http://localhost:3000');
const Chat = (): ReactElement => {
  const [state, setState] = React.useState<Message>({message: '', name: ''});
  const [chat, setChat] = React.useState([]);
  const [font, setFont] = React.useState(32);
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
  const larger = (): any => {
    setFont(50);
  };
  const smaller = (): any => {
    setFont(25);
  };
  const renderChat = (): ReactElement[] => {
    return chat.map((message: Message): ReactElement => (
      <div>
        <h1>
          {message.message}
        </h1>
      </div>
    ));
  };
  const time: string = moment().format('h:mm a');
  return (
    <div>
      <div id='largebutton'><ZoomInIcon id='enlarge' onClick={larger} fontSize="large">Enlarge</ZoomInIcon></div>
      <div id='smallButton'><ZoomOutIcon id='smaller' onClick={smaller} fontSize="large">Return Size</ZoomOutIcon></div>
      <div className="card">
        <form id='formCard' onSubmit={onMessageSubmit}>
          <h1 style={{fontSize: font}}>Messenger</h1>
          <div className="name-field">
          </div>
          <div>
            <input
              placeholder='enter username'
              name="name"
              onChange={(e): void => onTextChange(e)}
              value={state.name}
              id="outlined-multiline-static"
            />
            <input
              placeholder='enter message'
              name="message"
              onChange={(e): void => onTextChange(e)}
              value={state.message}
              id="outlined-multiline-static"
            />
          </div>
          <button>Send Message</button>
        </form>
        <div>
          <h1 style={{fontSize: font}}>Chat Log</h1>
          <ul id='message-log'>
            {chat.map((message, index) => {
              return <div key={index}>
                {/* <span id='messagename'>{message.name}</span>
            <span id='message'>{message.message}</span>
            <span id='time'>{moment().format('h:mm a')}</span> */}
                {`${message.name}: ${message.message} ${moment().format('h:mm a')}`}
              </div>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Chat;
