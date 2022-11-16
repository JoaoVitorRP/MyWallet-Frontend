import styled from "styled-components";
import SubmitButton from "../assets/styles/SubmitButton";
import Container from "../assets/styles/Container";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();

  async function signin(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/login", user);
      navigate("/wallet");
    } catch (err) {
      setError({ status: err.response.status, message: err.response.data });
    }
  }

  return (
    <Container>
      <h1>MyWallet</h1>
      <form onSubmit={signin}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="exemplo@exemplo.com"
          required
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        {error?.status === 404 ? <h4>{error.message}</h4> : null}

        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          placeholder="Mínimo 6 caracteres"
          required
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        {error?.status === 401 ? <h4>{error.message}</h4> : null}

        <SubmitButton type="submit">Entrar</SubmitButton>
      </form>
      <h2>
        <Link to="/register" style={{ textDecoration: "none", color: "inherit" }}>
          Primeira vez? Cadastre-se!
        </Link>
      </h2>
    </Container>
  );
}
