import { Route, Routes } from 'react-router-dom';
import { useAuth } from './context/auth';

//auth
import { Login, LoginCompany, Register, RegisterCompany } from './pages/Auth';

//user
import UserPrivate from './routes/UserPrivate';
import EditUser from './pages/Dashboard/User/EditUser';
import CompanyPrivate from './routes/CompanyPrivate';
import DashboardUser from './pages/Dashboard/User/DashboardUser';
import MyJobs from './pages/Dashboard/User/MyJobs';

//company
import DashboardCompany from './pages/Dashboard/Company/DashboardCompany';
import EditCompany from './pages/Dashboard/Company/EditCompany';
import CompanyJobs from './pages/Dashboard/Company/CompanyJobs';
import AddJobs from './pages/Dashboard/Company/AddJobs';
import EditJobs from './pages/Dashboard/Company/EditJobs';

//all pages
import Home from './pages/Home';
import SearchPages from './pages/SearchPages';
import DetailJobs from './pages/DetailJobs';
import JobCandidate from './pages/Dashboard/Company/JobCandidate';
import NotFoundPages from './pages/NotFoundPages';

function App() {
  const [auth, setAuth] = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFoundPages />} />
        <Route path="/search" element={<SearchPages />} />
        <Route path="/detail/:slug" element={<DetailJobs />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/company/login" element={<LoginCompany />} />
        <Route path="/company/register" element={<RegisterCompany />} />
        <Route path="/dashboard" element={<UserPrivate />}>
          <Route path="user" element={<DashboardUser />} />
          <Route path="edit-user" element={<EditUser />} />
          <Route path="my-jobs" element={<MyJobs />} />
        </Route>
        <Route path="/dashboard" element={<CompanyPrivate />}>
          <Route path="company" element={<DashboardCompany />} />
          <Route path="edit-company" element={<EditCompany />} />
          <Route path="jobs" element={<CompanyJobs />} />
          <Route path="add-jobs" element={<AddJobs />} />
          <Route path="job-candidate" element={<JobCandidate />} />
          <Route path="edit-jobs/:jobId" element={<EditJobs />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
