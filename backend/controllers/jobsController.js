import { jobs } from '../../frontend/src/utils/data.js';
import { deleteFile, deleteUploadedFiles } from '../middlewares/deleteImageMiddlewares.js';
import jobsModel from '../models/jobsModel.js';
import slugify from 'slugify';

//add
export const addJobController = async (req, res) => {
  try {
    const { title, categoryJob, tipeJob, location, desc } = req.body;
    const thumbnail = req.files['thumbnail'] && req.files['thumbnail'][0] ? req.files['thumbnail'][0] : null;

    // Validasi semua field yang diperlukan
    if (!title || !categoryJob || !tipeJob || !location || !desc || !thumbnail) {
      // Hapus file yang diunggah jika ada kesalahan
      deleteUploadedFiles(req.files);
      return res.status(400).json({ message: 'Semua field harus diisi, termasuk gambar' });
    }

    const thumbnailPath = thumbnail.path;

    // Dapatkan ID perusahaan dari objek req.company
    const companyId = req.company._id;

    // Buat slug dari judul
    const jobSlug = slugify(title);

    const newJob = new jobsModel({
      title,
      categoryJob,
      tipeJob,
      location,
      desc,
      thumbnail: thumbnailPath,
      slug: jobSlug, // Tambahkan slug ke objek pekerjaan baru
      companyId: companyId, // Tambahkan companyId ke objek pekerjaan baru
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    deleteUploadedFiles(req.files);
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan dalam menambahkan pekerjaan', error: error.message });
  }
};

//routes
export const editJobController = async (req, res) => {
  try {
    const { title, categoryJob, tipeJob, location, desc } = req.body;
    const thumbnailFile = req.files['thumbnail'] && req.files['thumbnail'][0];
    let thumbnail = null;

    // Dapatkan ID perusahaan dari objek req.company
    const companyId = req.company._id;

    // Buat slug dari judul
    const jobSlug = slugify(title);

    // Temukan pekerjaan yang ingin diedit
    const existingJob = await jobsModel.findOne({ companyId, _id: req.params.jobId });

    // Jika pekerjaan tidak ditemukan
    if (!existingJob) {
      deleteUploadedFiles(req.files);
      return res.status(404).json({ message: 'Pekerjaan tidak ditemukan' });
    }

    // Jika ada thumbnail baru, hapus thumbnail lama
    if (req.files['thumbnail'] && req.files['thumbnail'][0]) {
      deleteFile(existingJob.thumbnail); // Hapus thumbnail lama
      existingJob.thumbnail = req.files['thumbnail'][0].path;
    }

    // Update data pekerjaan
    existingJob.title = title;
    existingJob.categoryJob = categoryJob;
    existingJob.tipeJob = tipeJob;
    existingJob.location = location;
    existingJob.desc = desc;
    existingJob.slug = jobSlug;

    // Simpan perubahan
    const updatedJob = await existingJob.save();

    // Kirim respons dengan data pekerjaan yang diperbarui
    res.status(200).json(updatedJob);
  } catch (error) {
    deleteUploadedFiles(req.files);
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan dalam mengedit pekerjaan', error: error.message });
  }
};

//delete
export const deleteJobsController = async (req, res) => {
  const { jobId } = req.params; // Dapatkan ID dari URL

  try {
    const job = await jobsModel.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'job tidak ditemukan' });
    }

    // Hapus file terkait (thumbnail dan gambar fitur) jika ada
    if (job.thumbnail) {
      deleteFile(job.thumbnail); // Fungsi hapusFile harus didefinisikan untuk menangani penghapusan file
    }

    // Hapus job dari basis data
    await jobsModel.deleteOne({ _id: jobId });
    res.status(200).json({ message: 'job berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getJobsController = async (req, res) => {
  try {
    const jobs = await jobsModel.find({ companyId: req.company._id }).populate('companyId', 'companyName profileImage');
    res.json(jobs);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: 'Error while getting jobs',
      error,
    });
  }
};

//get single jobs id
export const getSingleDataJobsId = async (req, res) => {
  try {
    const jobs = await jobsModel.findById(req.params.jobId);
    res.status(200).send({
      success: true,
      message: 'Single data jobs fetched',
      jobs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error in get single data jobs',
    });
  }
};

//get single jobs slug
export const getSingleJobsSlug = async (req, res) => {
  try {
    const jobs = await jobsModel
      .findOne({
        slug: req.params.slug,
      })
      .populate('companyId', 'companyName profileImage phone address email');
    res.status(200).send({
      success: true,
      message: 'Single jobs fetched',
      jobs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error in get single jobs',
    });
  }
};

//get all jobs
export const getAllJobsController = async (req, res) => {
  try {
    const jobs = await jobsModel.find({}).sort({ createdAt: -1 }).populate('companyId', 'companyName profileImage');
    res.status(200).send({
      success: true,
      message: 'All jobs',
      jobs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error in get all jobs',
    });
  }
};

//get by category
export const getJobsByCategory = async (req, res) => {
  const { categoryJob } = req.params;

  try {
    const jobs = await jobsModel.find({ categoryJob: categoryJob }).populate('companyId', 'companyName profileImage');

    if (jobs.length === 0) {
      return res.status(404).json({ message: 'Tidak ada jobs yang ditemukan untuk kategori ini' });
    }

    res.status(200).json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get by tipe job
export const getJobsByTipeJobs = async (req, res) => {
  const { tipeJob } = req.params;

  try {
    const jobs = await jobsModel.find({ tipeJob: tipeJob }).populate('companyId', 'companyName profileImage');

    if (jobs.length === 0) {
      return res.status(404).json({ message: 'Tidak ada jobs yang ditemukan untuk Tipe Job ini' });
    }

    res.status(200).json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get by location
export const getJobsByLocation = async (req, res) => {
  const { location } = req.params;

  try {
    const jobs = await jobsModel.find({ location: location }).populate('companyId', 'companyName profileImage');

    if (jobs.length === 0) {
      return res.status(404).json({ message: 'Tidak ada jobs yang ditemukan untuk location ini' });
    }

    res.status(200).json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get jobs search
export const searchJobsController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await jobsModel
      .find({
        $or: [{ title: { $regex: keyword, $options: 'i' } }, { categoryJob: { $regex: keyword, $options: 'i' } }],
      })
      .populate('companyId', 'companyName profileImage');
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: 'Error in search jobs api',
      error,
    });
  }
};
