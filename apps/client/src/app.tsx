import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/login';
import RootLayout from './layouts/root';
import SignUp from './pages/signup/signup';
import PageNotFound from './pages/page_not_found/page_not_found';
import Home from './pages/home/home';
import PrivateRoute from './components/protected_route/protected_route';
import Toast from './components/common/toast/toast';
import PublicRoute from './components/public_route/public_route';
import Reports from './pages/reports/reports';

export function App() {
  return (
    <>
      <Toast />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route element={<RootLayout />}>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/reports" element={<Reports />} />
          </Route>
        </Route>
        {/* 👇️ only match this when no other routes match */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
