import { ReactComponent as RightBatter } from "./icons/rightBatter.svg";
import { ReactComponent as LeftBatter } from "./icons/leftBatter.svg";
import { side } from "./achivement.style";
/** @jsxImportSource @emotion/react */
type BattingSide = "좌타" | "우타" | "양타";
export default function Batter({ battingSide }: { battingSide: BattingSide }) {
  return battingSide === "우타" ? (
    <div css={side.single}>
      <RightBatter />
    </div>
  ) : battingSide === "좌타" ? (
    <div css={side.single}>
      <LeftBatter />
    </div>
  ) : (
    <div css={side.double}>
      <LeftBatter />
      <RightBatter />
    </div>
  );
}
