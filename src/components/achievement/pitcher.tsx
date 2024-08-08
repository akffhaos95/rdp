import { ReactComponent as RightPitcher } from "./icons/rightPitcher.svg";
import { ReactComponent as LeftPitcher } from "./icons/leftPitcher.svg";

type PitchingSide = "좌투" | "우투" | "양투";
export default function Pitcher({
  pitchingSide,
}: {
  pitchingSide: PitchingSide;
}) {
  return pitchingSide === "좌투" ? (
    <LeftPitcher />
  ) : pitchingSide === "우투" ? (
    <RightPitcher />
  ) : (
    <div style={{ display: "flex" }}>
      <LeftPitcher /> <RightPitcher />
    </div>
  );
}
