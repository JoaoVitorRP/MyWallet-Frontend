import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS } from "../constants/COLORS";
const { WHITE, LIGHTGRAY } = COLORS;

export default function HistoryContainer(props) {
  const { token } = props;
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function getHistory() {
      try {
        const res = await axios.get("http://localhost:5000/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setHistory(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getHistory();
  }, []);

  return (
    <HistoryDiv>
      {history.length === 0 ? (
        <span>
          Não há registros de <br /> entrada ou saída
        </span>
      ) : null}
    </HistoryDiv>
  );
}

const HistoryDiv = styled.div`
  width: 90vw;
  max-width: 700px;
  height: 80vh;
  background-color: ${WHITE};
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: "Raleway", sans-serif;
  font-size: 20px;
  font-weight: 400;
  text-align: center;
  color: ${LIGHTGRAY};
`;
