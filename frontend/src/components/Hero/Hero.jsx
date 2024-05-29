import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

const Hero = () => {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                Search Between more them <b>50,000</b> open jobs
              </h1>
              <p>Find your dream job anywhere in the world Remotely part time and full time</p>
              <div className="btn-item">
                <button className="btn-black">Apply Now</button>
                <NavLink to="/search" style={{ color: 'inherit', textDecoration: 'none' }} className="btn-white">
                  <BiSearch />
                  <span>Search Jobs</span>
                </NavLink>
              </div>
            </div>
            <div className="col-md-6">
              <div className="images">
                <img src="/images/image-hero.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
