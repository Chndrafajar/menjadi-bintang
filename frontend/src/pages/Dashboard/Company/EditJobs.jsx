import React, { useState, useEffect } from 'react';
import Authenticated from '../../../layouts/Authenticated';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

export default function EditJobs() {
  const { id } = useParams(); // Ambil ID dari URL
  const [formData, setFormData] = useState({
    title: '',
    categoryJob: '',
    tipeJob: '',
    location: '',
    desc: '',
    thumbnail: null,
    thumbnailPreview: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const getSingleData = async () => {
      const response = await axios.get(`https://menjadi-bintang-server.vercel.app/api/v1/job/get-id/${params.jobId}`);
      if (response.data.success) {
        const { title, categoryJob, tipeJob, location, desc, thumbnail } = response.data.jobs;
        setFormData({
          title,
          categoryJob,
          tipeJob,
          location,
          desc,
          thumbnail,
          thumbnailPreview: `https://menjadi-bintang-server.vercel.app/${thumbnail}`,
        });
      }
    };
    getSingleData();
  }, [params.pid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    if (name === 'thumbnail') {
      const file = files[0];
      setFormData((prevState) => ({
        ...prevState,
        thumbnail: file,
        thumbnailPreview: file ? URL.createObjectURL(file) : null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append('title', formData.title);
    data.append('categoryJob', formData.categoryJob);
    data.append('tipeJob', formData.tipeJob);
    data.append('location', formData.location);
    data.append('desc', formData.desc);

    if (formData.thumbnail) {
      data.append('thumbnail', formData.thumbnail);
    }

    try {
      const res = await axios.put(`https://menjadi-bintang-server.vercel.app/api/v1/job/edit/${params.jobId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      swal('Success!', 'Job updated successfully!', 'success');
      setLoading(false);
      navigate('/dashboard/jobs');
    } catch (error) {
      console.error('Error updating job:', error);
      let errorMessage = 'Failed to update job.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      swal('Failed!', errorMessage, 'error');
      setLoading(false);
    }
  };

  return (
    <Authenticated>
      <div className="card p-4">
        <h4 style={{ marginBottom: '0px' }}>Edit Job: {formData.title}</h4>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="thumbnail" className="form-label">
              Thumbnail
            </label>
            {formData.thumbnailPreview && (
              <div className="mb-3" style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <img src={formData.thumbnailPreview} alt="Thumbnail" width={'300px'} style={{ border: '1px solid #0004' }} />
              </div>
            )}
            <input className="form-control" type="file" name="thumbnail" onChange={handleFileChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title Jobs
            </label>
            <input type="text" className="form-control" id="title" placeholder="title..." name="title" value={formData.title} onChange={handleInputChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="categoryJob" className="form-label">
              Category Jobs
            </label>
            <select className="form-select" id="categoryJob" name="categoryJob" value={formData.categoryJob} onChange={handleInputChange}>
              <option selected>Pilih Category</option>
              <option value="designer">Designer</option>
              <option value="programmer">Programmer</option>
              <option value="marketing">Marketing</option>
              <option value="socialmedia">Social Media</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="tipeJob" className="form-label">
              Tipe Jobs
            </label>
            <select className="form-select" id="tipeJob" name="tipeJob" value={formData.tipeJob} onChange={handleInputChange}>
              <option selected>Pilih Tipe Job</option>
              <option value="fulltime">Full Time</option>
              <option value="parttime">Part Time</option>
              <option value="remote">Remote</option>
              <option value="magang">Magang</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="tipeJob" className="form-label">
              Location
            </label>
            <select className="form-select" id="location" name="location" value={formData.location} onChange={handleInputChange}>
              <option selected>Pilih Location</option>
              <option value="jakarta">Jakarta</option>
              <option value="bandung">Bandung</option>
              <option value="semarang">Semarang</option>
              <option value="yogyakarta">Yogyakarta</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">
              Description
            </label>
            <textarea cols="30" rows="10" className="form-control" name="desc" value={formData.desc} onChange={handleInputChange} />
          </div>
          {loading ? (
            <button type="submit" className="btn" style={{ background: '#000', color: '#fff' }}>
              Loading...
            </button>
          ) : (
            <button type="submit" className="btn" style={{ background: '#000', color: '#fff' }}>
              Update Job
            </button>
          )}
        </form>
      </div>
    </Authenticated>
  );
}
