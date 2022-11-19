import { TailSpin } from "react-loader-spinner";
import { COLORS } from "../constants/COLORS";
const { DARKPURPLE } = COLORS;

export default function LoadingCircle() {
  return (
    <TailSpin
      height="100"
      width="100"
      radius="1"
      color={DARKPURPLE}
      ariaLabel="three-dots-loading"
      visible={true}
    />
  );
}
