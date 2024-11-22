import { Box, Typography } from "@mui/material";

import React from "react";

const HintDisplay = ({ dataArray }) => {
  const file = `${process.env.PUBLIC_URL}/hint`;

  if (!dataArray) return;
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
      {/* Iterate through the dataArray */}
      {dataArray.map((res, index) => {
        const { type, data } = res;
        const src = `${file}/${data}`;
        return (
          <Box key={index} sx={{ marginBottom: 0 }}>
            {type === "text" && (
              <Typography dangerouslySetInnerHTML={{ __html: data }} />
            )}
            {type === "image" && (
              <img
                src={src}
                style={{
                  maxWidth: "100%",
                  maxHeight: "50%",
                  marginTop: "16px",
                }}
              />
            )}
            {type === "audio" && (
              <audio controls style={{ marginTop: "16px" }}>
                <source src={src} type="audio/wav" />
                Your browser does not support the audio tag.
              </audio>
            )}
            {type === "video" && (
              <video controls style={{ marginTop: "16px", maxWidth: "100%" }}>
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default HintDisplay;
