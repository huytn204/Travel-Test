import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlaceList = () => {
  const [places, setPlaces] = useState([]);
  const [newPlace, setNewPlace] = useState({
    id: null,
    name: '',
    description: '',
    created_by: '',
    image_path: ''
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = () => {
    axios.get('http://localhost:8080/places/')
      .then(response => {
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

  const addPlace = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/places/', newPlace)
      .then(response => {
        setPlaces([...places, response.data]);
        setNewPlace({
          id: null,
          name: '',
          description: '',
          created_by: '',
          image_path: ''
        });
      })
      .catch(error => {
        console.error('Có lỗi xảy ra khi thêm địa điểm!', error);
      });
  };

  const updatePlace = () => {
    axios.put(`http://localhost:8080/places/${newPlace.id}`, newPlace)
      .then(response => {
        setPlaces(places.map(place => (place.id === newPlace.id ? response.data : place)));
        setNewPlace({
          id: null,
          name: '',
          description: '',
          created_by: '',
          image_path: ''
        });
        setEditing(false);
      })
      .catch(error => {
        console.error('Có lỗi xảy ra khi cập nhật địa điểm!', error);
      });
  };

  const deletePlace = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa địa điểm này?')) {
      axios.delete(`http://localhost:8080/places/${id}`)
        .then(() => {
          setPlaces(places.filter(place => place.id !== id));
        })
        .catch(error => {
          console.error('Có lỗi xảy ra khi xóa địa điểm!', error);
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPlace({ ...newPlace, [name]: value });
  };

  const editPlace = (place) => {
    setEditing(true);
    setNewPlace(place);
  };

  return (
    <div className="place-list-container">
      <h1>Danh sách địa điểm</h1>
      <form onSubmit={editing ? updatePlace : addPlace}>
        <input
          type="text"
          name="name"
          value={newPlace.name}
          onChange={handleChange}
          placeholder="Tên địa điểm mới"
          required
        />
        <input
          type="text"
          name="description"
          value={newPlace.description}
          onChange={handleChange}
          placeholder="Mô tả"
          required
        />
        <input
          type="text"
          name="created_by"
          value={newPlace.created_by}
          onChange={handleChange}
          placeholder="Người tạo"
          required
        />
        <input
          type="text"
          name="image_path"
          value={newPlace.image_path}
          onChange={handleChange}
          placeholder="Đường dẫn hình ảnh"
          required
        />
        <button type="submit">{editing ? 'Cập nhật' : 'Thêm'}</button>
      </form>
      <ul>
        {places.length > 0 ? (
          places.map(place => (
            <li key={place.id} className="place-item">
              <h2>{place.name}</h2>
              <p>{place.description}</p>
              <p>Người tạo: {place.created_by}</p>
              <img src={place.image_path} alt={place.name} />
              <button onClick={() => editPlace(place)}>Sửa</button>
              <button onClick={() => deletePlace(place.id)}>Xóa</button>
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
