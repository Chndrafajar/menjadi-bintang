import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/auth';
import Authenticated from '../../../layouts/Authenticated';
import { FaEdit } from 'react-icons/fa';

const DashboardCompany = () => {
  const [auth] = useAuth();

  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    answer: '',
    profileImage: null,
  });

  //get data
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get('https://menjadi-bintang-server.vercel.app/api/v1/company/get-single'); // Ganti dengan endpoint yang sesuai
        const { company } = response.data;
        setFormData({
          companyName: company.companyName || '',
          email: company.email || '',
          phone: company.phone || '',
          address: company.address || '',
          answer: company.answer || '',
          profileImage: company.profileImage || null,
          profileImagePreview: `https://menjadi-bintang-server.vercel.app/${company.profileImage}`,
        });
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    };

    fetchCompanyData();
  }, []);

  return (
    <>
      <Authenticated>
        <div className="card p-4">
          <NavLink to={'/dashboard/edit-company'} className="btn-edit-user">
            <FaEdit />
          </NavLink>
          <div className="img-profile-user">
            <img src={auth?.company?.profileImage ? `https://menjadi-bintang-server.vercel.app/${auth?.company?.profileImage.replace(/\\/g, '/')}` : '/images/user.jpg'} alt="" />
          </div>
          <div className="profile-info">
            <h4>Name: {formData.companyName}</h4>
            <h4>Email: {formData.email}</h4>
            <h4>Phone: {formData.phone}</h4>
            <h4>Address: {formData.address}</h4>
          </div>
        </div>
      </Authenticated>
    </>
  );
};

export default DashboardCompany;
