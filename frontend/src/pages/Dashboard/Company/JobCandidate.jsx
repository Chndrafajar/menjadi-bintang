import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/auth';
import Authenticated from '../../../layouts/Authenticated';
import axios from 'axios';
import { formatDate } from '../../../context/formatDate';
import { NavLink } from 'react-router-dom';
import UpdateStatus from '../../../components/Input/UpdateStatus';

const JobCandidate = () => {
  const [auth] = useAuth();

  const [applyJobs, setApplyJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://menjadi-bintang-server.vercel.app/api/v1/apply/company-apply');
        if (res.data.success) {
          setApplyJobs(res.data.applyJobs);
        } else {
          throw new Error(res.data.message);
        }
      } catch (error) {
        console.error('Error fetching apply jobs:', error);
      }
    };
    if (auth?.token) fetchData();
  }, [auth?.token]);

  return (
    <>
      <Authenticated>
        <div className="my-jobs">
          <div className="container">
            <div className="row">
              <h4 style={{ marginBottom: '0px' }}>Jobs Candidate</h4>
            </div>
            <div className="row">
              {applyJobs.map((j) => (
                <div className="col-md-6 mb-4" key={j._id}>
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
                    <hr style={{ margin: '20px 0px' }} />
                    <div className="user">
                      <div className="left-user">
                        <img src={j.user.profileImage ? `https://menjadi-bintang-server.vercel.app/${j.user.profileImage}` : '/images/user.jpg'} alt={j.user.username} />
                      </div>
                      <div className="right-user">
                        <h6 className="date">{formatDate(j.updatedAt)}</h6>
                      </div>
                    </div>
                    <div className="info-user">
                      <h6>Name: {j.user.username}</h6>
                      <h6>Email: {j.user.email}</h6>
                      <h6>Phone: {j.user.phone}</h6>
                      <h6>Address: {j.user.address}</h6>
                    </div>

                    <UpdateStatus applyJobsId={j._id} applyJobsStatus={j.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Authenticated>
    </>
  );
};

export default JobCandidate;
