import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
    },
    address: {
      type: String,
    },
    answer: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('users', userSchema);
