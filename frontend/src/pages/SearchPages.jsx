import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AllJobs, Footer, Navbar } from '../components';
import { IoSearchOutline } from 'react-icons/io5';

const SearchPages = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [jobs, setJobs] = useState([]);

  //get jobs by
  const [categoryJob, setCategoryJob] = useState('');
  const [tipeJob, setTipeJob] = useState('');
  const [location, setLocation] = useState('');
  const [keyword, setKeyword] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  //get all jobs
  const getAllJobs = async () => {
    try {
      const { data } = await axios.get('https://menjadi-bintang-server.vercel.app/api/v1/job/get-all');
      if (data?.success) {
        setJobs(data.jobs);
      }
    } catch (error) {}
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(`https://menjadi-bintang-server.vercel.app/api/v1/job/search/${keyword}`);
      setSearchResult(res.data);
    } catch (error) {
      console.error('Error searching jobs:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://menjadi-bintang-server.vercel.app/api/v1/job/get-category/${categoryJob}`);
        setJobs(res.data.jobs);
      } catch (error) {
        console.error('Error fetching jobs data:', error);
      }
    };

    if (categoryJob) {
      fetchData();
    }
  }, [categoryJob]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://menjadi-bintang-server.vercel.app/api/v1/job/get-tipeJob/${tipeJob}`);
        setJobs(res.data.jobs);
      } catch (error) {
        console.error('Error fetching jobs data:', error);
      }
    };

    if (tipeJob) {
      fetchData();
    }
  }, [tipeJob]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://menjadi-bintang-server.vercel.app/api/v1/job/get-location/${location}`);
        setJobs(res.data.jobs);
      } catch (error) {
        console.error('Error fetching jobs data:', error);
      }
    };

    if (location) {
      fetchData();
    }
  }, [location]);

  useEffect(() => {
    getAllJobs();
  }, []);

  return (
    <>
      <Navbar />
      <div className="searchPages">
        <div className="container">
          <div className="input-filter">
            <div className="input-search">
              <input
                type="text"
                placeholder="Search.."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
              <IoSearchOutline onClick={handleSearch} />
            </div>
            <div className="option-category">
              <select onChange={(e) => setCategoryJob(e.target.value)}>
                <option value="">Select Category</option>
                <option value="designer">Designer</option>
                <option value="programmer">Programmer</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
            <div className="option-category">
              <select onChange={(e) => setTipeJob(e.target.value)}>
                <option value="">Select Job Type</option>
                <option value="part time">Part Time</option>
                <option value="magang">Magang</option>
                <option value="full time">Full Time</option>
              </select>
            </div>
            <div className="option-category">
              <select onChange={(e) => setLocation(e.target.value)}>
                <option value="">Select Location</option>
                <option value="jakarta">Jakarta</option>
                <option value="semarang">Semarang</option>
                <option value="bandung">Bandung</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <AllJobs categoryJob={categoryJob} searchResult={searchResult} tipeJob={tipeJob} location={location} jobs={jobs} />
      <Footer />
    </>
  );
};

export default SearchPages;
