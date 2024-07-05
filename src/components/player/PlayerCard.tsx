import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, list, ref } from "firebase/storage";

import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
  const [records, setRecords] = useState<any>({});
  const [editPlayerId, setEditPlayerId] = useState<string | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);

  useEffect(() => {
    const fetchImageURL = async () => {
      const url = await getPlayerImageURL(player.id);
      setImageURL(url);
    };

    fetchImageURL();
  }, [player.id]);

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
    setEditPlayerId(playerId);
    setName(playerName);
    setNumber(playerNumber);
  };

  const handleCancelEdit = () => {
    setEditPlayerId(null);
    setName("");
    setNumber("");
  };

  const handleSaveEdit = async (playerId: string) => {
    try {
      await updateDoc(doc(db, "players", playerId), {
        name,
        number,
      });
      setEditPlayerId(null);
      alert("선수 정보가 성공적으로 수정되었습니다.");
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
      {imageURL ? (
        <img
          src={imageURL}
          alt={`${player.name}'s photo`}
          style={{ width: "100%", height: "auto" }}
        />
      ) : (
        <SportsBaseballIcon style={{ fontSize: 250 }} />
      )}
    </Card>
  );
};

const getPlayerImageURL = async (playerId: string) => {
  try {
    const imageRef = ref(storage, `players/${playerId}`);
    const listResult = await list(ref(storage, "players/"));

    const item = listResult.items.find((itemRef) => itemRef.name === playerId);
    if (item) {
      const imageURL = await getDownloadURL(imageRef);
      return imageURL;
    } else {
      return null; // 이미지가 존재하지 않는 경우
    }
  } catch (error) {
    console.error("Error fetching player image:", error);
    return null;
  }
};
