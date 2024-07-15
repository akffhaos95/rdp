import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore"; // Firebase import

import { Button } from "@mui/material";
import CommentAccordion from "./CommentAccordion"; // Import the new component
import { db } from "../../../firebase"; // Firebase import
import { styled } from "@mui/system";

const EditorContainer = styled("div")({
  marginTop: "20px",
});

const StyledButton = styled(Button)({
  margin: "10px", // Add space between buttons
  width: "45%", // Full width to match accordion width
  justifyContent: "center", // Center text
  borderRadius: "4px",
  padding: "10px 15px",
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
      {
        comment: "",
        fontFamily: "",
        fontSize: 16,
        textAlign: "left",
        color: "#000000",
      },
    ]);
  };

  const deleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
    setCard({ ...card, comments: updatedComments });
  };

  const saveChanges = async () => {
    try {
      const cardDoc = doc(db, "card", card.id); // Create document reference using card id
      await updateDoc(cardDoc, { comments }); // Update Firestore
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
        <CommentAccordion
          key={index}
          index={index}
          comment={comment}
          expanded={expanded}
          handleAccordionChange={handleAccordionChange}
          handleChange={handleChange}
          deleteComment={deleteComment}
        />
      ))}
      <StyledButton onClick={addComment} variant="contained">
        줄 추가
      </StyledButton>
      <StyledButton onClick={saveChanges} variant="contained" color="success">
        저장하기
      </StyledButton>
    </EditorContainer>
  );
};

export default CommentEditor;
