import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore"; // Firebase import

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { db } from "../../../firebase"; // Firebase import
import { styled } from "@mui/system";

const EditorContainer = styled("div")({
  marginTop: "20px",
});

const FixedWidthSelect = styled(Select)({
  width: "100%", // 원하는 고정 너비 설정
  minWidth: "120px", // 최소 너비 설정
});

const CommentEditor = ({ card, setCard, scale }) => {
  const [comments, setComments] = useState(card.comments || []);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (index, field, value) => {
    const updatedComments = comments.map((comment, i) =>
      i === index ? { ...comment, [field]: value } : comment,
    );
    setComments(updatedComments);
    setCard({ ...card, comments: updatedComments });
  };

  const addComment = () => {
    setComments([
      ...comments,
      { comment: "", fontFamily: "", fontSize: "", textAlign: "left" },
    ]);
  };

  const saveChanges = async () => {
    try {
      const cardDoc = doc(db, "card", card.id); // 카드의 id를 사용하여 문서 참조 생성
      await updateDoc(cardDoc, { comments }); // Firestore에 업데이트
      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Failed to save changes.");
    }
  };

  const handleAccordionChange = (index) => (event, isExpanded) => {
    setExpanded(isExpanded ? index : false);
  };

  return (
    <EditorContainer>
      {comments.map((comment, index) => (
        <Accordion
          key={index}
          expanded={expanded === index}
          onChange={handleAccordionChange(index)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography>
              {expanded === index ? (
                <TextField
                  value={comment.comment}
                  onClick={(e) => e.stopPropagation()} // 이벤트 전파 방지
                  onChange={(e) =>
                    handleChange(index, "comment", e.target.value)
                  }
                  fullWidth
                />
              ) : (
                comment.comment || "No Comment"
              )}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <FixedWidthSelect
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
                  <MenuItem value="Arial">Arial</MenuItem>
                  <MenuItem value="Times New Roman">Times New Roman</MenuItem>
                  <MenuItem value="Courier New">Courier New</MenuItem>
                </FixedWidthSelect>
              </Grid>
              <Grid item xs={4}>
                <FixedWidthSelect
                  value={comment.fontSize}
                  onChange={(e) =>
                    handleChange(index, "fontSize", e.target.value)
                  }
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Font Size
                  </MenuItem>
                  {[10, 20, 30, 40, 50].map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </FixedWidthSelect>
              </Grid>
              <Grid item xs={4}>
                <FixedWidthSelect
                  value={comment.textAlign}
                  onChange={(e) =>
                    handleChange(index, "textAlign", e.target.value)
                  }
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value="left">Left</MenuItem>
                  <MenuItem value="center">Center</MenuItem>
                  <MenuItem value="right">Right</MenuItem>
                </FixedWidthSelect>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
      <Button
        onClick={addComment}
        variant="contained"
        style={{ marginTop: "10px" }}
      >
        + Add Comment
      </Button>
      <Button
        onClick={saveChanges}
        variant="contained"
        style={{ marginTop: "10px", marginLeft: "10px" }}
      >
        Save Changes
      </Button>
    </EditorContainer>
  );
};

export default CommentEditor;
