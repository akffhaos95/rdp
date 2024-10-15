import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/system";

export default function ChipStack(scale) {
  const CustomChip = styled(Chip)`
    background: ${({ option, styles }) =>
      styles === "line"
        ? "none"
        : option === "gold"
          ? "linear-gradient(135deg, #FFD700, #B8860B)"
          : "linear-gradient(135deg, #c0c0c0, #808080)"};
    padding: ${scale.scale > 50 ? "5px 10px" : "4px 6px"};
    font-family: "Nunito", sans-serif;
    font-size: ${scale.scale * 0.45}px;
    height: fit-content;
    width: fit-content;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
    border: ${({ option, styles }) =>
      styles === "line"
        ? `2px solid ${option === "gold" ? "#FFD700" : "#C0C0C0"}`
        : "none"};
    color: ${({ option, styles }) =>
      styles === "line"
        ? option === "gold"
          ? "#FFD700"
          : "#C0C0C0"
        : "white"};
    border-radius: ${scale.scale > 50 ? "30px" : "20px"};
  `;

  return (
    <Stack
      direction="column"
      spacing={1.1}
      style={{
        alignItems: "flex-start",
        position: "absolute",
        bottom: 9,
        left: 9,
        display: "flex",
        zIndex: 20,
      }}
    >
      <CustomChip label="Chip 내용" option="gold" />
      <CustomChip label="Chip 내용" option="gold" styles="line" />
      <CustomChip label="😈Chip emoji" />
      <CustomChip label="😈Chip emoji" styles="line" />
    </Stack>
  );
}
