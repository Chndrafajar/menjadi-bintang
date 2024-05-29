import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Outlet } from 'react-router-dom';

import { Spinner } from '../components/Spinner';
import { useAuth } from '../context/auth';

export default function UserPrivate() {
  const [userOk, setUserOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const userCheck = async () => {
      const res = await axios.get('https://menjadi-bintang-server.vercel.app/api/v1/user/user-auth');
      if (res.data.userOk) {
        setUserOk(true);
      } else {
        setUserOk(false);
      }
    };
    if (auth?.token) userCheck();
  }, [auth?.token]);

  return userOk ? <Outlet /> : <Spinner path="user/login" />;
}
