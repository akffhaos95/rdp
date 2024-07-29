import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { Controller } from "react-hook-form";
const PlayerToggle = ({
  value,
  handleValue,
  options,
  padding,
  control,name
}: {
  options: { value: number | string; name: string }[];
  value?: string;
  padding?: number;
  control:any;
  name:string
  handleValue?: (e: any) => void;
}) => {
  return (
     <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <ToggleButtonGroup
        {...field}
        value={field.value}
        exclusive
        onChange={(_, value) => field.onChange(value)}
        aria-label="device"
        style={{ padding: padding ?? '10px' }}
      >
        {options.map((option) => (
          <ToggleButton
            key={option.value}
            value={String(option.value)}
            aria-label={String(option.value)}
          >
            {option.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    )}
  />
  );
};
export default PlayerToggle;
