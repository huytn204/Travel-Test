import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css'; 

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    password: ''
  });

  useEffect(() => {
    fetchUsersWithNullRole();
  }, []);

  const fetchUsersWithNullRole = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/auth/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users with null role:', error);
    }
  };

  const confirmDeleteUser = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      deleteUser(id);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/auth/users/${id}`);
      // Sau khi xóa thành công, cập nhật lại danh sách người dùng
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

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

  return (
    <div>
      <h2>Thêm Nhân Viên</h2>
      <form onSubmit={addUser}>
        <input
          type="text"
          name="username"
          value={newUser.username}
          onChange={handleChange}
          placeholder="Tên người dùng"
          required
        />
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleChange}
          placeholder="Mật khẩu"
          required
        />
        <button type="submit">Thêm</button>
      </form>
      <h1>Danh sách Nhân Viên</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username}{' '}
            <button onClick={() => confirmDeleteUser(user.id)}>Xóa</button>
          </li>
        ))}
      </ul>

      
    </div>
  );
};

export default UserList;
