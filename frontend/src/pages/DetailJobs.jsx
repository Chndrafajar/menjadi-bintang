import React, { useEffect, useState } from 'react';
import { Footer, Navbar } from '../components';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import { BiSolidCategory } from 'react-icons/bi';
import { FaClock, FaInstagram, FaTwitter } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { TbWorld } from 'react-icons/tb';
import { MdWork } from 'react-icons/md';
import { HiBuildingOffice } from 'react-icons/hi2';
import ApplyButton from '../components/Button/ApplyButton';
import { useAuth } from '../context/auth';

export default function DetailJobs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [auth] = useAuth();
  const [job, setJob] = useState(null); // Mengubah nilai awal menjadi null
  const [applyJob, setApplyJob] = useState([]);
  const params = useParams();

  const getJobs = async () => {
    try {
      const { data } = await axios.get(`https://menjadi-bintang-server.vercel.app/api/v1/job/get-slug/${params.slug}`);
      setJob(data?.jobs);
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    if (params?.slug) getJobs();
  }, [params?.slug]);

  // useEffect(() => {
  //   if (auth?.token) fetchApplyJobs();
  // }, [auth?.token]);

  return (
    <>
      <Navbar />
      <section className="detail-jobs">
        <div className="container">
          <div className="row">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <NavLink to="/">Home</NavLink>
                </li>
                {/* Menambahkan kondisi untuk menampilkan judul pekerjaan */}
                <li className="breadcrumb-item active" aria-current="page">
                  {job?.title}
                </li>
              </ol>
            </nav>
          </div>
          <div className="row">
            <div className="col-lg-7">
              <div className="card">
                <img src={`https://menjadi-bintang-server.vercel.app/${job?.thumbnail}`} />
              </div>
              <div className="info">
                <h3>{job?.title}</h3>
                <div className="info-item">
                  <div className="items">
                    <BiSolidCategory /> <span>{job?.categoryJob}</span>
                  </div>
                  <div className="items">
                    <FaClock /> <span>{job?.tipeJob}</span>
                  </div>
                  <div className="items">
                    <FaLocationDot /> <span>{job?.location}</span>
                  </div>
                </div>
              </div>

              <div className="desc">
                <p>{job?.desc}</p>
                <hr />
                <div className="desc-icons">
                  <div className="icons">
                    <NavLink className="icons-item">
                      <FaInstagram />
                    </NavLink>
                    <NavLink className="icons-item">
                      <TbWorld />
                    </NavLink>
                    <NavLink className="icons-item">
                      <FaTwitter />
                    </NavLink>
                  </div>
                  {auth?.user && <>{!isJobApplied(job?._id) && <ApplyButton jobId={job?._id} onSuccess={handleApplySuccess} onError={handleApplyError} />}</>}
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="profile-company">
                <div className="title">
                  <HiBuildingOffice /> <span>Profile Company</span>
                </div>
                <hr />
                <div className="img-profile">
                  <img src={job?.companyId.profileImage ? `https://menjadi-bintang-server.vercel.app/${job?.companyId.profileImage}` : '/images/user.jpg'} alt={job?.companyId.companyName} />
                  <span>{job?.companyId.companyName}</span>
                </div>
                <hr />
                <div className="desc-company">
                  <div className="info-company-lainnya">
                    <span className="items">
                      <b>Email:</b> {job?.companyId.email}
                    </span>
                    <span className="items">
                      <b>Phone:</b> {job?.companyId.phone}
                    </span>
                    <span className="items">
                      <b>Kantor:</b> {job?.companyId.address}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
