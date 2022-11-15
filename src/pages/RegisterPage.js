import { Link } from "react-router-dom";
import Container from "../assets/styles/Container";
import SubmitButton from "../assets/styles/SubmitButton";

export default function RegisterPage() {
  return (
    <Container>
      <h1>MyWallet</h1>
      <form>
        <label htmlFor="name">Nome:</label>
        <input id="name" placeholder="Insira seu nome" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" placeholder="exemplo@exemplo.com" required />

        <label htmlFor="password">Senha:</label>
        <input type="password" id="password" placeholder="Mínimo 6 caracteres" required />

        <label htmlFor="confirm-password">Confirme a senha:</label>
        <input type="password" id="confirm-password" placeholder="Digite sua senha novamente" required />

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
