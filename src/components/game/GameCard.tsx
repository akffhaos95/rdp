import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
} from "@mui/material";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
import theme from "../../style/Theme";
type Player = {
  id: string;
  number: string;
  name: string;
};

export const PlayerCard = ({
  player,
  updateList,
}: {
  player: Player;
  updateList: () => void;
}) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [records, setRecords] = useState<any>({}); // state to store player records
  const [editPlayerId, setEditPlayerId] = useState<string | null>(null); // state to track which player is in edit mode

  const fetchRecords = async (playerId: string) => {
    const gamesSnapshot = await getDocs(collection(db, "games"));
    const playerRecords: { gameId: string; opponent: any }[] = [];

    for (const gameDoc of gamesSnapshot.docs) {
      const recordsQuery = query(
        collection(db, "games", gameDoc.id, "records"),
        where("batter", "==", playerId)
      );
      const recordsSnapshot = await getDocs(recordsQuery);
      recordsSnapshot.forEach((doc) =>
        playerRecords.push({
          ...doc.data(),
          gameId: gameDoc.id,
          opponent: gameDoc.data().opponent,
        })
      );
    }

    setRecords((prevRecords: any) => ({
      ...prevRecords,
      [playerId]: playerRecords,
    }));
  };
  const handleEdit = (
    playerId: string,
    playerName: string,
    playerNumber: string
  ) => {
    setEditPlayerId(playerId); // set edit mode for this player
    setName(playerName); // set initial name in edit mode
    setNumber(playerNumber); // set initial number in edit mode
  };
  const handleCancelEdit = () => {
    setEditPlayerId(null); // exit edit mode
    setName(""); // clear name input
    setNumber(""); // clear number input
  };
  const handleSaveEdit = async (playerId: string) => {
    try {
      await updateDoc(doc(db, "players", playerId), {
        name,
        number,
      });
      setEditPlayerId(null); // exit edit mode
      alert("선수 정보가 성공적으로 수정되었습니다.");
      // Refresh player list

      updateList();
    } catch (error) {
      console.error("Error updating player: ", error);
    }
  };

  return (
    <Card style={{ margin: 15, height: 230 }}>
      <Typography variant="h5" component="div">
        {`${player.name} (#${player.number})`}
      </Typography>
      <SportsBaseballIcon style={{ fontSize: 250 }} />
    </Card>
  );
};
