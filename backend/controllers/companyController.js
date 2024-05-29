import { comparePassword, hashPassword } from '../helpers/authHelpers.js';
import companyModel from '../models/companyModel.js';
import JWT from 'jsonwebtoken';
import fs from 'fs';
import dotenv from 'dotenv';
import { deleteFile, deleteUploadedFiles } from '../middlewares/deleteImageMiddlewares.js';

//POST register
export const registerController = async (req, res) => {
  try {
    const { companyName, email, password, phone, address, answer, profileImage } = req.body;

    //validations
    if (!companyName) {
      return res.send({ message: 'companyName is required' });
    }
    if (!email) {
      return res.send({ message: 'email is required' });
    }
    if (!password) {
      return res.send({ message: 'password is required' });
    }

    //check company
    const existingCompany = await companyModel.findOne({ email });

    //existing company
    if (existingCompany) {
      return res.status(200).send({
        success: false,
        message: 'Already register please login',
      });
    }

    //register company
    const hashedPassword = await hashPassword(password);

    //save
    const company = await new companyModel({
      companyName,
      email,
      password: hashedPassword,
      role: 'company', // Set default role to 'company'
      phone: phone || '',
      address: address || '',
      profileImage: profileImage || '',
      answer: answer || '',
    }).save();

    res.status(201).send({
      success: true,
      message: 'Company register successfully',
      company,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in register company',
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

    //check company
    const company = await companyModel.findOne({ email });
    if (!company) {
      return res.status(404).send({
        success: false,
        message: 'Email is not registered',
      });
    }

    const match = await comparePassword(password, company.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: 'Invalid password',
      });
    }

    //token
    const token = await JWT.sign({ _id: company._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).send({
      success: true,
      message: 'Login successfully',
      company: {
        companyName: company.companyName,
        email: company.email,
        password: company.password,
        profileImage: company.profileImage,
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

//edit
export const updateCompanyController = async (req, res) => {
  const { companyName, email, password, phone, address, answer } = req.body;

  try {
    const company = await companyModel.findById(req.company._id);

    // Validasi password
    if (password && password.length < 6) {
      return res.json({
        error: 'Password is required and must be at least 6 characters long',
      });
    }

    // Hash password if provided
    const hashedPassword = password ? await hashPassword(password) : company.password;

    // Update company document with provided or existing values
    company.companyName = companyName || company.companyName;
    company.email = email || company.email;
    company.password = hashedPassword;
    company.phone = phone || company.phone;
    company.address = address || company.address;
    company.answer = answer || company.answer;

    // Jika ada gambar profil baru di-upload, simpan ke database
    // Cek apakah thumbnail baru di-upload, jika ya, hapus yang lama
    if (req.files['profileImage'] && req.files['profileImage'][0]) {
      deleteFile(company.profileImage); // Fungsi deleteFile harus Anda definisikan
      company.profileImage = req.files['profileImage'][0].path;
    }

    // Simpan perubahan ke database
    await company.save();

    res.status(200).send({
      success: true,
      message: 'company updated successfully',
      updateCompany: company,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while updating company',
      error,
    });
  }
};

//get single data company
export const getSingleDataCompany = async (req, res) => {
  try {
    // Pastikan req.company ditemukan sebelum mencari data perusahaan
    if (!req.company) {
      return res.status(404).send({
        success: false,
        message: 'Company not found in request',
      });
    }

    const company = await companyModel.findById(req.company._id);

    if (!company) {
      return res.status(404).send({
        success: false,
        message: 'Company not found',
      });
    }

    res.status(200).send({
      success: true,
      message: 'Single data company fetched',
      company,
    });
  } catch (error) {
    console.error('Error in get single data company:', error);
    res.status(500).send({
      success: false,
      message: 'Error in get single data company',
      error: error.message,
    });
  }
};
