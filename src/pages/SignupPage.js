import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Container from "../assets/styles/Container";
import SubmitButton from "../assets/styles/SubmitButton";
import LoadingDots from "../components/LoadingDots";
import { COLORS } from "../constants/COLORS";
const { WHITE, DISABLEDGRAY } = COLORS;

export default function SignupPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();
  const [isDisabled, setIsDisbaled] = useState(false);

  async function signup(e) {
    e.preventDefault();

    setIsDisbaled(true);

    if (passwordConfirmation !== user.password) {
      setError({ status: 401, message: "As senhas não coincidem!" });
      setIsDisbaled(false);
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/accounts`, user);
      navigate("/");
    } catch (err) {
      setError({ status: err.response.status, message: err.response.data });

      setIsDisbaled(false);
    }
  }

  return (
    <Container>
      <h1>MyWallet</h1>
      <form onSubmit={signup} autoComplete="off">
        <label htmlFor="name">Nome:</label>
        <UserInputs
          id="name"
          placeholder="Mínimo 3 caracteres, máximo 30"
          required
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          disabled={isDisabled}
          autoComplete="off"
        />
        {error?.message === '"name" length must be at least 3 characters long' ? (
          <h4>O nome deve ter no mínimo 3 caracteres!</h4>
        ) : null}
        {error?.message === '"name" length must be less than or equal to 30 characters long' ? (
          <h4>O nome deve ter menos que 30 caracteres!</h4>
        ) : null}

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
        {error?.status === 409 ? <h4>{error.message}</h4> : null}

        <label htmlFor="password">Senha:</label>
        <UserInputs
          type="password"
          id="password"
          placeholder="Mínimo 6 caracteres"
          required
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          disabled={isDisabled}
          autoComplete="off"
        />
        {error?.message === '"password" length must be at least 6 characters long' ? (
          <h4>A senha deve ter no mínimo 6 caracteres</h4>
        ) : null}

        <label htmlFor="confirm-password">Confirme a senha:</label>
        <UserInputs
          type="password"
          id="confirm-password"
          placeholder="Digite sua senha novamente"
          required
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          disabled={isDisabled}
          autoComplete="off"
        />
        {error?.status === 401 ? <h4>{error.message}</h4> : null}

        <SignupButton type="submit" disabled={isDisabled}>
          {isDisabled ? <LoadingDots /> : "Cadastrar"}
        </SignupButton>
      </form>
      <h2>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          Já tem uma conta? Entre agora!
        </Link>
      </h2>
    </Container>
  );
}

const UserInputs = styled.input`
  background-color: ${(props) => (props.disabled ? `${DISABLEDGRAY}` : `${WHITE}`)};
  cursor: ${(props) => (props.disabled ? "default" : "auto")};
`;

const SignupButton = styled(SubmitButton)`
  opacity: ${(props) => (props.disabled ? "0.8 " : "1")};
  cursor: ${(props) => (props.disabled ? `wait` : `pointer`)};
`;
