import React, { useState } from "react";

const Sidebar = ({ card, setCard }) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCard((prevCard) => ({
      ...prevCard,
      [name]: value,
    }));
  };

  const handleCommentChange = (index, event) => {
    const { name, value } = event.target;
    const updatedComments = card.comments || {};

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
    const updatedComments = { ...card.comments };
    delete updatedComments[index];

    // 인덱스 정리
    const reorderedComments = {};
    Object.keys(updatedComments).forEach((key, i) => {
      reorderedComments[i] = updatedComments[key];
    });

    setCard((prevCard) => ({
      ...prevCard,
      comments: reorderedComments,
    }));
  };

  const handleCommentAdd = () => {
    const newCommentIndex = Object.keys(card.comments || {}).length;
    const updatedComments = {
      ...card.comments,
      [newCommentIndex]: {
        comment: "",
        fontSize: 10,
        fontFamily: "",
        color: "",
        textAlign: "",
      },
    };

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
            Name:
            <input
              type="text"
              name="name"
              value={card.name || ""}
              onChange={handleInputChange}
              style={{ width: "100%", marginBottom: "10px" }}
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={card.description || ""}
              onChange={handleInputChange}
              style={{ width: "100%", marginBottom: "10px" }}
            />
          </label>
          <label>
            Font Size:
            <input
              type="number"
              name="fontSize"
              value={card.fontSize || ""}
              onChange={handleInputChange}
              style={{ width: "100%", marginBottom: "10px" }}
            />
          </label>
          <label>
            Comments:
            {Object.entries(card.comments || {}).map(([index, comment]) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <h4>Comment {parseInt(index) + 1}</h4>
                <button
                  onClick={() => handleCommentDelete(index)}
                  style={{ marginLeft: "10px", color: "red" }}
                >
                  X
                </button>
                <label>
                  Text Align:
                  <input
                    type="text"
                    name="textAlign"
                    value={comment.textAlign || ""}
                    onChange={(e) => handleCommentChange(index, e)}
                    style={{ width: "100%", marginBottom: "5px" }}
                  />
                </label>
                <label>
                  Font Family:
                  <input
                    type="text"
                    name="fontFamily"
                    value={comment.fontFamily || ""}
                    onChange={(e) => handleCommentChange(index, e)}
                    style={{ width: "100%", marginBottom: "5px" }}
                  />
                </label>
                <label>
                  Color:
                  <input
                    type="text"
                    name="color"
                    value={comment.color || ""}
                    onChange={(e) => handleCommentChange(index, e)}
                    style={{ width: "100%", marginBottom: "5px" }}
                  />
                </label>
                <label>
                  Font Size:
                  <input
                    type="number"
                    name="fontSize"
                    value={comment.fontSize || ""}
                    onChange={(e) => handleCommentChange(index, e)}
                    style={{ width: "100%", marginBottom: "5px" }}
                  />
                </label>
                <label>
                  Comment:
                  <textarea
                    name="comment"
                    value={comment.comment || ""}
                    onChange={(e) => handleCommentChange(index, e)}
                    style={{ width: "100%", marginBottom: "5px" }}
                  />
                </label>
              </div>
            ))}
          </label>
          <button onClick={handleCommentAdd} style={{ marginTop: "10px" }}>
            +
          </button>
        </div>
      ) : (
        <p>Select a card to edit.</p>
      )}
    </div>
  );
};

export default Sidebar;
