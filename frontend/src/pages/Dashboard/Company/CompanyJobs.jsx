import React, { useEffect, useState } from 'react';
import Authenticated from '../../../layouts/Authenticated';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../context/auth';
import { FaEdit, FaTrash } from 'react-icons/fa';
import swal from 'sweetalert';

export default function CompanyJobs() {
  const [jobs, setJobs] = useState([]);
  const [auth] = useAuth();
  const navigate = useNavigate();

  const getJobs = async () => {
    try {
      const { data } = await axios.get('https://menjadi-bintang-server.vercel.app/api/v1/job/get');
      setJobs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteJobs = async (jobId) => {
    try {
      const response = await axios.delete(`https://menjadi-bintang-server.vercel.app/api/v1/job/delete/${jobId}`);
      if (response.data.success) {
        setJobs((prevJobs) => prevJobs.filter((p) => p._id !== jobId));
      }
    } catch (error) {
      console.error('Gagal menghapus jobs:', error.response ? error.response.data.message : error.message);
    }
  };

  const handleDelete = (jobId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus jobs ini?')) {
      deleteJobs(jobId);
      swal('Success!', 'Jobs deleted successfully!', 'success').then(() => {
        navigate(0); // Reload halaman
      });
    }
  };

  useEffect(() => {
    if (auth?.token) getJobs();
  }, [auth?.token]);

  return (
    <Authenticated>
      <NavLink to="/dashboard/add-jobs" className="btn" style={{ background: '#000', color: '#fff' }}>
        Add Job
      </NavLink>

      <table className="table mt-4">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Thumbnail</th>
            <th scope="col">Title</th>
            <th scope="col">Category</th>
            <th scope="col">Tipe</th>
            <th scope="col">Location</th>
            <th scope="col">Desc</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs?.map((j, i) => (
            <tr key={j._id}>
              <th scope="row">{i + 1}</th>
              <td>
                <img src={`https://menjadi-bintang-server.vercel.app/${j.thumbnail}`} alt="" width={'100px'} />
              </td>
              <td>{j.title}</td>
              <td style={{ textTransform: 'capitalize' }}>{j.categoryJob}</td>
              <td style={{ textTransform: 'capitalize' }}>{j.tipeJob}</td>
              <td style={{ textTransform: 'capitalize' }}>{j.location}</td>
              <td>{j.desc.substring(0, 150)}...</td>
              <td style={{ display: 'flex' }}>
                <NavLink to={`/dashboard/edit-jobs/${j._id}`} className="btn btn-success">
                  <FaEdit />
                </NavLink>
                <button className="btn btn-danger ms-2" onClick={() => handleDelete(j._id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Authenticated>
  );
}
