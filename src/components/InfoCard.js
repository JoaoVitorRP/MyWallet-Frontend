import styled from "styled-components";
import { COLORS } from "../constants/COLORS";
const { BLACK, LIGHTGRAY, GREEN, RED } = COLORS;

export default function InfoCard(props) {
  const { cardInfo, index } = props;
  const { date, description, type, value } = cardInfo;

  return (
    <Card isEven={index %2 === 0}>
      <Date>{date}</Date>
      <Description>{description}</Description>
      <Value type={type}>{value}</Value>
    </Card>
  );
}

const Card = styled.div`
  width: 100%;
  padding: 15px 20px;
  background-color: ${props => props.isEven ? `rgb(255, 255, 255)` : `rgb(240, 240, 240)`};

  display: flex;
  align-items: center;

  position: relative;

  text-align: left;
  word-wrap: break-word;
`;

const Date = styled.span`
  margin-right: 10px;

  color: ${LIGHTGRAY};
`;

const Description = styled.span`
  max-width: 50%;
  color: ${BLACK};
`;

const Value = styled.span`
  max-width: 20%;

  color: ${(props) => (props.type === "intake" ? `${GREEN}` : `${RED}`)};
  word-wrap: break-word;

  position: absolute;
  right: 20px;
`;
