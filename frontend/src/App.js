import React from "react";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import MainPage from "./pages/main_page/MainPage";
import { LoginPage } from "./pages/login_page/LoginPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import PageTransition from "./utils/PageTransition";
import { RegisterPage } from "./pages/register_page/RegisterPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <MainPage />
                </PageTransition>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;

