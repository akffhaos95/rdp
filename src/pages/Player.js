// Player.tsx

import { Box, Card, Dialog, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import PlayerCard from "../components/player/PlayerCard";
import PlayerDetail from "../components/player/PlayerDetail";
import { db } from "../firebase";

/** @jsxImportSource @emotion/react */
function Player() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchPlayers = async () => {
      const querySnapshot = await getDocs(collection(db, "players"));
      setPlayers(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchPlayers();
  }, []);

  const updateList = async () => {
    const querySnapshot = await getDocs(collection(db, "players"));
    setPlayers(
      querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
  };

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPlayer(null);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom mt={4}>
        등록된 선수 목록
      </Typography>
      <Grid container style={{ background: "#f5f5f5" }}>
        {players.map((player) => (
          <Grid item xs={2.4} key={player.id}>
            <PlayerCard
              player={player}
              updateList={updateList}
              onClick={handlePlayerClick}
            />
          </Grid>
        ))}
        <Grid item xs={2.4}>
          <Card
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 230,
            }}
          >
            <Typography variant="h1" component="div">
              +
            </Typography>
          </Card>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"xl"}
      >
        {selectedPlayer && <PlayerDetail player={selectedPlayer} />}
      </Dialog>
    </Box>
  );
}

export default Player;
