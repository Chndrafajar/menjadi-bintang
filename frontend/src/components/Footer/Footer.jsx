import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <img src="/images/logowhite.png" alt="" width={'180px'} />
              <p>Menjadi Bintang adalah Situs lowongan kerja (Job Portal) layanan berbasis software fokus dibidang rekrutmen untuk mempermudah cari pekerjaan dan perekrutan karyawan.</p>
            </div>
            <div className="col-md-3">
              <h5>Tentang Kami</h5>
              <ul>
                <li>
                  <NavLink>About Me</NavLink>
                </li>
                <li>
                  <NavLink>Contact Me</NavLink>
                </li>
                <li>
                  <NavLink>Privacy Policy</NavLink>
                </li>
                <li>
                  <NavLink>Terms and Conditions</NavLink>
                </li>
              </ul>
            </div>
            <div className="col-md-2">
              <h5>Job Search</h5>
              <ul>
                <li>
                  <NavLink to="/user/login">Sign In</NavLink>
                </li>
                <li>
                  <NavLink to="/user/register">Sign Up</NavLink>
                </li>
                <li>
                  <NavLink>Jobs</NavLink>
                </li>
                <li>
                  <NavLink>Tips and Tricks</NavLink>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>Categories</h5>
              <ul>
                <li>
                  <NavLink>Designer</NavLink>
                </li>
                <li>
                  <NavLink>Programmer</NavLink>
                </li>
                <li>
                  <NavLink>Marketing</NavLink>
                </li>
                <li>
                  <NavLink>Social Media</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <footer className="copyright">
        <span>Menjadi Bintang © 2023 • Hak Cipta Dilindungi Undang-Undang.</span>
      </footer>
    </>
  );
};

export default Footer;
