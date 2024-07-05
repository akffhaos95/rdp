import { Box, Card, Grid, Typography, css } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import AddIcon from "@mui/icons-material/Add";
import { PlayerCard } from "../components/player/PlayerCard.tsx";
import PlayerForm from "../components/player/PlayerForm";
import { db } from "../firebase";
import main_component from "../style/component.style";
import theme from "../style/Theme";

/** @jsxImportSource @emotion/react */
function Player() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [players, setPlayers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false); // state to toggle new player form

  useEffect(() => {
    const fetchPlayers = async () => {
      const querySnapshot = await getDocs(collection(db, "players"));
      setPlayers(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchPlayers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "players"), {
        name,
        number,
      });
      console.log("Document written with ID: ", docRef.id);
      setName("");
      setNumber("");
      alert("선수가 성공적으로 등록되었습니다.");
      // Refresh player list
      const querySnapshot = await getDocs(collection(db, "players"));
      setPlayers(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      setShowAddForm(false); // hide add form after successful submission
    } catch (error) {
      console.error("Error adding player: ", error);
    }
  };

  const updateList = async () => {
    const querySnapshot = await getDocs(collection(db, "players"));
    setPlayers(
      querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm); // toggle add form visibility
  };

  return (
    <Box>
      <PlayerForm players={players} setPlayers={setPlayers} />

      {/* Player List */}
      <Typography variant="h5" gutterBottom mt={4}>
        등록된 선수 목록
      </Typography>
      <Grid container style={{ background: theme.bg }}>
        {players.map((player) => (
          <Grid xs={2.4}>
            <PlayerCard player={player} updateList={updateList} />
          </Grid>
        ))}
        <Grid xs={2.4}>
          <Card css={main_component.card_add}>
            <Typography variant="h1" component="div" style={{ margin: "auto" }}>
              +
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Player;
