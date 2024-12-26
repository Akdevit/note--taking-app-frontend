import React from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import { ToastContainer } from 'react-toastify';

function App() {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if user is logged in

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              !isAuthenticated ? <Register /> : <Navigate to="/dashboard" />
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              !isAuthenticated ? <Login /> : <Navigate to="/dashboard" />
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </>
  );
}

export default App;
