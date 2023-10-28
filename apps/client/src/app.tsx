import { Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import RootLayout from './layouts/root';
import SignUp from './pages/signup';
import PageNotFound from './pages/page_not_found';
import Home from './pages/home';
import PrivateRoute from './components/protected_route';
import Toast from './components/common/toast';
import PublicRoute from './components/public_route';

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
          </Route>
        </Route>
        {/* 👇️ only match this when no other routes match */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
