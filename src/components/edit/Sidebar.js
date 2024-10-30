/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Button, Typography, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Comment from "./Comment";
import { useState } from "react";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const Sidebar = ({ card, setCard, tab, handleTab }) => {
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
        minHeight: "100vh",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRight: "1px solid #ccc",
        overflow: "hidden",
      }}
    >
      <TabContext value={tab}>
        <div style={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={(event, newValue) => handleTab(newValue)}
            aria-label="sidebar tabs"
          >
            <Tab label="코멘트" value="1" />
            <Tab label="타이틀" value="2" />
            <Tab label="업적" value="3" />
          </TabList>
        </div>
        <TabPanel value="1" style={{ height: "100%", overflow: "auto" }}>
          {" "}
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
                Save
              </Button>
            </div>
          ) : (
            <Typography>Select a card to edit.</Typography>
          )}
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </div>
  );
};

export default Sidebar;
