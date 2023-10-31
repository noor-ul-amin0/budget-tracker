import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/navbar';
import { useAuth } from '../hooks/auth';

const RootLayout = () => {
  const auth = useAuth();
  return (
    <>
      {auth.user && <Navbar />}
      <Outlet />
    </>
  );
};

export default RootLayout;
