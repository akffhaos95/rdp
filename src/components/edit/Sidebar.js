/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Button, Typography, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Comment from "./Comment";
import { useState } from "react";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import styled from "styled-components";

const ScrollTabPanel = styled(TabPanel)`
  height: 100%;
  overflow-y: auto;
  padding: 0px !important;
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
  
  }
`;
const SidebarContainer = styled.div`
  width: 280px;
  padding: 20px;
  background-color: #f5f5f5;
  height: 100vh;
`;
const Sidebar = ({ card, setCard, tab, handleTab }) => {
  const [isEdit, setIsEdit] = useState(null);

  const handleEditComment = (index) => {
    setIsEdit((prev) => (prev === index ? -1 : index));
  };

  const handleCommentChange = (index, event) => {
    const { name, value } = event.target;
    const updatedComments = [...(card.comments || [])];
    updatedComments[index] = { ...updatedComments[index], [name]: value };
    setCard((prevCard) => ({ ...prevCard, comments: updatedComments }));
  };

  const handleCommentDelete = (index) => {
    const updatedComments = [...(card.comments || [])];
    updatedComments.splice(index, 1);
    setCard((prevCard) => ({ ...prevCard, comments: updatedComments }));
  };

  const handleCommentAdd = () => {
    const updatedComments = [
      ...(card.comments || []),
      { comment: "", fontSize: 10, fontFamily: "", color: "", textAlign: "" },
    ];
    setCard((prevCard) => ({ ...prevCard, comments: updatedComments }));
  };

  const updateCard = async (updatedCard) => {
    try {
      const cardRef = doc(db, "card", updatedCard.id);
      await updateDoc(cardRef, { comments: updatedCard.comments });
      console.log("코멘트 업데이트 성공");
    } catch (error) {
      console.error("코멘트 업데이트 실패:", error);
    }
  };

  const handleCommentSave = () => {
    updateCard(card);
  };

  return (
    <SidebarContainer>
      <TabContext value={tab}>
        <div style={{ borderBottom: "1px solid #ccc" }}>
          <TabList
            onChange={(event, newValue) => handleTab(newValue)}
            aria-label="sidebar tabs"
          >
            <Tab label="코멘트" value="1" />
            <Tab label="타이틀" value="2" />
            <Tab label="업적" value="3" />
          </TabList>
        </div>
        <ScrollTabPanel value="1">
          <Button onClick={handleCommentAdd}>추가</Button>
          <Button onClick={handleCommentSave}>저장</Button>
          {card ? (
            <div
              style={{
                height: "75vh",
                overflow: "auto",
                padding: 5,
              }}
            >
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
            </div>
          ) : (
            <Typography>편집할 카드를 선택하세요</Typography>
          )}
        </ScrollTabPanel>
        <ScrollTabPanel value="2">타이틀</ScrollTabPanel>
        <ScrollTabPanel value="3">업적</ScrollTabPanel>
      </TabContext>
    </SidebarContainer>
  );
};

export default Sidebar;
