import styled from "styled-components";
import CssReset from "./assets/styles/CssReset";
import GlobalStyles from "./assets/styles/GlobalStyles";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WalletPage from "./pages/WalletPage";
import SubmitPage from "./pages/SubmitPage";

export default function App() {
  return (
    <>
      <CssReset />
      <GlobalStyles />
      {/* <LoginPage/> */}
      {/* <RegisterPage/> */}
      {/* <WalletPage /> */}
      <SubmitPage />
    </>
  );
}
