import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import {
  faAlignCenter,
  faAlignLeft,
  faAlignRight,
} from "@fortawesome/free-solid-svg-icons";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comment = ({
  index,
  comment,
  onCommentChange,
  onCommentDelete,
  isEdit,
  handleEdit,
}) => {
  const handleChange = (name, value) =>
    onCommentChange({ target: { name, value } });
  const handleFontChange = (event) => onCommentChange(event);

  return (
    <Accordion expanded={isEdit} onChange={handleEdit}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{comment.comment || "Comment"}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div style={{ width: "100%" }}>
          <TextField
            name="comment"
            label="Comment"
            value={comment.comment || ""}
            onChange={onCommentChange}
            fullWidth
            style={{ marginBottom: "10px" }}
          />
          <div>
            <Typography variant="body1">Text Align:</Typography>
            {["left", "center", "right"].map((align) => (
              <IconButton
                key={align}
                onClick={() => handleChange("textAlign", align)}
              >
                <FontAwesomeIcon
                  icon={
                    align === "left"
                      ? faAlignLeft
                      : align === "center"
                        ? faAlignCenter
                        : faAlignRight
                  }
                />
              </IconButton>
            ))}
          </div>
          <Select
            name="fontFamily"
            value={comment.fontFamily || ""}
            onChange={handleFontChange}
            displayEmpty
            placeholder="font"
            style={{ width: "100%", marginBottom: "10px" }}
          >
            {["", "Arial", "Times New Roman", "Courier New"].map((font, i) => (
              <MenuItem key={i} value={font} disabled={!i}>
                {font || "Select Font"}
              </MenuItem>
            ))}
          </Select>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Select
              name="fontSize"
              value={comment.fontSize || 10}
              onChange={handleFontChange}
              displayEmpty
              style={{ width: "100%", marginBottom: "10px" }}
            >
              {[10, 12, 14, 16, 18, 20].map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onCommentDelete(e);
              }}
              style={{
                marginLeft: "10px",
                color: "red",
                border: "1px solid red",
                height: "fit-content",
              }}
            >
              X
            </Button>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default Comment;
