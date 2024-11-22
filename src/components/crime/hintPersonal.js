import {
  Box,
  Button,
  CircularProgress,
  Fade,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import MarkdownIt from "markdown-it";
import { useParams } from "react-router-dom";

const HintPersonal = () => {
  const { personal_name } = useParams();
  const [hintData, setHintData] = useState(null);
  const [password, setPassword] = useState("");
  const [showAfter, setShowAfter] = useState(
    localStorage.getItem("memory_unlock") === personal_name, // 초기값 설정
  );

  console.log(showAfter);
  const [mdData, setMdData] = useState("");
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

  const fetchMarkdownData = async () => {
    try {
      const response = await fetch(`${file}/${personal_name}.md`);
      if (!response.ok) throw new Error("Network response failed.");
      const mdText = await response.text();
      setMdData(mdText);
    } catch (error) {
      console.error("Error fetching markdown file:", error);
    }
  };

  useEffect(() => {
    fetchHintData();
    fetchMarkdownData();
  }, [personal_name]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (hintData && (!hintData.password || password === hintData.password)) {
      setShowAfter(true);
      localStorage.setItem("memory_unlock", personal_name);

      // Replace title with title-after
      setHintData((prevData) => ({
        ...prevData,
        title: prevData["title-after"],
      }));
    } else {
      alert("Incorrect password.");
    }
  };

  if (!hintData || !mdData) {
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

  const md = new MarkdownIt();
  const htmlContent = md.render(mdData);

  console.log(showAfter);
  return (
    <Box sx={{ padding: 2, textAlign: "center", paddingBottom: 5 }}>
      {!showAfter ? (
        <>
          <Typography
            variant="h4"
            sx={{ fontFamily: "Black And White Picture", marginBottom: 2 }}
          >
            {hintData.title}
          </Typography>
          {hintData.password && (
            <form onSubmit={handlePasswordSubmit}>
              <TextField
                label={hintData["password-title"]}
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
      ) : (
        <>
          <Typography
            variant="h4"
            sx={{ fontFamily: "Black And White Picture", marginBottom: 2 }}
          >
            {hintData["title-after"]}
          </Typography>
        </>
      )}

      {/* <Typography
        variant="h4"
        sx={{ fontFamily: "Black And White Picture", marginBottom: 2 }}
      >
        {hintData.title}
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
                label={hintData["password-title"]}
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
      )} */}

      <Typography
        sx={{
          textAlign: "left",
          "& h3": { textAlign: "center" },
          "& code": {
            fontFamily: "Noto Serif KR",
            color: "red",
            background: "none",
            padding: 0,
          },
        }}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </Box>
  );
};

export default HintPersonal;
