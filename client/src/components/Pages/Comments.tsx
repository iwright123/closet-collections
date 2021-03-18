import React, { ReactElement } from 'react';
import {io} from 'socket.io-client';
import moment from 'moment';
import Comment from '../models/Comment';
import axios from 'axios';

// const <input  = require('@material-ui/core<input')
const socket = io('http://localhost:3000');
const Comments = ({}): ReactElement => {
  const [state, setState] = React.useState<Comment>({comment: '', name: ''});
  const [chat, setChat] = React.useState([]);
  React.useEffect((): void => {
    socket.on('comment', ({name, comment }) => {
      setChat([...chat, {name, comment}]);
    });
  }, [state]);
  const onTextChange = (e): void => {
    setState({...state, [e.target.name]: e.target.value});
  };
  const onCommentSubmit = (e): void => {
    e.preventDefault();
    const {name, comment} = state;
    const outfitID =
    axios.post('/comment', {name, comment});
    socket.emit('comment', {name, comment});
    setState({comment: '', name});
  };
  React.useEffect((): any => {
    axios.get('/comments').then((comments: any) => {
      const { data } = comments;
      console.log(data, 'lien 29');
      data.forEach(function (msg) {
        const {name, comment} = msg;
        console.log('HEYYYYYYYYYYYY', {name, comment});
        setChat([...chat, {name, comment}]);
      });
    }
    );
  }, []);
  // const renderChat = (): ReactElement[] => {
  //   return chat.map((comment: comment): ReactElement => (
  //     <div>
  //       <h1>
  //         {comment.comment}
  //       </h1>
  //     </div>
  //   ));
  // };
  // const time: string = moment().format('h:mm a');
  return (
    <div>

      {console.log('CHAT', chat)}
      <ul>
        {chat.map((comment, index) => {
          console.log('comment', comment);
          return <div key={index}>
            {/* <span id='commentname'>{comment.name}</span>
            <span id='comment'>{comment.comment}</span>
            <span id='time'>{moment().format('h:mm a')}</span> */}
            {`${comment.name}: ${comment.comment} ${moment().format('h:mm a')}`}
          </div>;
        })}
      </ul>

      <form onSubmit={onCommentSubmit}>
        <h1>Post a Comment</h1>


        <div>
          <input
            placeholder='enter username'
            name="name"
            onChange={(e): void => onTextChange(e)}
            value={state.name}

          />
          <input
            placeholder='enter comment'
            name="comment"
            onChange={(e): void => onTextChange(e)}
            value={state.comment}

          />
        </div>
        <button>Send comment</button>
      </form>

    </div>
  );
};
export default Comments;
