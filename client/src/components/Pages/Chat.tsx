import { send } from 'process'
import * as React from "react";

const Chat = () => {
const [chat, addMessage] = React.useState(['hello'])
  const sendMessage = (e: any ,message: any) =>{
    console.log('msg submitted')
    e.preventDefault();
const chatBox = document.getElementById('chat-box')
chat.push(message)
  }
  return (
    <div>
          <title>Socket.IO chat</title>

       <ul id="messages"></ul>
    <form id="form" action="">
      <input id="input" /><button>Send</button>
    </form>

    </div>
  )
}

export default Chat
