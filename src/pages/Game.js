import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import GameForm from "../components/game/GameForm";
import GameFilter from "../components/game/GameFilter";
import GameList from "../components/game/GameList";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

function Game() {
  const [players, setPlayers] = useState([]);
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const querySnapshot = await getDocs(collection(db, "players"));
      setPlayers(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };

    const fetchGames = async () => {
      const querySnapshot = await getDocs(collection(db, "games"));
      const gamesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGames(gamesData);
      setFilteredGames(gamesData);
    };

    fetchPlayers();
    fetchGames();
  }, []);

  const handleGameAdded = (newGames) => {
    setGames(newGames);
    setFilteredGames(newGames);
  };

  return (
    <div>
      {/* <GameForm players={players} onGameAdded={handleGameAdded} /> */}
      {/* <GameFilter games={games} players={players} onFilter={setFilteredGames} /> */}
      <GameList games={filteredGames} players={players} />
    </div>
  );
}

export default Game;
