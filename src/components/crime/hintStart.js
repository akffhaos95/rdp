import { Box, Typography } from "@mui/material";

import React from "react";

const HintStart = () => {
  const title = `${process.env.PUBLIC_URL}/hint/title.png`;

  return (
    <Box
      sx={{
        padding: 2,
        textAlign: "center",
        paddingBottom: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* 이미지 */}
      <img src={title} style={{ maxWidth: "95%", marginTop: "16px" }} />

      <Box
        sx={{
          textAlign: "left",
          marginTop: 2,
          maxWidth: "90%",
        }}
      >
        <Box
          component="ul"
          style={{
            paddingLeft: 2,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Typography variant="body1" component="li">
            여러분들이 플레이하는 것은 일종의 <strong>역할극 추리게임</strong>
            이며,{" "}
            <strong style={{ color: "#FF4500" }}>
              여러분들은 각자의 캐릭터를 설정서대로 몰입하여 연기
            </strong>
            하면 됩니다.
          </Typography>
          <Typography variant="body1" component="li">
            몰입을 헤치는 게임이~ 설정서에 적혀있다~ 운영진한테 물어보자~ 등의{" "}
            <strong style={{ color: "#FF4500" }}>
              게임 외적인 발언은 삼가
            </strong>
            해주세요.
          </Typography>
          <Typography variant="body1" component="li">
            <strong style={{ color: "#FF0000" }}>
              당신은 이 시간부로 김감독 살인사건 용의 당사자 중 하나
            </strong>
            가 된 것입니다.
          </Typography>
          <Typography variant="body1" component="li">
            정말로 모르는 정보로 추궁을 당하고 있거나, 억측으로 곤란한
            상황이라면{" "}
            <strong style={{ color: "#FF4500" }}>
              "기억이 안난다. 잘모르겠다. 증거를 가져와라."
            </strong>{" "}
            혹은 <strong style={{ color: "#FF4500" }}>"침묵"</strong>으로
            대응하는 것이 좋습니다. 어차피 모든 인원은 거짓말이 가능하기에{" "}
            <strong style={{ color: "#FF4500" }}>
              거짓이 없는 단서 증거 위주로 추리
            </strong>
            해야 합니다.
          </Typography>
          <Typography variant="body1" component="li">
            <strong style={{ color: "#FF0000" }}>(중요)</strong>{" "}
            <strong style={{ color: "#FF4500" }}>
              현실 세계관과 차이가 있는 픽션
            </strong>
            입니다. 게임 속 라스칼은 전국적으로 유명하며 언론에서도 주목하는 초
            사회적이며 영리도 취하고 있는 야구팀입니다. 라스칼 야구팀의 게임으로
            스포츠토토가 이루어지고, 이 인기를 기반으로 정치, 연예 다양한 분야의
            공인, 유명인들과 긴밀하게 연결되어 있을 정도입니다. (이해가 안간다면{" "}
            <strong style={{ color: "#FF4500" }}>
              라스칼 유튜브가 2000만 구독자를 달성했다고 생각
            </strong>
            하세요.)
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HintStart;
