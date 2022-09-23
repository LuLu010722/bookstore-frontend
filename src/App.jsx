import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginView from "./views/LoginView";
import HomeView from "./views/HomeView";
import SignupView from "./views/SignupView";
import AdminView from "./views/AdminView";
import NotFountView from "./views/NotFountView";
import { createContext, useState } from "react";

const ModeContext = createContext({});

export default function App() {
  const mode = useState("none");
  return (
    <ModeContext.Provider value={mode}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginView />} />
          <Route path="/signup" element={<SignupView />} />
          <Route path="/admin/*" element={<AdminView />} />
          <Route path="/home/*" element={<HomeView />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/*" element={<NotFountView />} />
        </Routes>
      </BrowserRouter>
    </ModeContext.Provider>
  );
}
