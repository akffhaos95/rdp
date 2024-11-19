import {
  Box,
  Button,
  CircularProgress,
  Fade,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

const HintPersonal = () => {
  const { personal_name } = useParams();
  const [hintData, setHintData] = useState(null);
  const [password, setPassword] = useState("");
  const [showAfter, setShowAfter] = useState(false);
  const [htmlData, setHtmlData] = useState("");
  const file = `${process.env.PUBLIC_URL}/hint`;

  const fetchHintData = async () => {
    localStorage.setItem("personal_name", personal_name);
    try {
      const response = await fetch(`${file}/personal.json`);
      if (!response.ok) throw new Error("Network response failed.");
      const data = await response.json();
      setHintData(data[personal_name]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchHtmlData = async () => {
    try {
      const response = await fetch(`${file}/${personal_name}.html`);
      if (!response.ok) throw new Error("Network response failed.");
      const html = await response.text();
      setHtmlData(html);
    } catch (error) {
      console.error("Error fetching text file:", error);
    }
  };

  useEffect(() => {
    fetchHintData();
    fetchHtmlData();
  }, [personal_name]);

  useEffect(() => {
    // Check localStorage for the name
    const savedName = localStorage.getItem("memory_unlock");
    if (savedName === personal_name) {
      setShowAfter(true); // Skip password prompt if name is found
    }
  }, [personal_name]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (hintData && (!hintData.password || password === hintData.password)) {
      setShowAfter(true);
      localStorage.setItem("memory_unlock", personal_name); // Save the name in localStorage
    } else {
      alert("Incorrect password.");
    }
  };

  if (!hintData || !htmlData) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
        <Typography sx={{ marginTop: 2 }}>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2, textAlign: "center", paddingBottom: 5 }}>
      <Typography
        variant="h4"
        sx={{ fontFamily: "Black And White Picture", marginBottom: 2 }}
      >
        {hintData.title}
      </Typography>
      <Typography sx={{ whiteSpace: "pre-line", marginBottom: 2 }}>
        {hintData.before}
      </Typography>
      {showAfter ? (
        <Fade in={showAfter} timeout={3000}>
          <Typography sx={{ whiteSpace: "pre-line", marginTop: 2 }}>
            {hintData.after}
          </Typography>
        </Fade>
      ) : (
        <>
          {hintData.password && (
            <form onSubmit={handlePasswordSubmit}>
              <TextField
                label="Enter Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                sx={{ width: "70%", marginBottom: 2 }}
                margin="normal"
              />
              <Box
                sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
              >
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Box>
            </form>
          )}
        </>
      )}

      <Typography
        sx={{ textAlign: "left" }}
        dangerouslySetInnerHTML={{ __html: htmlData }}
      />
    </Box>
  );
};

export default HintPersonal;
