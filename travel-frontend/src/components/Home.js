import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [keyword, setKeyword] = useState('');
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (keyword.trim() !== '') {
      handleSearch();
    } else {
      setPlaces([]);
    }
  }, [keyword]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/traveller/search?keyword=${keyword}`);
      setPlaces(response.data);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  return (
    <div className="home-container">
      <h1>Travel</h1>
      <nav className="home-nav">
        <ul>
          <li>
            <Link to="/placeslist">Địa điểm</Link>
          </li>
          <li>
            <Link to="/users">Người dùng</Link>
          </li>
        </ul>
      </nav>
      <div className="search-container">
        <input 
          type="text" 
          value={keyword} 
          onChange={(e) => setKeyword(e.target.value)} 
          placeholder="Tìm kiếm địa điểm" 
        />
        <button onClick={handleSearch}>Tìm kiếm</button>
      </div>

      {/* Hiển thị kết quả tìm kiếm */}
      <div className="place-list-container">
        {places.length > 0 ? (
          <ul className="place-list">
            {places.map((place) => (
              <li key={place.id} className="place-item">
                <h2>{place.name}</h2>
                <p>{place.description}</p>
                <p>Người tạo: {place.created_by}</p>
                <img src={place.image_path} alt={place.name} />
              </li>
            ))}
          </ul>
        ) : (
          <p>Chào Mừng Bạn Đến Với Travel</p>
        )}
      </div>
    </div>  
  );
};

export default Home;
