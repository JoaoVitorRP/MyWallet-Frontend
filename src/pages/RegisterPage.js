import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../assets/styles/Container";
import SubmitButton from "../assets/styles/SubmitButton";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();

  async function signup(e) {
    e.preventDefault();

    if (passwordConfirmation !== user.password) {
      setError({ status: 401, message: "As senhas não coincidem!" });
      return;
    }

    try {
      await axios.post("http://localhost:5000/register", user);
      navigate("/");
    } catch (err) {
      setError({ status: err.response.status, message: err.response.data });
      console.log(err.response.data);
    }
  }

  return (
    <Container>
      <h1>MyWallet</h1>
      <form onSubmit={signup}>
        <label htmlFor="name">Nome:</label>
        <input
          id="name"
          placeholder="Mínimo 3 caracteres, máximo 30"
          required
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        {error?.message === '"name" length must be at least 3 characters long' ? (
          <h4>O nome deve ter no mínimo 3 caracteres!</h4>
        ) : null}
        {error?.message === '"name" length must be less than or equal to 30 characters long' ? (
          <h4>O nome deve ter menos que 30 caracteres!</h4>
        ) : null}

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="exemplo@exemplo.com"
          required
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        {error?.status === 409 ? <h4>{error.message}</h4> : null}

        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          placeholder="Mínimo 6 caracteres"
          required
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        {error?.message === '"password" length must be at least 6 characters long' ? (
          <h4>A senha deve ter no mínimo 6 caracteres</h4>
        ) : null}

        <label htmlFor="confirm-password">Confirme a senha:</label>
        <input
          type="password"
          id="confirm-password"
          placeholder="Digite sua senha novamente"
          required
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        {error?.status === 401 ? <h4>{error.message}</h4> : null}

        <SubmitButton type="submit">Cadastrar</SubmitButton>
      </form>
      <h2>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          Já tem uma conta? Entre agora!
        </Link>
      </h2>
    </Container>
  );
}
