import SubmitButton from "../assets/styles/SubmitButton";
import Container from "../assets/styles/Container";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import LoadingDots from "../components/LoadingDots";
import styled from "styled-components";
import { COLORS } from "../constants/COLORS";
const { WHITE, DISABLEDGRAY } = COLORS;

export default function LoginPage(props) {
  const { setUserInfo } = props;

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();
  const [isDisabled, setIsDisbaled] = useState(false);

  async function signin(e) {
    e.preventDefault();

    setIsDisbaled(true);

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/sessions`, user);
      setUserInfo(res.data);
      navigate("/wallet");
    } catch (err) {
      setError({ status: err.response.status, message: err.response.data });
      setIsDisbaled(false);
    }
  }

  return (
    <Container>
      <h1>MyWallet</h1>
      <form onSubmit={signin} autoComplete="off">
        <label htmlFor="email">Email:</label>
        <UserInputs
          type="email"
          id="email"
          placeholder="exemplo@exemplo.com"
          required
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          disabled={isDisabled}
          autoComplete="off"
        />
        {error?.status === 404 ? <h4>{error.message}</h4> : null}

        <label htmlFor="password">Senha:</label>
        <UserInputs
          type="password"
          id="password"
          placeholder="Digite sua senha"
          required
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          disabled={isDisabled}
          autoComplete="off"
        />
        {error?.status === 401 ? <h4>{error.message}</h4> : null}

        <LoginButton type="submit" disabled={isDisabled}>
          {isDisabled ? <LoadingDots /> : "Entrar"}
        </LoginButton>
      </form>
      <h2>
        <Link to="/signup" style={{ textDecoration: "none", color: "inherit" }}>
          Primeira vez? Cadastre-se!
        </Link>
      </h2>
    </Container>
  );
}

const UserInputs = styled.input`
  background-color: ${(props) => (props.disabled ? `${DISABLEDGRAY}` : `${WHITE}`)};
  cursor: ${(props) => (props.disabled ? "default" : "auto")};
`;

const LoginButton = styled(SubmitButton)`
  opacity: ${(props) => (props.disabled ? "0.8 " : "1")};
  cursor: ${(props) => (props.disabled ? `wait` : `pointer`)};
`;
