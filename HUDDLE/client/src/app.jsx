import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Signup from "./pages/signup";
import ForgotPassword from "./pages/forgotpassword";
import ResetPassword from "./pages/resetpassword";
import Dashboard from "./components/dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Profile from "./pages/profile";

function App() {
  return (
    <BrowserRouter>
   
      <Routes>                                                         

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/forgotpassword"
          element={<ForgotPassword />}
        />

        <Route
        path="/resetpassword/:token"
        element={<ResetPassword />}
        />

        <Route
          path="/dashboard/"
          element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
        />
        <Route
  path="*"
  element={<NotFound />}

/>
    <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
      }
     />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
