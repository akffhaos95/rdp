import { ToggleButtonGroup, ToggleButton } from "@mui/material";

const PlayerToggle = ({
  value,
  handleValue,
  options,
  padding,
}: {
  options: { value: number | string; name: string }[];
  value: string;
  padding?: number;
  handleValue: (e: any) => void;
}) => {
  return (
    <ToggleButtonGroup
      value={value}
      onChange={handleValue}
      aria-label="device"
      style={{ padding: padding ?? "10px" }}
    >
      {options.map((option) => (
        <ToggleButton
          value={String(option.value)}
          aria-label={String(option.value)}
        >
          {option.name}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
export default PlayerToggle;
