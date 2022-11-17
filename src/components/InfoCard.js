import styled from "styled-components";
import { COLORS } from "../constants/COLORS";
const { BLACK, LIGHTGRAY, GREEN, RED } = COLORS;

export default function InfoCard(props) {
  const { cardInfo } = props;
  const { date, description, type, value } = cardInfo;

  return (
    <Card>
      <Date>{date}</Date>
      <Description>{description}</Description>
      <Value type={type}>{value}</Value>
    </Card>
  );
}

const Card = styled.div`
  width: 100%;
  margin-bottom: 20px;

  position: relative;

  text-align: left;
`;

const Date = styled.span`
  margin-right: 10px;

  color: ${LIGHTGRAY};
`;

const Description = styled.span`
  color: ${BLACK};
`;

const Value = styled.span`
  color: ${(props) => (props.type === "intake" ? `${GREEN}` : `${RED}`)};

  position: absolute;
  right: 0px;
`;
