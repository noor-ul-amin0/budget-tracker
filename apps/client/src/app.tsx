import { Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import RootLayout from './layouts/root';
import SignUp from './pages/signup';
import PageNotFound from './pages/page_not_found';
import Home from './pages/home';
import PrivateRoute from './components/protected_route';
import Toast from './components/common/toast';

export function App() {
  return (
    <>
      <Toast />
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="*" element={<PrivateRoute />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* 👇️ only match this when no other routes match */}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;