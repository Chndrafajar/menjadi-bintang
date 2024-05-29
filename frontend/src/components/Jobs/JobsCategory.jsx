import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { formatDate } from '../../context/formatDate';
import ApplyButton from '../Button/ApplyButton';
import { useAuth } from '../../context/auth';

const JobsCategory = () => {
  const [auth] = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [applyJob, setApplyJob] = useState([]);
  const navigate = useNavigate();

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

  // Fungsi untuk menangani hasil apply job yang berhasil
  const handleApplySuccess = (data) => {
    console.log('Apply job success:', data);
    // Tambahkan logika yang sesuai, misalnya tampilkan pesan sukses kepada pengguna
  };

  // Fungsi untuk menangani hasil apply job yang gagal
  const handleApplyError = (error) => {
    console.error('Apply job error:', error);
    // Tambahkan logika yang sesuai, misalnya tampilkan pesan error kepada pengguna
  };

  // ...

  const fetchJobsByCategory = async (categoryJob) => {
    try {
      const res = await axios.get(`https://menjadi-bintang-server.vercel.app/api/v1/job/get-category/${categoryJob}`);
      setJobs(res.data.jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
    }
  };

  const getCategoryStyle = (categoryJob) => {
    return selectedCategory === categoryJob
      ? {
          backgroundColor: '#000',
          color: '#fff',
        }
      : {};
  };

  const getAllJobs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('https://menjadi-bintang-server.vercel.app/api/v1/job/get-all');
      if (data?.success) {
        setJobs(data.jobs);
      }
      setTimeout(() => {
        setLoading(false);
      }, 1500);
      setIsActive(false);
    } catch (error) {}
  };

  useEffect(() => {
    if (selectedCategory === '') {
      getAllJobs();
    } else {
      fetchJobsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  return (
    <>
      <section className="jobs" id="job">
        <div className="container">
          <div className="row">
            <div className="link-category">
              <div className="link-category-item" onClick={() => setSelectedCategory('')} style={getCategoryStyle('')}>
                <span>All Categories</span>
              </div>
              <div className="link-category-item" onClick={() => setSelectedCategory('designer')} style={getCategoryStyle('designer')}>
                <span>Designer</span>
              </div>
              <div className="link-category-item" onClick={() => setSelectedCategory('programmer')} style={getCategoryStyle('programmer')}>
                <span>Programmer</span>
              </div>
              <div className="link-category-item" onClick={() => setSelectedCategory('akuntansi')} style={getCategoryStyle('akuntansi')}>
                <span>Akuntansi</span>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            {jobs?.map((j) => (
              <div className="col-md-6 col-lg-4 mb-4">
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
                    {auth?.user ? (
                      <>{!isJobApplied(j._id) && <ApplyButton jobId={j._id} onSuccess={handleApplySuccess} onError={handleApplyError} />}</>
                    ) : (
                      !auth.company && <></> && (
                        <button className="btn-apply" onClick={() => navigate('/user/login')}>
                          Apply
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default JobsCategory;
