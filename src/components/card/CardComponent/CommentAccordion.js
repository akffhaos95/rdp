import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Fab,
  Grid,
  IconButton,
  MenuItem,
  Popover,
  Select,
  Slider,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import PaletteIcon from "@mui/icons-material/Palette";
import { SketchPicker } from "react-color";
import { styled } from "@mui/system";

const FixedWidthSelect = styled(Select)({
  width: "100%",
  minWidth: "60px",
});

const StyledAccordion = styled(Accordion)({
  marginBottom: "10px", // Add space between Accordions
});

const fontFamilies = [
  "Arial",
  "Times New Roman",
  "Courier New",
  "Georgia",
  "Verdana",
  "Tahoma",
  "Trebuchet MS",
  "Comic Sans MS",
];

const CommentAccordion = ({
  index,
  comment,
  expanded,
  handleAccordionChange,
  handleChange,
  deleteComment,
}) => {
  const [color, setColor] = useState(comment.color || "#000000");
  const [colorPickerAnchor, setColorPickerAnchor] = useState(null);

  const handleColorChange = (color) => {
    setColor(color.hex);
    handleChange(index, "color", color.hex);
  };

  const handleColorPickerOpen = (event) => {
    setColorPickerAnchor(event.currentTarget);
  };

  const handleColorPickerClose = () => {
    setColorPickerAnchor(null);
  };

  return (
    <StyledAccordion
      expanded={expanded === index}
      onChange={handleAccordionChange(index)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${index}-content`}
        id={`panel${index}-header`}
      >
        <Typography style={{ flexGrow: 1 }}>
          {expanded === index ? (
            <TextField
              value={comment.comment}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => handleChange(index, "comment", e.target.value)}
              fullWidth
            />
          ) : (
            comment.comment || "No Comment"
          )}
        </Typography>
        {!expanded && (
          <IconButton
            edge="end"
            onClick={(e) => {
              e.stopPropagation();
              deleteComment(index);
            }}
            style={{ marginRight: "8px" }} // Add space between icons
          >
            <CloseIcon />
          </IconButton>
        )}
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <FixedWidthSelect
              size="small"
              value={comment.fontFamily}
              onChange={(e) =>
                handleChange(index, "fontFamily", e.target.value)
              }
              displayEmpty
              fullWidth
            >
              <MenuItem value="" disabled>
                Font Family
              </MenuItem>
              {fontFamilies.map((font) => (
                <MenuItem key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </MenuItem>
              ))}
            </FixedWidthSelect>
          </Grid>
          <Grid item xs={3}>
            <Slider
              value={comment.fontSize || 16}
              onChange={(e, newValue) =>
                handleChange(index, "fontSize", newValue)
              }
              aria-labelledby="font-size-slider"
              min={10}
              max={50}
            />
          </Grid>
          <Grid item xs={3}>
            <ToggleButtonGroup
              size="small"
              value={comment.textAlign || "left"}
              exclusive
              onChange={(e, newAlignment) =>
                handleChange(index, "textAlign", newAlignment)
              }
              aria-label="text alignment"
            >
              <ToggleButton value="left" aria-label="left aligned">
                <FormatAlignLeftIcon />
              </ToggleButton>
              <ToggleButton value="center" aria-label="centered">
                <FormatAlignCenterIcon />
              </ToggleButton>
              <ToggleButton value="right" aria-label="right aligned">
                <FormatAlignRightIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={3}>
            <Fab
              size="small"
              style={{ backgroundColor: color, color: "#fff" }} // Fab의 색상 변경
              onClick={handleColorPickerOpen}
              aria-label="add"
            >
              <PaletteIcon />
            </Fab>
            <Popover
              open={Boolean(colorPickerAnchor)}
              anchorEl={colorPickerAnchor}
              onClose={handleColorPickerClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <SketchPicker
                color={color}
                onChangeComplete={handleColorChange}
                disableAlpha
              />
            </Popover>
          </Grid>
        </Grid>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default CommentAccordion;
