import { ReactComponent as RightPitcher } from "./icons/rightPitcher.svg";
import { ReactComponent as LeftPitcher } from "./icons/leftPitcher.svg";
import { SideSingle, SideDouble } from "./batter";

type PitchingSide = "좌투" | "우투" | "양투";
export default function Pitcher({
  pitchingSide,
}: {
  pitchingSide: PitchingSide;
}) {
  return pitchingSide === "좌투" ? (
    <SideSingle>
      <LeftPitcher />
    </SideSingle>
  ) : pitchingSide === "우투" ? (
    <SideSingle>
      <RightPitcher />
    </SideSingle>
  ) : (
    <SideDouble>
      <LeftPitcher />
      <RightPitcher />
    </SideDouble>
  );
}
