import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import InfoCard from "./InfoCard";
import LoadingCircle from "./LoadingCircle";
import { COLORS } from "../constants/COLORS";
const { WHITE, BLACK, LIGHTGRAY, GREEN, RED } = COLORS;

export default function HistoryContainer(props) {
  const { token, isLoading, setIsLoading } = props;
  const [history, setHistory] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function getHistory() {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setHistory(res.data);

        const data = res.data;
        let money = 0;
        data?.forEach((obj) => {
          if (obj.type === "intake") {
            money += Number(obj.value);
          } else {
            money -= Number(obj.value);
          }
        });
        setBalance(money.toFixed(2));
      } catch (err) {
        console.log(err);
      }

      setIsLoading(false);
    }
    getHistory();
  }, []);

  return (
    <HistoryDiv>
      {isLoading ? (
        <LoadingContainer isLoading={isLoading}>
          <LoadingCircle />
        </LoadingContainer>
      ) : history.length === 0 ? (
        <span>
          Não há registros de <br /> entrada ou saída
        </span>
      ) : (
        <InfoDiv>
          {history.map((h, index) => {
            return <InfoCard cardInfo={h} index={index} key={index} />;
          })}
        </InfoDiv>
      )}

      <BalanceDiv isHidden={history.length === 0}>
        <Text>SALDO</Text>
        <Balance isPositive={balance >= 0}>{balance}</Balance>
      </BalanceDiv>
    </HistoryDiv>
  );
}

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;

  display: ${(props) => (props.isLoading ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HistoryDiv = styled.div`
  width: 90vw;
  max-width: 700px;
  height: 67vh;
  padding-top: 5px;
  background-color: ${WHITE};
  border-radius: 5px;
  z-index: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  font-family: "Raleway", sans-serif;
  font-size: 20px;
  font-weight: 400;
  text-align: center;
  color: ${LIGHTGRAY};
`;

const InfoDiv = styled.div`
  width: 100%;
  height: 93%;
  overflow-y: scroll;
`;

const BalanceDiv = styled.div`
  width: 100%;
  height: 60px;
  padding: 20px;
  box-shadow: 0px -8px 35px -10px rgba(105, 105, 105, 1);
  background-color: ${WHITE};
  border-radius: 0px 0px 5px 5px;
  z-index: 2;

  display: ${(props) => (props.isHidden ? "none" : "flex")};
  justify-content: space-between;
`;

const Text = styled.span`
  font-weight: 700;
  color: ${BLACK};
`;

const Balance = styled.span`
  color: ${(props) => (props.isPositive ? `${GREEN}` : `${RED}`)};
`;
