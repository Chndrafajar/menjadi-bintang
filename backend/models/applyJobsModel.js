import mongoose from 'mongoose';

const applyJobSchema = new mongoose.Schema(
  {
    jobs: {
      type: mongoose.ObjectId,
      ref: 'job',
    },
    user: {
      type: mongoose.ObjectId,
      ref: 'users',
    },
    company: {
      type: mongoose.ObjectId,
      ref: 'company',
    },
    status: {
      type: String,
      default: 'Review',
      enum: ['Review', 'Selected', 'Interview', 'HRD Interview', 'Rejected', 'Hired'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('applyJob', applyJobSchema);
