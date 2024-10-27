// HintDisplay.js

import { Box, Typography } from "@mui/material";

import React from "react";

const HintDisplay = ({ title, media, detail }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: 2,
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        {title}
      </Typography>

      {/* Media Display */}
      {media?.type === "image" && (
        <img
          src={media.src}
          alt={title}
          style={{ maxWidth: "70%", maxHeight: "50%", marginTop: "16px" }}
        />
      )}
      {media?.type === "audio" && (
        <audio controls style={{ marginTop: "16px" }}>
          <source src={media.src} type="audio/wav" />
          Your browser does not support the audio tag.
        </audio>
      )}
      {media?.type === "video" && (
        <video controls style={{ marginTop: "16px", maxWidth: "100%" }}>
          <source src={media.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Detail Description */}
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        {detail}
      </Typography>
    </Box>
  );
};

export default HintDisplay;
