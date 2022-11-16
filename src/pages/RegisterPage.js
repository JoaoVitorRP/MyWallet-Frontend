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
      setError("As senhas devem ser iguais!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/register", user);
      navigate("/");
    } catch (err) {
      console.log(err);
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

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="exemplo@exemplo.com"
          required
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          placeholder="Mínimo 6 caracteres"
          required
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <label htmlFor="confirm-password">Confirme a senha:</label>
        <input
          type="password"
          id="confirm-password"
          placeholder="Digite sua senha novamente"
          required
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <h4>{error}</h4>

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
