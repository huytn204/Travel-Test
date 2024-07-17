import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './User.css';

const User = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    password: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  // Kiểm tra xem đã có thông tin đăng nhập trong localStorage hay chưa khi component được tải lần đầu
  useEffect(() => {
    const loggedInUser = localStorage.getItem('currentUser');
    if (loggedInUser) {
      setCurrentUser(JSON.parse(loggedInUser));
      setIsLoggedIn(true);
    }
  }, []);

  const addUser = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/api/auth/register', newUser)
      .then(response => {
        setUsers([...users, response.data]);
        setNewUser({ username: '', password: '' });
      })
      .catch(error => {
        console.error('Có lỗi xảy ra khi thêm người dùng!', error.response ? error.response.data : error.message);
      });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/api/auth/login', loginData)
      .then(response => {
        localStorage.setItem('currentUser', JSON.stringify(response.data)); // Lưu thông tin người dùng vào localStorage
        setIsLoggedIn(true);
        setCurrentUser(response.data);
        setLoginData({ username: '', password: '' });
      })
      .catch(error => {
        console.error('Đăng nhập thất bại!', error.response ? error.response.data : error.message);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser'); // Xóa thông tin người dùng khỏi localStorage khi đăng xuất
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <div className="user-container">
      {!isLoggedIn ? (
        <>
          <h1>Đăng nhập</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              name="username"
              value={loginData.username}
              onChange={handleLoginChange}
              placeholder="Tên người dùng"
              required
            />
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              placeholder="Mật khẩu"
              required
            />
            <button type="submit">Đăng nhập</button>
          </form>
        </>
      ) : (
        <>
          <h1>Xin chào, {currentUser.username}</h1>
          <button onClick={handleLogout}>Đăng xuất</button>

          <ul>
            <li>
              <Link to="/places">Địa điểm</Link>
            </li>
            {currentUser.role === 'admin' && (
              <li>
                <Link to="/userslist">Nhân Viên</Link>
              </li>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default User;
