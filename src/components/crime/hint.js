import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import HintDisplay from "./hintDisplay";
import { useParams } from "react-router-dom";

const Hint = () => {
  const { hint_number } = useParams();
  const [hintData, setHintData] = useState(null);
  const [password, setPassword] = useState("");
  const [showHint, setShowHint] = useState(false);
  const file = `${process.env.PUBLIC_URL}/hint`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${file}/hint.json`);
        if (!response.ok) {
          throw new Error("Network response failed.");
        }
        const data = await response.json();
        setHintData(data[hint_number]);

        // 로컬 스토리지에서 힌트 리스트 가져오기
        const storedHints = JSON.parse(localStorage.getItem("hintList")) || [];

        // 로컬 스토리지에 hint_number가 있는지 확인하고 상태 설정
        if (storedHints.includes(hint_number)) {
          setShowHint(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [hint_number]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (hintData && password === hintData.password?.answer) {
      // 비밀번호가 맞으면 힌트를 표시하고 로컬 스토리지에 저장
      setShowHint(true);

      // 현재 힌트 데이터를 JSON 형태로 로컬 스토리지에 저장
      const storedHints = JSON.parse(localStorage.getItem("hintList")) || [];
      const hintEntry = {
        [hint_number]: hintData, // 힌트 번호를 키로 하고 힌트 데이터를 값으로 저장
      };

      // 로컬 스토리지에 저장
      localStorage.setItem(
        "hintList",
        JSON.stringify([...storedHints, hint_number]),
      );

      // 추가로 JSON 형태로 저장
      localStorage.setItem(`hint_${hint_number}`, JSON.stringify(hintEntry));
    } else {
      alert("Incorrect password.");
    }
  };

  if (!hintData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: 2, textAlign: "center" }}>
      {hintData.password && !showHint ? (
        <form onSubmit={handlePasswordSubmit}>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", marginBottom: 2 }}
          >
            {hintData.password.title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <TextField
              label={hintData.password.title}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={{ width: "70%" }}
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ alignSelf: "flex-end" }}
            >
              Submit
            </Button>
          </Box>
        </form>
      ) : (
        <HintDisplay
          title={hintData.title}
          media={{
            type: hintData.type,
            src: `${file}/${hintData.data}`,
          }}
          detail={hintData.detail}
        />
      )}
    </Box>
  );
};

export default Hint;
