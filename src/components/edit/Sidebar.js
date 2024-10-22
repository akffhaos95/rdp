import { Button, Typography } from "@mui/material";
import Comment from "./Comment";
import { useState } from "react";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const Sidebar = ({ card, setCard }) => {
  const [isEdit, setIsEdit] = useState(null);

  const handleEditComment = (index) => {
    setIsEdit(index);
  };

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
    updatedComments.splice(index, 1);

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

  const updateCard = async (updatedCard) => {
    try {
      const cardRef = doc(db, "card", updatedCard.id);

      await updateDoc(cardRef, {
        comments: updatedCard.comments,
      });

      console.log("코멘트 업데이트 성공");
    } catch (error) {
      console.error("코멘트 업데이트 실패:", error);
    }
  };

  const handleCommentSave = () => {
    updateCard(card);
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
                  onCommentChange={(e) => handleCommentChange(index, e)}
                  onCommentDelete={() => handleCommentDelete(index)}
                  isEdit={isEdit === index}
                  handleEdit={() => handleEditComment(index)}
                />
              ))}
          </label>
          <Button onClick={handleCommentAdd} style={{ marginTop: "10px" }}>
            Add Comment
          </Button>
          <Button onClick={handleCommentSave} style={{ marginTop: "10px" }}>
            save
          </Button>
        </div>
      ) : (
        <Typography>Select a card to edit.</Typography>
      )}
    </div>
  );
};

export default Sidebar;
