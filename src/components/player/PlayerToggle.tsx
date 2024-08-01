import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import { Controller } from "react-hook-form";

const PlayerToggle = ({
  value,
  handleValue,
  options,
  padding,
  control,
  name,
}: {
  value?: string;
  handleValue?: (e: any) => void;
  options: { value: number | string; name: string }[];
  padding?: number;
  control: any;
  name: string;
}) => {
  return (
    <Controller
      name={name}
      defaultValue={value??""}
      control={control}
      render={({ field }) => (
        <ToggleButtonGroup
          {...field}
          value={field.value}
          exclusive
          onChange={(_, value) => field.onChange(value)}
          aria-label="device"
          style={{ padding: padding ?? "10px" }}
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
