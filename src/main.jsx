import Login from "./pages/Login.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Header from "./components/Header.jsx";
import Menu from './components/menu.jsx';
import Team from "./pages/Team.jsx";
import Office from "./pages/office.jsx";
import Finance from "./pages/finance.jsx";
import Training from "./pages/Training.jsx";
import Schedule from "./pages/Schedule.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import League from "./pages/League.jsx";
import TeamProfile from "./pages/TeamProfile";
import PlayerProfile from "./pages/PlayerProfile";
import Arena from "./pages/arena.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Redirect "/" to "/login" */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login page (no menu) */}
        <Route path="/login" element={<Login />} />

        {/* App layout: has menu + outlet */}
        <Route path="/" element={<App />}>
          <Route path="team/:id" element={<TeamProfile />} />
          <Route path="team" element={
            <ProtectedRoute>
              <Team />
            </ProtectedRoute>
          } />
          <Route path="player/:id" element={<PlayerProfile />} />
          <Route path="office" element={
            <ProtectedRoute>
              <Office />
            </ProtectedRoute>
          } />
          <Route path="finance" element={
            <ProtectedRoute>
              <Finance />
            </ProtectedRoute>
          } />
          <Route path="training" element={
            <ProtectedRoute>
              <Training />
            </ProtectedRoute>
          } />
          <Route path="schedule" element={
            <ProtectedRoute>
              <Schedule />
            </ProtectedRoute>
          } />
          <Route path="league" element={
            <ProtectedRoute>
              <League />
            </ProtectedRoute>
          } />
           <Route path="arena" element={
            <ProtectedRoute>
              <Arena />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);