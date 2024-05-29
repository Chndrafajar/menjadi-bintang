import React, { useEffect } from 'react';
import { Footer, Hero, JobsCategory, Navbar, Stories } from '../components';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Navbar />
      <Hero />
      <JobsCategory />
      <Stories />
      <Footer />
    </>
  );
};

export default Home;
