import { Box, Chip, List, ListItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HintItem = styled("div")`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 1px;
  box-sizing: border-box;
  justify-content: space-between;
  border-bottom: 1px solid #e0e0e0;
  gap: 3px;
`;

const HintChip = styled(Chip)`
  margin-right: 5px;
  font-size: 0.875rem;
  color: white;
  background-color: #3f51b5;
`;

const HintList = () => {
  const [discoveredHints, setDiscoveredHints] = useState([]);
  const [hints, setHints] = useState([]);
  const file = `${process.env.PUBLIC_URL}/hint`;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${file}/hint.json`);
        if (!response.ok) throw new Error("Network response failed.");

        const data = await response.json();
        const hintsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setHints(hintsArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchStoredHints = () => {
      const stored = JSON.parse(localStorage.getItem("hintList")) || [];
      setDiscoveredHints(stored);
    };

    fetchStoredHints();
    fetchData();
  }, []);

  const convertToKST = (utcDateString) => {
    const utcDate = new Date(utcDateString);
    const options = {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Seoul",
      hour12: false, // 24-hour format
    };
    return utcDate.toLocaleString("ko-KR", options);
  };

  const handleHintClick = (hintId) => {
    navigate(`/crime/${hintId}`); // Change this path as per your routing
  };

  return (
    <Box sx={{ paddingBottom: 5 }}>
      <List sx={{ width: "100%" }}>
        {hints.map((hint) => {
          const discovered = discoveredHints.some(
            (entry) => entry && entry.id === hint.id,
          );
          const discoveryTime = discovered
            ? discoveredHints.find((entry) => entry.id === hint.id)
                ?.discoveryTime
            : null;

          return (
            <ListItem
              key={hint.id}
              onClick={() => handleHintClick(hint.id)}
              style={{ cursor: "pointer" }}
            >
              <HintItem style={{ opacity: discovered ? 1 : 0.5 }}>
                {/* Hint ID as Chip */}
                <HintChip
                  label={discovered ? hint.id : "Hint-?"}
                  size="small"
                />

                {/* Hint Title */}
                <Typography variant="body1" sx={{ marginRight: "auto" }}>
                  {discovered ? hint.title : "******"}
                </Typography>

                {/* Discovery Time */}
                <Typography variant="body2" sx={{ marginLeft: "3px" }}>
                  {discoveryTime
                    ? convertToKST(discoveryTime)
                    : "**.**. **:**:**"}
                </Typography>
              </HintItem>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default HintList;
