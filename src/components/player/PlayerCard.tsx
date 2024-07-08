import { Card, Typography } from "@mui/material";
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
import "../../style/font.css";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
import {card_component} from "../../style/component.style";
/** @jsxImportSource @emotion/react */


type Player = {
  id: string;
  number: string;
  name: string;
};

type PlayerCardProps = {
  player: Player;
  updateList: () => void;
  onClick: (player: Player) => void; // Add onClick prop
};
const PlayerCard = ({ player, onClick }: PlayerCardProps) => {
  const [imageURL, setImageURL] = useState<string | null>(null);

  useEffect(() => {
    const fetchImageURL = async () => {
      const url = await getPlayerImageURL(player.id);
      setImageURL(url);
    };

    fetchImageURL();
  }, [player.id]);

  return (
    <Card
      css={card_component.card}
      onClick={() => onClick(player)}
    >
      {imageURL ? (
        <img
          src={imageURL}
          alt={`${player.name}'s photo`}
          style={{ width: "100%", height: "auto" }}
        />
      ) : (
        <SportsBaseballIcon style={{ fontSize: 240 }} />
      )}
      <Typography
        variant="h5"
        component="div"
        css={card_component.card_name}
      >
        {`${player.name} (#${player.number})`}
      </Typography>
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
      return null;
    }
  } catch (error) {
    console.error("Error fetching player image:", error);
    return null;
  }
};

export default PlayerCard;
