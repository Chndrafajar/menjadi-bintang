import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { useAuth } from '../../../context/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  //form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://menjadi-bintang-server.vercel.app/api/v1/user/login', {
        email,
        password,
      });

      if (res && res.data.success) {
        swal('Good Job!', res.data.message, 'success');
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });

        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate(location.state || '/');
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
          <h5>Login Pages</h5>
          <div className="auth-link">
            <NavLink className="login-link-item" to="/user/login">
              User
            </NavLink>
            <NavLink className="auth-link-item" to="/company/login">
              Company
            </NavLink>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div className="form-item">
              <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="forgot-password">
              <NavLink>Forgot Password?</NavLink>
            </div>

            <div className="form-item">
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="btn-auth" type="submit">
              Login
            </button>
          </form>
          <div style={{ marginTop: '15px' }}>
            <span>
              don't have an account yet? <NavLink to="/user/register">Sign Up</NavLink>
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
