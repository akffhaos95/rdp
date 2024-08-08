import { ReactComponent as RightBatter } from "./icons/rightBatter.svg";
import { ReactComponent as LeftBatter } from "./icons/leftBatter.svg";

type BattingSide = "좌타" | "우타" | "양타";
export default function Batter({ battingSide }: { battingSide: BattingSide }) {
  return battingSide === "우타" ? (
    <RightBatter />
  ) : battingSide === "좌타" ? (
    <LeftBatter />
  ) : (
    <div style={{ display: "flex" }}>
      <LeftBatter />
      <RightBatter />
    </div>
  );
}
