import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert';

export default function UpdateStatus({ applyJobsStatus, applyJobsId }) {
  const [status, setStatus] = useState(applyJobsStatus);

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    try {
      const response = await axios.put(`https://menjadi-bintang-server.vercel.app/api/v1/apply/update/${applyJobsId}`, { status: newStatus });
      const updatedApplyJob = response.data;
      setStatus(updatedApplyJob.status); // Mengatur status baru
      // Di sini Anda bisa melakukan tindakan lain, misalnya memperbarui UI
      swal('Good Job!', 'Sukses update status applyJobs', 'success');

      console.log('Status apply job berhasil diperbarui:', updatedApplyJob);
    } catch (error) {
      console.error('Error updating apply job status:', error);
      swal('Good Job!', error, 'error');

      // Tangani error jika ada
    }
  };

  return (
    <div className="status">
      <select value={status} onChange={handleStatusChange}>
        {' '}
        {/* Menggunakan status yang dikelola oleh useState */}
        <option value={applyJobsStatus}>{applyJobsStatus}</option>
        <option value="Selected">Selected</option>
        <option value="Interview">Interview</option>
        <option value="HRD Interview">HRD Interview</option>
        <option value="Rejected">Rejected</option>
        <option value="Hired">Hired</option>
      </select>
    </div>
  );
}
