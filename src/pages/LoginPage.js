import styled from "styled-components";
import SubmitButton from "../assets/styles/SubmitButton";
import Container from "../assets/styles/Container";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <Container>
      <h1>MyWallet</h1>
      <form>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" placeholder="exemplo@exemplo.com" required />

        <label htmlFor="password">Senha:</label>
        <input type="password" id="password" placeholder="Mínimo 6 caracteres" required />

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
