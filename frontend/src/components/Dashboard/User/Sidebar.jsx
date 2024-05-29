import React from 'react';
import { FaBars, FaHouseUser, FaUserCircle } from 'react-icons/fa';
import { MdWork } from 'react-icons/md';
import { HiBuildingOffice2 } from 'react-icons/hi2';
import { GrUserWorker } from 'react-icons/gr';

import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../context/auth';

const Sidebar = ({ active, setActive }) => {
  const [auth] = useAuth();

  return (
    <>
      <section className={'sidebar ' + (active && 'active')}>
        <div className="sidebarItem">
          <div className="title">
            <div className="titleInfo">
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
              <span>{auth?.company?.companyName || auth?.user?.username}</span>
            </div>
            <span className="bars">
              <FaBars onClick={() => setActive(!active)} />
            </span>
          </div>
          <ul className="sidebarLink">
            <li>
              <NavLink to={`/dashboard/${auth?.company && !auth?.user ? 'company' : 'user'}`}>
                <FaUserCircle />
                <span>Profile</span>
              </NavLink>
            </li>
            {auth?.company && (
              <>
                <li>
                  <NavLink to="/dashboard/jobs">
                    <MdWork />
                    <span>My Jobs</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/job-candidate">
                    <GrUserWorker />
                    <span>Jobs Candidate</span>
                  </NavLink>
                </li>
              </>
            )}
            {auth?.user && (
              <li>
                <NavLink to="/dashboard/my-jobs">
                  <HiBuildingOffice2 />
                  <span>My Jobs</span>
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/">
                <FaHouseUser />
                <span>Home</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Sidebar;
