import { send } from 'process'
import * as React from "react";

const Chat = () => {
const [chat, addMessage] = React.useState(['hello'])
  const sendMessage = (e: any ,message: string) =>{
    console.log('msg submitted')
    e.preventDefault();
const chatBox = document.getElementById('chat-box')
chatBox.prepend(message)
  }
  return (
    <div>
          <h1>Chat Room</h1>
      <div id='chat-box'>
          <ul id='chat-list'>
          <h1>Chat Box</h1>
          {chat.map(message => {
            <li>message</li>
          })}
          <li>Hello</li>
          </ul>
       </div>

          <input type='text' />
         <button onClick={() => sendMessage}>Send</button>

    </div>
  )
}

export default Chat
