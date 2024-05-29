import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/auth';
import Authenticated from '../../../layouts/Authenticated';

const EditUser = () => {
  const [auth, setAuth] = useAuth(); // Menggunakan useAuth hook untuk mendapatkan akses ke konteks autentikasi
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    answer: '',
    profileImage: null,
    profileImagePreview: '',
  });

  //get data user
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://menjadi-bintang-server.vercel.app/api/v1/user/get-single');
        const { user } = response.data;
        setFormData({
          username: user.username || '',
          email: user.email || '',
          phone: user.phone || '',
          address: user.address || '',
          answer: user.answer || '',
          profileImage: user.profileImage || null,
          profileImagePreview: `https://menjadi-bintang-server.vercel.app/${user.profileImage}`,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    if (name === 'profileImage') {
      const file = files[0];
      setFormData((prevState) => ({
        ...prevState,
        profileImage: file,
        profileImagePreview: file ? URL.createObjectURL(file) : null,
      }));
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      const response = await axios.put('https://menjadi-bintang-server.vercel.app/api/v1/user/update-profile', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setLoading(false);
      if (response.data.success) {
        // Perbarui data pengguna di local storage
        const updatedUserData = response.data.updateUser;
        setAuth((prevAuth) => ({
          ...prevAuth,
          user: updatedUserData,
        }));
        // Simpan data baru ke local storage
        localStorage.setItem(
          'auth',
          JSON.stringify({
            ...auth,
            user: updatedUserData,
          })
        );
        swal('Good Job!', 'User updated successfully', 'success');
        navigate('/dashboard/user');
      }
    } catch (error) {
      swal('Miss!', 'Error updating user', 'error');
    }
  };

  return (
    <>
      <Authenticated>
        <div className="card p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label class="form-label">Profile Image:</label>

              {formData.profileImagePreview && (
                <div className="mb-3" style={{ display: 'flex', justifyContent: 'center' }}>
                  <img src={formData.profileImagePreview} alt="Thumbnail Preview" style={{ width: '100px', height: '100px' }} />
                </div>
              )}

              <input type="file" name="profileImage" onChange={handleFileChange} className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Username:</label>
              <input type="text" name="username" value={formData.username} onChange={handleInputChange} className="form-control" />
            </div>
            <div className="mb-3">
              <label class="form-label">Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-control" />
            </div>
            <div className="mb-3">
              <label class="form-label">Password:</label>
              <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="form-control" />
            </div>
            <div className="mb-3">
              <label class="form-label">Phone:</label>
              <input type="number" name="phone" value={formData.phone} onChange={handleInputChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label class="form-label">Answer:</label>
              <input type="text" name="answer" value={formData.answer} onChange={handleInputChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label class="form-label">Address:</label>
              <textarea name="address" value={formData.address} onChange={handleInputChange} className="form-control" cols="30" rows="10" />
            </div>
            {loading ? (
              <button type="submit" className="btn" style={{ background: '#000', color: '#fff' }}>
                Loading....
              </button>
            ) : (
              <button type="submit" className="btn" style={{ background: '#000', color: '#fff' }}>
                Update User
              </button>
            )}
          </form>
        </div>
      </Authenticated>
    </>
  );
};

export default EditUser;
