import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import HistoryContainer from "../components/HistoryContainer";
import { COLORS } from "../constants/COLORS";
const { WHITE } = COLORS;

export default function WalletPage(props) {
  const { userInfo } = props;

  const navigate = useNavigate();


  return (
    <MainContainer>
      <HeaderContainer>
        <h3>Olá, {userInfo.name}</h3>
        <ion-icon name="exit-outline"></ion-icon>
      </HeaderContainer>

      <HistoryContainer token={userInfo.token} />

      <ButtonsContainer>
        <InOutButton onClick={() => navigate("/submit-balance/intake")}>
          <ion-icon name="add-circle-outline"></ion-icon>
          Nova <br /> entrada
        </InOutButton>

        <InOutButton onClick={() => navigate("/submit-balance/outtake")}>
          <ion-icon name="remove-circle-outline"></ion-icon>
          Nova <br /> saída
        </InOutButton>
      </ButtonsContainer>
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
  justify-content: space-between;

  ion-icon {
    font-size: 35px;
    color: ${WHITE};
  }
`;

const ButtonsContainer = styled.div`
  width: 90vw;
  max-width: 700px;
  margin-top: 13px;

  display: flex;
  justify-content: space-between;
`;

const InOutButton = styled.button`
  width: 48%;
  height: 114px;
  padding: 55px 10px 10px 10px;

  text-align: left;

  position: relative;

  ion-icon {
    position: absolute;
    top: 10px;
    left: 10px;

    font-size: 25px;
    color: ${WHITE};
  }
`;
