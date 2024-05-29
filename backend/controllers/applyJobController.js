import applyJobsModel from '../models/applyJobsModel.js';
import jobsModel from '../models/jobsModel.js';

export const createApplyJobController = async (req, res) => {
  try {
    const { status } = req.body;
    const jobId = req.params._id; // Mengambil id pekerjaan dari parameter rute
    const userId = req.user._id;

    // Mengambil data pekerjaan berdasarkan jobId
    const job = await jobsModel.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Membuat data apply job baru dengan company dari job.companyId
    const newApplyJob = new applyJobsModel({
      jobs: jobId, // Menyimpan id pekerjaan dalam array
      user: userId,
      company: job.companyId, // Mengambil companyId dari job
      status,
    });

    // Menyimpan data apply job ke database
    const savedApplyJob = await newApplyJob.save();

    // Mengembalikan respons dengan data apply job yang baru dibuat
    res.status(201).json(savedApplyJob);
  } catch (error) {
    // Mengembalikan respons jika terjadi error
    res.status(500).json({ message: error.message });
  }
};

//edit status job
export const editApplyJobController = async (req, res) => {
  try {
    const { status } = req.body;
    const applyJobId = req.params._id;
    const companyId = req.company._id;

    // Temukan data apply job yang ingin diedit
    const existingApplyJob = await applyJobsModel.findById({ _id: applyJobId, company: companyId });

    // Jika data apply job tidak ditemukan
    if (!existingApplyJob) {
      return res.status(404).json({ message: 'Apply Job not found' });
    }

    // Update status apply job
    existingApplyJob.status = status;

    // Simpan perubahan
    const updatedApplyJob = await existingApplyJob.save();

    // Kirim respons dengan data apply job yang diperbarui
    res.status(200).json(updatedApplyJob);
  } catch (error) {
    // Mengembalikan respons jika terjadi error
    res.status(500).json({ message: error.message });
  }
};

export const getApplyJobsByUserController = async (req, res) => {
  try {
    const applyJobs = await applyJobsModel
      .find({ user: req.user._id })
      .populate('user', 'username email address profileImage')
      .populate({
        path: 'jobs',
        populate: {
          path: 'companyId',
          select: 'companyName profileImage',
        },
        select: 'title slug categoryJob tipeJob location desc updatedAt',
      })
      .populate('company', 'companyName email profileImage');

    res.json({ success: true, applyJobs });
  } catch (error) {
    console.error('Error while getting jobs:', error);
    res.status(500).json({ success: false, message: 'Error while getting jobs', error: error.message });
  }
};

export const getApplyJobsByCompanyController = async (req, res) => {
  try {
    const applyJobs = await applyJobsModel
      .find({ company: req.company._id })
      .populate('user', 'username email address profileImage')
      .populate({
        path: 'jobs',
        populate: {
          path: 'companyId',
          select: 'companyName profileImage',
        },
        select: 'title slug categoryJob tipeJob location desc updatedAt',
      })
      .populate('company', 'companyName email ');

    res.json({ success: true, applyJobs });
  } catch (error) {
    console.error('Error while getting jobs:', error);
    res.status(500).json({ success: false, message: 'Error while getting jobs', error: error.message });
  }
};
