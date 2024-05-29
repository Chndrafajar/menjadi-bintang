import React, { useEffect, useState } from 'react';
import { formatDate } from '../../context/formatDate';
import { NavLink } from 'react-router-dom';
import ApplyButton from '../Button/ApplyButton';
import { useAuth } from '../../context/auth';
import axios from 'axios';

export default function AllJobs({ searchResult, jobs }) {
  const [auth] = useAuth();
  const [applyJob, setApplyJob] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://menjadi-bintang-server.vercel.app/api/v1/apply/get-apply');
        if (response.data.success) {
          setApplyJob(response.data.applyJobs);
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

  const isJobApplied = (jobId) => {
    return applyJob.some((applyJob) => applyJob.jobs._id === jobId);
  };

  const handleApplySuccess = (data) => {
    console.log('Apply job success:', data);
    // Tambahkan logika yang sesuai, misalnya tampilkan pesan sukses kepada pengguna
  };

  // Fungsi untuk menangani hasil apply job yang gagal
  const handleApplyError = (error) => {
    console.error('Apply job error:', error);
    // Tambahkan logika yang sesuai, misalnya tampilkan pesan error kepada pengguna
  };

  return (
    <>
      <section className="jobs">
        <div className="container">
          <div className="row">
            {searchResult.length > 0
              ? searchResult.map((j) => (
                  <div className="col-md-6 col-lg-4 mb-4" key={j._id}>
                    <div className="card">
                      <div className="company">
                        <div className="company-item">
                          <img src={j.companyId.profileImage ? `https://menjadi-bintang-server.vercel.app/${j.companyId.profileImage}` : '/images/user.jpg'} alt={j.companyId.companyName} />
                          <h6>{j.companyId.companyName}</h6>
                        </div>
                        <h6 className="date">{formatDate(j.updatedAt)}</h6>
                      </div>
                      <div className="posisi">
                        <h4>{j.title}</h4>
                      </div>
                      <div className="info-category">
                        <div className="category-item">
                          <span>{j.categoryJob}</span>
                        </div>
                        <div className="durasi-kerja">
                          <span>{j.tipeJob}</span>
                        </div>
                      </div>
                      <div className="lokasi">
                        <div className="lokasi-item">
                          <img src="/images/lokasi.svg" alt="" />
                          <h5>{j.location}</h5>
                        </div>
                      </div>
                      <div className="desc">
                        <p>{j.desc.substring(0, 150)}...</p>
                      </div>
                      <div className="btn-item">
                        <NavLink to={`/detail/${j.slug}`} className="btn-detail">
                          Detail
                        </NavLink>
                        <ApplyButton jobId={j._id} onSuccess={handleApplySuccess} onError={handleApplyError} />
                      </div>
                    </div>
                  </div>
                ))
              : jobs.map((j) => (
                  <div className="col-md-6 col-lg-4 mb-4" key={j._id}>
                    <div className="card">
                      <div className="company">
                        <div className="company-item">
                          <img src={j.companyId.profileImage ? `https://menjadi-bintang-server.vercel.app/${j.companyId.profileImage}` : '/images/user.jpg'} alt={j.companyId.companyName} />
                          <h6>{j.companyId.companyName}</h6>
                        </div>
                        <h6 className="date">{formatDate(j.updatedAt)}</h6>
                      </div>
                      <div className="posisi">
                        <h4>{j.title}</h4>
                      </div>
                      <div className="info-category">
                        <div className="category-item">
                          <span>{j.categoryJob}</span>
                        </div>
                        <div className="durasi-kerja">
                          <span>{j.tipeJob}</span>
                        </div>
                      </div>
                      <div className="lokasi">
                        <div className="lokasi-item">
                          <img src="/images/lokasi.svg" alt="" />
                          <h5>{j.location}</h5>
                        </div>
                      </div>
                      <div className="desc">
                        <p>{j.desc.substring(0, 150)}...</p>
                      </div>
                      <div className="btn-item">
                        <NavLink to={`/detail/${j.slug}`} className="btn-detail">
                          Detail
                        </NavLink>
                        {auth?.user && <>{!isJobApplied(j._id) && <ApplyButton jobId={j._id} onSuccess={handleApplySuccess} onError={handleApplyError} />}</>}
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>
    </>
  );
}
