import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import React from "react";
import { styled } from "@mui/system";

// 선수 리스트 버튼 -> json 선수 개수만큼
// 각 버튼 클릭 -> 선수 데이터로 useState 변경

const Comment = ({ comments, scale }) => {
  if (!comments) return null;

  const CommentBox = styled("div")({
    position: "absolute",
    width: `85%`,
    height: `40%`,
    bottom: `3%`, // 카드의 아래쪽에서 약간 떨어진 위치
    left: `50%`, // 수평 중앙 정렬을 위해 left를 50%로 설정
    transform: `translateX(-50%)`, // 수평 중앙 정렬을 위해 translateX를 사용
    display: "flex", // Flexbox 사용
    flexDirection: "column", // 세로 정렬
    justifyContent: "center", // 세로 중앙 정렬
    alignItems: "center", // 가로 중앙 정렬
    border: `${scale / 5}px solid #ddd`, // 테두리 설정
    borderRadius: "3px", // 모서리 둥글게
    fontFamily: "Arial, sans-serif", // 기본 폰트
    fontSize: `${scale / 3}%`, // 기본 폰트 크기
    textAlign: "center", // 기본 정렬
    whiteSpace: "nowrap",
  });

  return (
    <CommentBox scale={scale}>
      {comments.map((comment, index) => (
        <div
          key={index}
          style={{
            fontFamily: comment.fontFamily || "inherit", // 주어진 폰트 또는 상속된 폰트
            fontSize: comment.fontSize
              ? `${(scale * comment.fontSize) / 28}px`
              : "inherit", // 주어진 폰트 크기 또는 상속된 폰트 크기
            textAlign: comment.textAlign || "inherit", // 주어진 정렬 또는 상속된 정렬
            color: comment.color,
            // margin: `${scale / 5}px 0`, // 각 요소 간의 간격 추가
          }}
        >
          {comment.comment}
        </div>
      ))}
    </CommentBox>
  );
};

export default Comment;
