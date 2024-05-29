import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const ApplyButton = ({ jobId, onSuccess, onError }) => {
  const navigate = useNavigate();

  const handleApplyJob = async () => {
    try {
      const response = await axios.post(`https://menjadi-bintang-server.vercel.app/api/v1/apply/apply-job/${jobId}`, { status: 'Review' });
      onSuccess(response.data);
      swal('Good Job!', 'Apply Jobs Successfully', 'success').then(() => {
        navigate(0); // Reload halaman
      });
    } catch (error) {
      onError(error); // Panggil fungsi onError dengan error yang diterima
    }
  };

  return (
    <button className="btn-apply" onClick={handleApplyJob}>
      Apply
    </button>
  );
};

export default ApplyButton;
