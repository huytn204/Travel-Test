import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PlaceList.css';

const PlaceList = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = () => {
    axios.get('http://localhost:8080/places/')
      .then(response => {
        // Kiểm tra và truy xuất danh sách địa điểm từ response.data.content
        if (response.data.content && Array.isArray(response.data.content)) {
          setPlaces(response.data.content);
        } else {
          console.error('Dữ liệu nhận được không phải là một mảng:', response.data);
        }
      })
      .catch(error => {
        console.error('Có lỗi xảy ra khi lấy dữ liệu các địa điểm!', error);
      });
  };

  return (
    <div className="place-list-container">
      <h1>Danh sách địa điểm</h1>
      <ul>
        {places.length > 0 ? (
          places.map(place => (
            <li key={place.id} className="place-item">
              <h2>{place.name}</h2>
              <p>{place.description}</p>
              <p>Người tạo: {place.created_by}</p>
              <img src={place.image_path} alt={place.name} />
            </li>
          ))
        ) : (
          <li>Không có dữ liệu để hiển thị</li>
        )}
      </ul>
    </div>
  );
};

export default PlaceList;
