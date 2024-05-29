import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Outlet } from 'react-router-dom';

import { Spinner } from '../components/Spinner';
import { useAuth } from '../context/auth';

export default function CompanyPrivate() {
  const [companyOk, setCompanyOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const userCheck = async () => {
      const res = await axios.get('https://menjadi-bintang-server.vercel.app/api/v1/company/company-auth');
      if (res.data.companyOk) {
        setCompanyOk(true);
      } else {
        setCompanyOk(false);
      }
    };
    if (auth?.token) userCheck();
  }, [auth?.token]);

  return companyOk ? <Outlet /> : <Spinner path="company/login" />;
}
