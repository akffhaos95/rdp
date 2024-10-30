import { ReactComponent as RightBatter } from "./icons/rightBatter.svg";
import { ReactComponent as LeftBatter } from "./icons/leftBatter.svg";
import styled from "styled-components";

export const SideSingle = styled.div`
  width: 55px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

export const SideDouble = styled.div`
  width: 110px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

type BattingSide = "좌타" | "우타" | "양타";
export default function Batter({ battingSide }: { battingSide: BattingSide }) {
  return battingSide === "우타" ? (
    <SideSingle>
      <RightBatter />
    </SideSingle>
  ) : battingSide === "좌타" ? (
    <SideSingle>
      <LeftBatter />
    </SideSingle>
  ) : (
    <SideDouble>
      <LeftBatter />
      <RightBatter />
    </SideDouble>
  );
}
