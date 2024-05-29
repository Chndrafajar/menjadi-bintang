import express from 'express';
import colors from 'colors';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

//databases
import connectDB from './config/db.js';

//routes
import userRoutes from './routes/userRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import jobsRoutes from './routes/jobsRoutes.js';
import applyJobRoutes from './routes/applyJobRoutes.js';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
// Dapatkan jalur direktori saat ini dari URL file meta
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//dotenv config
dotenv.config();

//rest object
const app = express();

//databases config
connectDB();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static(join(__dirname, 'uploads')));

//routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/company', companyRoutes);
app.use('/api/v1/job', jobsRoutes);
app.use('/api/v1/apply', applyJobRoutes);

//port
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('<h1>Welcome to menjadi bintang</h1>');
});

//run listen
app.listen(PORT, () => {
  console.log(`Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgGreen.white);
});
