import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://menjadi-bintang-server.vercel.app/api/v1/user/register', {
        username,
        email,
        password,
      });
      if (res && res.data.success) {
        swal('Good Job!', res.data.message, 'success');
        navigate('/user/login');
      } else {
        swal('Miss!', res.data.message, 'error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="auth">
        <div className="auth-item">
          <h5>Register Pages</h5>
          <div className="auth-link">
            <NavLink className="auth-link-item" to="/user/register">
              User
            </NavLink>
            <NavLink className="auth-link-item" to="/company/register">
              Company
            </NavLink>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div className="form-item">
              <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} />
            </div>
            <div className="form-item">
              <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>
            <div className="form-item">
              <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>
            <button className="btn-auth" type="submit">
              Register
            </button>
          </form>
          <div style={{ marginTop: '15px' }}>
            <span>
              Already have account? <NavLink to="/user/login">Sign In</NavLink>
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;