import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/auth';
import Authenticated from '../../../layouts/Authenticated';
import { FaEdit } from 'react-icons/fa';

const DashboardUser = () => {
  const [auth] = useAuth();

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
        const response = await axios.get('https://menjadi-bintang-server.vercel.app/api/v1/user/get-single'); // Ganti dengan endpoint yang sesuai
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

  return (
    <>
      <Authenticated>
        <div className="card p-4" style={{ boxShadow: '0 0.1rem 1rem rgba(0, 0, 0, 0.15)', border: 'none' }}>
          <NavLink to={'/dashboard/edit-user'} className="btn-edit-user">
            <FaEdit />
          </NavLink>
          <div className="img-profile-user">
            <img src={auth?.user?.profileImage ? `https://menjadi-bintang-server.vercel.app/${auth?.user?.profileImage.replace(/\\/g, '/')}` : '/images/user.jpg'} alt="" />
          </div>
          <div className="profile-info">
            <h4>Name: {formData.username}</h4>
            <h4>Email: {formData.email}</h4>
            <h4>Phone: {formData.phone}</h4>
            <h4>Address: {formData.address}</h4>
          </div>
        </div>
      </Authenticated>
    </>
  );
};

export default DashboardUser;
