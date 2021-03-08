import * as React from "react";
const io = require('socket.io-client')
const moment = require('moment');
// const <input  = require('@material-ui/core<input')
const socket = io.connect('http://localhost:3000')
const Chat = () => {
const [state, setState] = React.useState({message: '', name: ''})
const [chat, setChat] = React.useState([]);
React.useEffect(() => {
  socket.on('message', ({name, message }) => {
    setChat([...chat, {name, message}])
  })
}, [state])
const onTextChange = (e) => {
setState({...state, [e.target.name]: e.target.value})
}
const onMessageSubmit = (e) => {
e.preventDefault();
const {name, message} = state
socket.emit('message', {name, message})
setState({message: '', name})
}
  const renderChat = () => {
  return chat.map((message) =>{
<div>

  <h1>
  {message.message}
    </h1>
    </div>
  } )
}
const time = moment().format('h:mm a')
return (
  <div className="card">

    <form onSubmit={onMessageSubmit}>

      <h1>Messenger</h1>
      <div className="name-field">
      </div>
      <div>
        <input
        placeholder='enter username'
          name="name"
          onChange={(e) => onTextChange(e)}
          value={state.name}
          id="outlined-multiline-static"
        />
        <input
        placeholder='enter message'
          name="message"
          onChange={(e) => onTextChange(e)}
          value={state.message}
          id="outlined-multiline-static"
        />
      </div>
      <button>Send Message</button>
    </form>
    <div className="render-chat">
      <h1>Chat Log</h1>
      <ul id='message-log'>
        {chat.map((message,index) => {
          return <div key={index}>
            {/* <span id='messagename'>{message.name}</span>
            <span id='message'>{message.message}</span>
            <span id='time'>{moment().format('h:mm a')}</span> */}
            {`${message.name}: ${message.message} ${moment().format('h:mm a')}`}
            </div>
        })}
      </ul>
    </div>
  </div>
)
}
export default Chat