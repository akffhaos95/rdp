import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import React from "react";
import { styled } from "@mui/system";

// 선수 리스트 버튼 -> json 선수 개수만큼
// 각 버튼 클릭 -> 선수 데이터로 useState 변경

const CommentBox = styled("div")({});

const Comment = ({ comments, scale }) => {
  if (!comments) return null;

  return (
    <CommentBox>
      {comments.map((comment, index) => (
        <div
          key={index}
          style={{
            fontFamily: comment.fontFamily || "Arial, sans-serif",
            fontSize: comment.fontSize
              ? `${comment.fontSize * (scale / 100)}px`
              : "16px",
            textAlign: comment.textAlign || "left",
          }}
        >
          {comment.comment}
        </div>
      ))}
    </CommentBox>
  );
};

export default Comment;
