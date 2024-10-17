import React from "react";
import { styled } from "@mui/system";

const VerticalTextContainer = ({ words, scale }) => {
  const Container = styled("div")({
    position: "absolute",
    top: `1%`, // 카드의 위쪽에서 약간 떨어진 위치
    left: `7%`, // 카드의 왼쪽에서 약간 떨어진 위치
    color: "white",
    fontSize: `50px`, // 폰트 크기를 스케일에 맞게 조정
    fontFamily: "Chakra Petch",
    fontWeight: 700,
    margin: `${0.1 * scale}px`,
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  const WordContainer = styled("div")(({ index, scale }) => ({
    position: "absolute",
    top: "0", // 첫 번째 열에서 시작
    left: `${index * scale * 50}px`, // 각 글자가 오른쪽으로 50px씩 이동
    display: "flex",
    flexDirection: "column", // 세로로 글씨가 나열되도록 설정
  }));
  return (
    <Container>
      {words.map((word, index) => (
        <WordContainer key={index} index={index} scale={scale}>
          {word.split("").map((char, i) => (
            <div key={i} style={{ fontSize: `${scale}px` }}>
              {char}
            </div>
          ))}
        </WordContainer>
      ))}
    </Container>
  );
};

export default VerticalTextContainer;
