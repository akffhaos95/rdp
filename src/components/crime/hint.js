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

    // Only save if hint is not already stored
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

  // Center the loading message with CircularProgress
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
    <Box sx={{ padding: 2, textAlign: "center", paddingBottom: 5 }}>
      {hintData.password && !showHint ? (
        <form onSubmit={handlePasswordSubmit}>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            {hintData.password.title}
          </Typography>
          <TextField
            // label={hintData.password.title}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{ width: "70%", marginBottom: 2 }} // Added marginBottom for consistency
            margin="normal"
          />
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      ) : (
        <HintDisplay
          title={hintData.title}
          media={{ type: hintData.type, src: `${file}/${hintData.data}` }}
          detail={hintData.detail}
        />
      )}
    </Box>
  );
};

export default Hint;
