import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Comment.css';

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    axios.get('/api/comments')
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('Có lỗi xảy ra khi lấy dữ liệu bình luận!', error);
      });
  }, []);

  const addComment = (event) => {
    event.preventDefault();
    axios.post('/api/comments', { text: newComment })
      .then(response => {
        setComments([...comments, response.data]);
        setNewComment('');
      })
      .catch(error => {
        console.error('Có lỗi xảy ra khi thêm bình luận!', error);
      });
  };

  return (
    <div className="comment-container">
      <h1>Bình luận</h1>
      <ul>
        {comments.map(comment => (
          <li key={comment.id} className="comment-item">{comment.text}</li>
        ))}
      </ul>
      <form onSubmit={addComment}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Bình luận mới"
          required
        />
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
};

export default Comment;
