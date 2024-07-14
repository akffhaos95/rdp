import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import React from "react";
import { styled } from "@mui/system";

// 선수 리스트 버튼 -> json 선수 개수만큼
// 각 버튼 클릭 -> 선수 데이터로 useState 변경

const Comment = ({ comments, scale }) => {
  if (!comments) return null;

  const CommentBox = styled("div")({
    border: `${scale / 5}px solid #ddd`, // 테두리 설정
    padding: `${scale / 5}px`, // 패딩 추가
    borderRadius: "3px", // 모서리 둥글게
    fontFamily: "Arial, sans-serif", // 기본 폰트
    fontSize: `${scale / 3}px`, // 기본 폰트 크기
    textAlign: "center", // 기본 정렬
    whiteSpace: "nowrap",
  });

  return (
    <CommentBox>
      {comments.map((comment, index) => (
        <div
          key={index}
          style={{
            fontFamily: comment.fontFamily || "inherit", // 주어진 폰트 또는 상속된 폰트
            fontSize: comment.fontSize
              ? `${(scale * comment.fontSize) / 100}px`
              : "inherit", // 주어진 폰트 크기 또는 상속된 폰트 크기
            textAlign: comment.textAlign || "inherit", // 주어진 정렬 또는 상속된 정렬
          }}
        >
          {comment.comment}
        </div>
      ))}
    </CommentBox>
  );
};

export default Comment;
