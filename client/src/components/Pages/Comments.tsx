// import React, { ReactElement } from 'react';
// import {io} from 'socket.io-client';
// import moment from 'moment';
// import Comment from '../models/Comment';
// import axios from 'axios';



// const Comments = (props: any): ReactElement => {

//   console.log('PROPS', props);

//   const [comments, setComments] = React.useState([]);
//   const [postId] = props;
//   const [state, setState] = React.useState<Comment>({postId: 0, comment: '', name: ''});
//   const onTextChange = (e): void => {
//     console.log(e);
//     // setState({...state, [e.target.name]: e.target.value);
//   };
//   // const comment () {
//   //   const {name, comment, postId} = state;
//   //   setComments(prevComments => prevComments.push({postId, name, comment}))
//   // }
//   const onCommentSubmit = (e): void => {
//     e.preventDefault();
//     const {name, comment, postId} = state;
//     // const outfitID =
//     axios.post('/comment', {name, comment, postId});
//   };

//   React.useEffect((): any => {
//     axios.get('/comments')
//       .then((comments: any) => {
//         const {data} = comments;
//         for (const entry of data) {
//           console.log('entry', entry);

//         }
//       }
//       );
//   }, []);

//   return (
//     <div>
//       <ul>
//         {comments.map((comment, index) => {
//           console.log(comment,'comment')
//           return <div key={index}>

//             {`${comment.name}: ${comment.comment} ${moment().format('h:mm a')}`}
//           </div>;
//         })}
//       </ul>
//       <form onSubmit={onCommentSubmit}>
//         <h1>Post a Comment</h1>
//         <div>
//           <input
//             placeholder='enter username'
//             name="name"
//             onChange={(e): void => onTextChange(e)}
//             value={state.name}

//           />
//           <input
//             placeholder='enter comment'
//             name="comment"
//             onChange={(e): void => onTextChange(e)}
//             value={state.comment}

//           />
//         </div>
//         <button onClick={(): any => (comments)}>Send comment</button>
//       </form>

//     </div>
//   );
// };


// export default Comments;
