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
import React, { useState } from "react";
import {
  faAlignCenter,
  faAlignLeft,
  faAlignRight,
} from "@fortawesome/free-solid-svg-icons";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // FontAwesome 아이콘

// 정렬 아이콘

const Comment = ({ index, comment, onCommentChange, onCommentDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  console.log(comment);
  const handleTextAlignChange = (alignment) => {
    onCommentChange({
      target: { name: "textAlign", value: alignment },
    });
  };

  const handleFontChange = (event) => {
    onCommentChange(event);
  };

  const handleColorChange = (color) => {
    onCommentChange({
      target: { name: "color", value: color },
    });
  };

  const handleFontSizeChange = (event) => {
    onCommentChange(event);
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{comment.comment || "Comment"}</Typography>
        <Button
          onClick={onCommentDelete}
          style={{ marginLeft: "10px", color: "red" }}
        >
          X
        </Button>
      </AccordionSummary>
      <AccordionDetails>
        {isEditing ? (
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
              <IconButton onClick={() => handleTextAlignChange("left")}>
                <FontAwesomeIcon icon={faAlignLeft} />
              </IconButton>
              <IconButton onClick={() => handleTextAlignChange("center")}>
                <FontAwesomeIcon icon={faAlignCenter} />
              </IconButton>
              <IconButton onClick={() => handleTextAlignChange("right")}>
                <FontAwesomeIcon icon={faAlignRight} />
              </IconButton>
            </div>
            <Select
              name="fontFamily"
              value={comment.fontFamily || ""}
              onChange={handleFontChange}
              displayEmpty
              style={{ width: "100%", marginBottom: "10px" }}
            >
              <MenuItem value="" disabled>
                Select Font
              </MenuItem>
              <MenuItem value="Arial">Arial</MenuItem>
              <MenuItem value="Times New Roman">Times New Roman</MenuItem>
              <MenuItem value="Courier New">Courier New</MenuItem>
              {/* 여기에 추가 폰트를 추가할 수 있습니다 */}
            </Select>

            <Select
              name="fontSize"
              value={comment.fontSize || 10}
              onChange={handleFontSizeChange}
              displayEmpty
              style={{ width: "100%", marginBottom: "10px" }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={14}>14</MenuItem>
              <MenuItem value={16}>16</MenuItem>
              <MenuItem value={18}>18</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              {/* 여기에 추가 폰트 크기를 추가할 수 있습니다 */}
            </Select>
          </div>
        ) : (
          <Button variant="outlined" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default Comment;
