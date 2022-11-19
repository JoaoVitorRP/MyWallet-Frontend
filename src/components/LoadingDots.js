import { ThreeDots } from "react-loader-spinner";
import { COLORS } from "../constants/COLORS";
const { WHITE } = COLORS;

export default function LoadingDots() {
  return (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color={WHITE}
      ariaLabel="three-dots-loading"
      visible={true}
    />
  );
}
