// Player.tsx

import { Box, Card, Dialog, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import PlayerCard from "../components/player/PlayerCard";
import PlayerDetail from "../components/player/PlayerDetail";
import { db } from "../firebase";
import {card_component} from "../style/component.style";
import PlayerCreate from "../components/player/PlayerCreate";
/** @jsxImportSource @emotion/react */
function Player() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [open, setOpen] = useState(false);
  const [createOpen,setCreateOpen]=useState(false);
  useEffect(() => {
    const fetchPlayers = async () => {
      const querySnapshot = await getDocs(collection(db, "players"));
      setPlayers(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      );
    };
    fetchPlayers();
  }, []);

  const updateList = async () => {
    const querySnapshot = await getDocs(collection(db, "players"));
    setPlayers(
      querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
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
  const handleCreate = () => {
    setCreateOpen(!createOpen);
  };
  return (
    <Box>
      <Typography variant="h5" gutterBottom mt={4}>
        등록된 선수 목록
      </Typography>
      <Grid container style={{ background: "#f5f5f5" }}>
        {players.map((player) => (
          <Grid item xs={4} sm={2} md={2} key={player.id}>
            <PlayerCard
              player={player}
              updateList={updateList}
              onClick={handlePlayerClick}
            />
          </Grid>
        ))}
        <Grid item xs={4} sm={2} md={2}>
          <Card css={card_component.card_add} onClick={handleCreate}>
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
      <Dialog
        open={createOpen}
        onClose={handleCreate}
        fullWidth={true}
        maxWidth={"xl"}
        
      >
       <PlayerCreate/>
      </Dialog>
    </Box>
  );
}

export default Player;
