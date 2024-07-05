import React, { useState, useEffect } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
} from "@mui/material";

const positions = [
  "투수",
  "포수",
  "1루수",
  "2루수",
  "3루수",
  "유격수",
  "좌익수",
  "중견수",
  "우익수",
];

const LineupRegistration = ({ gameId, onLineupSubmit, players }) => {
  const [lineup, setLineup] = useState([{ batter: "", position: "" }]);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchGameDetails = async () => {
      const gameDoc = await getDoc(doc(db, "games", gameId));
      if (gameDoc.exists()) {
        const gameData = gameDoc.data();
        setParticipants(gameData.participation);
        if (gameData.lineup) {
          setLineup(gameData.lineup);
        }
      }
    };
    fetchGameDetails();
  }, [gameId]);

  const handleAddBatter = () => {
    setLineup([...lineup, { batter: "", position: "" }]);
  };

  const handleChange = (index, field, value) => {
    const newLineup = lineup.slice();
    newLineup[index][field] = value;
    setLineup(newLineup);
  };

  const handleSubmit = async () => {
    const gameDocRef = doc(db, "games", gameId);
    await updateDoc(gameDocRef, { lineup });
    onLineupSubmit();
  };

  const selectedBatters = lineup.map((item) => item.batter);

  return (
    <Box>
      <Typography variant="h6">라인업 등록</Typography>
      {lineup.map((item, index) => (
        <Box key={index} display="flex" alignItems="center" mb={2}>
          <Typography variant="subtitle1">{`${
            index + 1
          }번 타자 : `}</Typography>
          <FormControl sx={{ ml: 2, minWidth: 120 }}>
            <InputLabel>선수</InputLabel>
            <Select
              value={item.batter}
              onChange={(e) => handleChange(index, "batter", e.target.value)}
            >
              {participants
                .filter(
                  (playerId) =>
                    !selectedBatters.includes(playerId) ||
                    playerId === item.batter
                )
                .map((playerId) => (
                  <MenuItem key={playerId} value={playerId}>
                    {players.find((player) => player.id === playerId)?.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl sx={{ ml: 2, minWidth: 120 }}>
            <InputLabel>포지션</InputLabel>
            <Select
              value={item.position}
              onChange={(e) => handleChange(index, "position", e.target.value)}
            >
              {positions.map((position, posIndex) => (
                <MenuItem key={posIndex} value={position}>
                  {position}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddBatter}
        sx={{ mt: 2 }}
        disabled={lineup.length >= participants.length}
      >
        + 타자 추가
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 2, ml: 2 }}
      >
        라인업 등록
      </Button>
    </Box>
  );
};

export default LineupRegistration;
