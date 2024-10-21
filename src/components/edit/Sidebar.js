import { Button, Typography } from "@mui/material";

import Comment from "./Comment";
import React from "react";

const Sidebar = ({ card, setCard }) => {
  const handleCommentChange = (index, event) => {
    const { name, value } = event.target;
    const updatedComments = [...(card.comments || [])];

    updatedComments[index] = {
      ...updatedComments[index],
      [name]: value,
    };

    setCard((prevCard) => ({
      ...prevCard,
      comments: updatedComments,
    }));
  };

  const handleCommentDelete = (index) => {
    const updatedComments = [...(card.comments || [])];
    updatedComments.splice(index, 1); // 인덱스에 해당하는 코멘트 삭제

    setCard((prevCard) => ({
      ...prevCard,
      comments: updatedComments,
    }));
  };

  const handleCommentAdd = () => {
    const updatedComments = [
      ...(card.comments || []),
      {
        comment: "",
        fontSize: 10,
        fontFamily: "",
        color: "",
        textAlign: "",
      },
    ];

    setCard((prevCard) => ({
      ...prevCard,
      comments: updatedComments,
    }));
  };

  return (
    <div
      style={{
        width: "250px",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRight: "1px solid #ccc",
      }}
    >
      <h3>Edit Card</h3>
      {card ? (
        <div>
          <label>
            Comments:
            {card.comments &&
              card.comments.map((comment, index) => (
                <Comment
                  key={index}
                  index={index}
                  comment={comment}
                  onCommentChange={(e) => {
                    handleCommentChange(index, e);
                    console.log("handle change");
                  }}
                  onCommentDelete={() => {
                    handleCommentDelete(index);
                    console.log("ondelete");
                  }}
                />
              ))}
          </label>
          <Button onClick={handleCommentAdd} style={{ marginTop: "10px" }}>
            Add Comment
          </Button>
        </div>
      ) : (
        <Typography>Select a card to edit.</Typography>
      )}
    </div>
  );
};

export default Sidebar;
