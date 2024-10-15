import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/system";

export default function ChipStack(scale) {
  const CustomChip = styled(Chip)`
    background: linear-gradient(135deg, #c0c0c0, #808080); //은색
    //background: linear-gradient(135deg, #FFD700, #B8860B); //금색
    padding: ${scale.scale > 50 ? "10px 5px" : "5px 0px"};
    font-family: "Nunito", sans-serif;
    font-size: ${scale.scale * 0.5}px;
    height: fit-content;
    width: fit-content;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
    color: white;
    border-radius: ${scale.scale > 50 ? "40px" : "20px"};
  `;

  return (
    <Stack
      direction="column"
      spacing={1}
      style={{
        alignItems: "left",
        position: "absolute",
        bottom: 9,
        left: 9,
      }}
    >
      <CustomChip label="Chip 내용" />
      <CustomChip label="😈Chip emoji" />
    </Stack>
  );
}
