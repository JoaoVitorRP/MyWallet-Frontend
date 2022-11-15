import styled from "styled-components";
import SubmitButton from "../assets/styles/SubmitButton";

export default function SubmitPage() {
  return (
    <MainContainer>
      <HeaderContainer>
        <h3>Nova entrada</h3>
      </HeaderContainer>
      <form>
        <label htmlFor="value">Valor:</label>
        <input type="number" id="value" placeholder="Insira o valor em Reais" required />

        <label htmlFor="description">Descrição:</label>
        <input id="description" placeholder="Insira uma descrição" required />

        <SubmitButton>Salvar entrada</SubmitButton>
      </form>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  padding: 25px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderContainer = styled.div`
  width: 90vw;
  max-width: 700px;

  text-align: left;
`;
