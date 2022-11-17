import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import InfoCard from "./InfoCard";
import { COLORS } from "../constants/COLORS";
const { WHITE, BLACK, LIGHTGRAY, GREEN, RED } = COLORS;

export default function HistoryContainer(props) {
  const { token } = props;
  const [history, setHistory] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function getHistory() {
      try {
        const res = await axios.get("http://localhost:5000/history", {
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
        setBalance(money);
      } catch (err) {
        console.log(err);
      }
    }
    getHistory();
  }, []);

  return (
    <HistoryDiv isFlex={history.length === 0}>
      {history.length === 0 ? (
        <span>
          Não há registros de <br /> entrada ou saída
        </span>
      ) : (
        <InfoDiv>
          {history.map((h, index) => {
            return <InfoCard cardInfo={h} balance={balance} setBalance={setBalance} key={index} />;
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

const HistoryDiv = styled.div`
  width: 90vw;
  max-width: 700px;
  height: 67vh;
  padding: 20px;
  background-color: ${WHITE};
  border-radius: 5px;
  z-index: 1;

  display: ${props => props.isFlex ? 'flex' : 'inline'};
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
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  ::-webkit-scrollbar {
    display: none;
  }
`;

const BalanceDiv = styled.div`
  width: 100%;
  padding: inherit;
  box-shadow: 0px -8px 35px -10px rgba(105,105,105,1);
  background-color: ${WHITE};
  border-radius: 0px 0px 5px 5px;
  z-index: 2;

  display: ${(props) => (props.isHidden ? "none" : "flex")};
  justify-content: space-between;

  position: absolute;
  bottom: 0px;
  right: 0px;
`;

const Text = styled.span`
  font-weight: 700;
  color: ${BLACK};
`;

const Balance = styled.span`
  color: ${props => props.isPositive ? `${GREEN}` : `${RED}`};
`;
