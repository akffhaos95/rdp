import React from "react";
import { styled } from "@mui/system";

// 선수 리스트 버튼 -> json 선수 개수만큼
// 각 버튼 클릭 -> 선수 데이터로 useState 변경

const Comment = ({ comments, scale }) => {
  if (!comments) return null;

  const CommentBox = styled("div")({
    position: "relative",
    width: `86%`,
    height: `30%`,
    marginLeft: "4%",
    marginRight: "4%",
    padding: "2%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    border: `${scale / 10}px solid #ddd`,
    borderRadius: "5%",
    fontFamily: "Arial, sans-serif", // 기본 폰트
    fontSize: `${scale / 3}%`, // 기본 폰트 크기
    textAlign: "center", // 기본 정렬

    // background: "linear-gradient(145deg, #1c2a48, #283759)",
    // boxShadow: "15px 15px 30px #1c2a48, -15px -15px 30px #3a4a6a",
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
