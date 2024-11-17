import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import HintDisplay from "./hintDisplay";
import { useParams } from "react-router-dom";

const Hint = () => {
  const { hint_number } = useParams();
  const [hintData, setHintData] = useState(null);
  const [password, setPassword] = useState("");
  const [showHint, setShowHint] = useState(false);
  const file = `${process.env.PUBLIC_URL}/hint`;

  const saveHint = () => {
    const storedHints = JSON.parse(localStorage.getItem("hintList")) || [];
    const discoveryTime = new Date().toISOString();
    const hintEntry = { id: hint_number, discoveryTime };

    if (!storedHints.some((entry) => entry.id === hint_number)) {
      localStorage.setItem(
        "hintList",
        JSON.stringify([...storedHints, hintEntry]),
      );
    }
  };

  const fetchHintData = async () => {
    try {
      const response = await fetch(`${file}/hint.json`);
      if (!response.ok) throw new Error("Network response failed.");

      const data = await response.json();
      const currentHint = data[hint_number];
      setHintData(currentHint);

      // Check if hint is already unlocked or doesn't require a password
      const storedHints = JSON.parse(localStorage.getItem("hintList")) || [];
      if (
        storedHints.some((entry) => entry.id === hint_number) ||
        !currentHint.password
      ) {
        setShowHint(true);
        saveHint();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchHintData();
  }, [hint_number]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (
      hintData &&
      (!hintData.password || password === hintData.password.answer)
    ) {
      setShowHint(true);
      saveHint();
    } else {
      alert("Incorrect password.");
    }
  };

  if (!hintData) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Full height of the viewport
        }}
      >
        <CircularProgress />
        <Typography sx={{ marginTop: 2 }}>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: 3,
        paddingBottom: 7,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" style={{ fontFamily: "Black Han Sans" }}>
        {hintData.title}
      </Typography>

      {hintData.password && !showHint ? (
        <form onSubmit={handlePasswordSubmit} style={{ marginTop: 5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextField
              label={hintData.password.title}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ width: "80%" }}
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              제출
            </Button>
          </Box>
        </form>
      ) : (
        <HintDisplay dataArray={hintData.dataArray} />
      )}
      <Typography
        variant="h7"
        sx={{ marginTop: 2 }}
        dangerouslySetInnerHTML={{
          __html: hintData.detail.replace(/\n/g, "<br/>"),
        }}
      />
    </Box>
  );
};

export default Hint;
