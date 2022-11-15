import styled from "styled-components";
import CssReset from "./assets/styles/CssReset";
import GlobalStyles from "./assets/styles/GlobalStyles";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WalletPage from "./pages/WalletPage";
import SubmitPage from "./pages/SubmitPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <CssReset />
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/submit-balance/:type" element={<SubmitPage />} />
      </Routes>
    </BrowserRouter>
  );
}
