import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import SubmitButton from "../assets/styles/SubmitButton";
import LoadingDots from "../components/LoadingDots";
import { COLORS } from "../constants/COLORS";
const { WHITE, DISABLEDGRAY } = COLORS;

export default function SubmitPage(props) {
  const { userInfo } = props;

  const navigate = useNavigate();

  const { type } = useParams();
  let balanceType;
  type === "intake" ? (balanceType = "entrada") : (balanceType = "saída");

  const [balanceForm, setBalanceForm] = useState({
    value: "",
    description: "",
    type,
  });
  const [error, setError] = useState();
  const [isDisabled, setIsDisbaled] = useState(false);

  async function submitBalance(e) {
    e.preventDefault();

    setIsDisbaled(true);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/history`, balanceForm, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      setBalanceForm({
        value: "",
        description: "",
        type,
      });

      setError();
    } catch (err) {
      setError(err.response.data);
    }

    setIsDisbaled(false);
  }

  return (
    <MainContainer>
      <HeaderContainer>
        <ion-button onClick={() => navigate("/wallet")}>
          <ion-icon name="arrow-back-outline"></ion-icon>
        </ion-button>
        <h3>Nova {balanceType}</h3>
      </HeaderContainer>
      <form onSubmit={submitBalance} autoComplete="off">
        <label htmlFor="value">Valor:</label>
        <UserInputs
          type="number"
          id="value"
          value={balanceForm.value}
          placeholder="Insira o valor em Reais"
          required
          onChange={(e) => setBalanceForm({ ...balanceForm, value: Number(e.target.value) })}
          disabled={isDisabled}
          autoComplete="off"
        />
        {error === '"value" must be a safe number' || error === '"value" must be less than or equal to 99999999' ? (
          <h4>O valor deve ter no máximo 8 dígitos</h4>
        ) : null}
        {error === '"value" must be a positive number' ? <h4>O valor deve ser maior que zero</h4> : null}
        {error === '"value" must have no more than 2 decimal places' ? (
          <h4>O valor deve ter no máximo 2 casas decimais</h4>
        ) : null}

        <label htmlFor="description">Descrição:</label>
        <UserInputs
          id="description"
          value={balanceForm.description}
          placeholder="Insira uma descrição"
          required
          onChange={(e) => setBalanceForm({ ...balanceForm, description: e.target.value })}
          disabled={isDisabled}
          autoComplete="off"
        />
        {error === '"description" length must be at least 3 characters long' ? (
          <h4>A descrição deve ter mais que 3 caracteres</h4>
        ) : null}
        {error === '"description" length must be less than or equal to 25 characters long' ? (
          <h4>A descrição deve ter até 25 caracteres</h4>
        ) : null}

        <SendButton disabled={isDisabled}>{isDisabled ? <LoadingDots /> : `Salvar ${balanceType}`}</SendButton>
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

  display: flex;

  text-align: left;

  ion-button {
    height: 30px;
    margin-right: 10px;
    cursor: pointer;
  }

  ion-icon {
    font-size: 30px;
    color: ${WHITE};
  }
`;

const UserInputs = styled.input`
  background-color: ${(props) => (props.disabled ? `${DISABLEDGRAY}` : `${WHITE}`)};
  cursor: ${(props) => (props.disabled ? "default" : "auto")};
`;

const SendButton = styled(SubmitButton)`
  opacity: ${(props) => (props.disabled ? "0.8 " : "1")};
  cursor: ${(props) => (props.disabled ? `wait` : `pointer`)};
`;
