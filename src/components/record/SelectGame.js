import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../../firebase";

const SelectGame = ({ onGameSelect }) => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");

  useEffect(() => {
    const fetchGames = async () => {
      const querySnapshot = await getDocs(collection(db, "games"));
      setGames(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchGames();
  }, []);

  const handleGameChange = (event) => {
    setSelectedGame(event.target.value);
  };

  const handleSubmit = () => {
    onGameSelect(selectedGame);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel>경기 선택</InputLabel>
        <Select value={selectedGame} onChange={handleGameChange}>
          {games.map((game) => (
            <MenuItem key={game.id} value={game.id}>
              {game.opponent} vs {game.home_team} - {game.date}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!selectedGame}
        sx={{ mt: 2 }}
      >
        경기 선택
      </Button>
    </Box>
  );
};

export default SelectGame;
