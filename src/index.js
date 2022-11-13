import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Index from "views/Index.js";
import Login from "views/Login";
import Profile from "views/Profile.js";
import Register from "views/Register.js";
import History from "views/History";
import FaceBookAnalysis from "views/FaceBookAnalysis";
import OnTimeSession from "views/OnTimeSession";
import OnTimeSessionResult from "views/OnTimeSessionResult";
import FinalResult from "views/FinalResult";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/landing" element={<Index />} />
      <Route path="/history" element={<History />} />
      <Route path="/facebook-analysis" element={<FaceBookAnalysis />} />
      <Route path="/session" element={<OnTimeSession />} />
      <Route path="/facebook-result" element={<OnTimeSessionResult />} />
      <Route path="/session-result" element={<FinalResult />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
