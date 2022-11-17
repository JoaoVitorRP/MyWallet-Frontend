import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SubmitButton from "../assets/styles/SubmitButton";

export default function SubmitPage(props) {
  const { userInfo } = props;

  const { type } = useParams();
  let balanceType;
  type === "intake" ? (balanceType = "entrada") : (balanceType = "saída");

  const [balanceForm, setBalanceForm] = useState({
    value: "",
    description: "",
    type,
  });

  async function submitBalance(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/history", balanceForm, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      setBalanceForm({
        value: "",
        description: "",
        type,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <MainContainer>
      <HeaderContainer>
        <h3>Nova {balanceType}</h3>
      </HeaderContainer>
      <form onSubmit={submitBalance}>
        <label htmlFor="value">Valor:</label>
        <input
          type="number"
          id="value"
          value={balanceForm.value}
          placeholder="Insira o valor em Reais"
          required
          onChange={(e) => setBalanceForm({ ...balanceForm, value: e.target.value })}
        />

        <label htmlFor="description">Descrição:</label>
        <input
          id="description"
          value={balanceForm.description}
          placeholder="Insira uma descrição"
          required
          onChange={(e) => setBalanceForm({ ...balanceForm, description: e.target.value })}
        />

        <SubmitButton>Salvar {balanceType}</SubmitButton>
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
