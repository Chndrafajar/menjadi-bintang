import { comparePassword, hashPassword } from '../helpers/authHelpers.js';
import userModel from '../models/userModel.js';
import JWT from 'jsonwebtoken';
import fs from 'fs';
import dotenv from 'dotenv';
import { deleteFile, deleteUploadedFiles } from '../middlewares/deleteImageMiddlewares.js';

dotenv.config();

//POST register
export const registerController = async (req, res) => {
  try {
    const { username, email, password, phone, address, answer, profileImage } = req.body;

    // Validations
    if (!username) {
      return res.send({ message: 'Username is required' });
    }
    if (!email) {
      return res.send({ message: 'Email is required' });
    }
    if (!password) {
      return res.send({ message: 'Password is required' });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });

    // If user exists
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: 'Already registered, please login',
      });
    }

    // Register user
    const hashedPassword = await hashPassword(password);

    // Create new user object with default role
    const user = await new userModel({
      username,
      email,
      password: hashedPassword,
      role: 'user', // Set default role to 'user',
      phone: phone || '',
      address: address || '',
      profileImage: profileImage || '',
      answer: answer || '',
    }).save();

    res.status(201).send({
      success: true,
      message: 'User registered successfully',
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error in registering user',
      error,
    });
  }
};

//POST Login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validations
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: 'Invalid email or password',
      });
    }

    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'Email is not registered',
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: 'Invalid password',
      });
    }

    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).send({
      success: true,
      message: 'Login successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        password: user.password,
        profileImage: user.profileImage,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in login',
      error,
    });
  }
};

//Put User
export const updateUserController = async (req, res) => {
  const { username, email, password, phone, address, answer } = req.body;

  try {
    const user = await userModel.findById(req.user._id);

    // Validasi password
    if (password && password.length < 6) {
      return res.json({
        error: 'Password is required and must be at least 6 characters long',
      });
    }

    // Hash password if provided
    const hashedPassword = password ? await hashPassword(password) : user.password;

    // Update user document with provided or existing values
    user.username = username || user.username;
    user.email = email || user.email;
    user.password = hashedPassword;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.answer = answer || user.answer;

    // Jika ada gambar profil baru di-upload, simpan ke database
    // Cek apakah thumbnail baru di-upload, jika ya, hapus yang lama
    if (req.files['profileImage'] && req.files['profileImage'][0]) {
      deleteFile(user.profileImage); // Fungsi deleteFile harus Anda definisikan
      user.profileImage = req.files['profileImage'][0].path;
    }

    // Simpan perubahan ke database
    await user.save();

    res.status(200).send({
      success: true,
      message: 'User updated successfully',
      updateUser: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while updating user',
      error,
    });
  }
};

//get single data user
export const getSingleDataUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    res.status(200).send({
      success: true,
      message: 'Single data user fetched',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error in get single data user',
    });
  }
};

//test controller
export const testController = async (req, res) => {
  res.send('Protected Routes');
};
