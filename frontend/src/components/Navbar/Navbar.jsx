import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HiBars3 } from 'react-icons/hi2';
import { AiOutlineClose } from 'react-icons/ai';
import { IoHome, IoSearch } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';

import { useAuth } from '../../context/auth';

const Navbar = () => {
  const [active, setActive] = useState(false);

  const [dropdown, setDropdown] = useState(false);

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      company: null,
      token: '',
    });
    navigate('/user/login');
    localStorage.removeItem('auth');
    swal('Good Job!', 'Logout successfully', 'success');
  };

  return (
    <>
      <nav className="navbar navbar-expand-md">
        <div className="container">
          <NavLink to="/" className="navbar-brand">
            <img src="/images/logo.png" alt="" width={'180px'} />
          </NavLink>
          <button className="navbar-toggler" type="button" onClick={() => setActive(!active)}>
            {active ? <AiOutlineClose /> : <HiBars3 />}
          </button>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item">
                <NavLink className="nav-link" href="#">
                  About Us
                </NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#job">
                  Jobs
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#story">
                  Our Stories
                </a>
              </li>
              <div className="account">
                {/* Periksa apakah tidak ada data perusahaan atau user */}
                {!auth?.company && !auth?.user ? (
                  <div className="link-auth">
                    <li className="nav-item">
                      <NavLink to="/user/register" className="nav-link">
                        Sign Up
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/user/login">
                        <button className="btn-login">Login</button>
                      </NavLink>
                    </li>
                  </div>
                ) : (
                  <div className="profile">
                    {/* Pastikan ada data perusahaan atau user sebelum mengakses propertinya */}
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {/* Gunakan operator ternary untuk menentukan URL gambar */}
                        <img
                          src={
                            auth?.company?.profileImage
                              ? `https://menjadi-bintang-server.vercel.app/${auth?.company?.profileImage}`
                              : auth?.user?.profileImage
                              ? `https://menjadi-bintang-server.vercel.app/${auth?.user?.profileImage}`
                              : '/images/user.jpg'
                          }
                          alt={auth?.company?.companyName || auth?.user?.username}
                          style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <NavLink to={`/dashboard/${auth?.company && !auth.user ? 'company' : 'user'}`} className="dropdown-item">
                            Dashboard
                          </NavLink>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          {/* Handle logout sesuai dengan fungsi yang diberikan */}
                          <a className="dropdown-item" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                            Logout
                          </a>
                        </li>
                      </ul>
                    </li>
                  </div>
                )}
              </div>
            </ul>
          </div>
        </div>
      </nav>

      <div className={'link-mobile ' + (active && 'active')}>
        <div className="container">
          <ul>
            <li onClick={() => setActive(!active)}>
              <a href="#about"> About Us</a>
            </li>
            <li onClick={() => setActive(!active)}>
              <a href="#job">Jobs</a>
            </li>
            <li onClick={() => setActive(!active)}>
              <a href="#story">Our Stories</a>
            </li>
            {!auth?.company && !auth?.user ? (
              <>
                <li onClick={() => setActive(!active)}>
                  <NavLink to="/user/register">SignUp</NavLink>
                </li>
                <li onClick={() => setActive(!active)}>
                  <button className="btn-login">
                    <NavLink to="/user/login">SignUp</NavLink>
                  </button>
                </li>
              </>
            ) : (
              <div></div>
            )}
          </ul>
        </div>
      </div>

      <nav className="navbar-mobile">
        <ul>
          <li>
            <NavLink to="/">
              <IoHome />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/search">
              <IoSearch />
              <span>Search</span>
            </NavLink>
          </li>
          <li>
            {!auth?.company && !auth?.user ? (
              <>
                <FaUserCircle />
                <span>User</span>
              </>
            ) : (
              <>
                <a role="button" onClick={() => setDropdown(!dropdown)}>
                  <img
                    src={
                      auth?.company?.profileImage
                        ? `https://menjadi-bintang-server.vercel.app/${auth?.company?.profileImage}`
                        : auth?.user?.profileImage
                        ? `https://menjadi-bintang-server.vercel.app/${auth?.user?.profileImage}`
                        : '/images/user.jpg'
                    }
                    alt={auth?.company?.companyName || auth?.user?.username}
                  />
                  <span>{auth?.company?.companyName || auth?.user?.username}</span>
                </a>
                <div className={'menu-dropdown ' + (dropdown && 'active')}>
                  <ul className="item-menu">
                    <li className="item-text">
                      <NavLink to={`/dashboard/${auth?.company && !auth.user ? 'company' : 'user'}`} className="dropdown-item">
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a onClick={handleLogout} style={{ cursor: 'pointer', color: '#000' }}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
