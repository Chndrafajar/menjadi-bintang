import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.ObjectId,
      ref: 'company',
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    categoryJob: {
      type: String,
      required: true,
    },
    tipeJob: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('job', jobSchema);
