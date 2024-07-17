import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Place from './components/Place';
import User from './components/User';
import UserList from './components/UserList';
import Comment from './components/Comment';
import PlaceList from './components/PlaceList'; 
import './App.css';
import './components/Home.css'; 

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/placeslist" element={<PlaceList />} />
          <Route path="/places" element={<Place />} />
          <Route path="/users" element={<User />} />
          <Route path="/userslist" element={<UserList />} />
          <Route path="/comments" element={<Comment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
