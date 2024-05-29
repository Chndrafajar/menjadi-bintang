import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/auth';
import Authenticated from '../../../layouts/Authenticated';
import { FaEdit } from 'react-icons/fa';
import { formatDate } from '../../../context/formatDate';

const MyJobs = () => {
  const [auth] = useAuth();

  const [applyJobs, setApplyJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://menjadi-bintang-server.vercel.app/api/v1/apply/get-apply');
        if (response.data.success) {
          setApplyJobs(response.data.applyJobs);
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching apply jobs:', error);
        // Handle error, misalnya dengan menampilkan pesan kesalahan ke pengguna
      }
    };

    if (auth?.token) fetchData();
  }, [auth?.token]);

  return (
    <Authenticated>
      <div className="my-jobs">
        <div className="container">
          <div className="row mt-5">
            {applyJobs.map((j) => (
              <div className="col-md-6 col-lg- mb-4" key={j._id}>
                {' '}
                {/* Tambahkan key prop */}
                <div className="card">
                  <div className="company">
                    <div className="company-item">
                      <img src={j.jobs.companyId.profileImage ? `https://menjadi-bintang-server.vercel.app/${j.jobs.companyId.profileImage}` : '/images/user.jpg'} alt={j.jobs.companyId.companyName} />
                      <h6>{j.jobs.categoryJob}</h6>
                    </div>
                    <h6 className="date">{formatDate(j.jobs.updatedAt)}</h6>
                  </div>
                  <div className="posisi">
                    <h4>{j.jobs.title}</h4>
                  </div>
                  <div className="info-category">
                    <div className="category-item">
                      <span>{j.jobs.categoryJob}</span>
                    </div>
                    <div className="durasi-kerja">
                      <span>{j.jobs.tipeJob}</span>
                    </div>
                  </div>
                  <div className="lokasi">
                    <div className="lokasi-item">
                      <img src="/images/lokasi.svg" alt="" />
                      <h5>{j.jobs.location}</h5>
                    </div>
                  </div>
                  <div className="desc">
                    <p>{j.jobs.desc}</p>
                  </div>
                  <div className="btn-item">
                    <NavLink to={`/detail/${j.jobs.slug}`} className="btn-detail">
                      Detail
                    </NavLink>
                  </div>
                  <hr />
                  <div className="status">
                    <div className="status-user">
                      <h6>Status: </h6>
                      <div className="item-status">{j.status}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Authenticated>
  );
};

export default MyJobs;
