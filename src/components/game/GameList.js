import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { format } from "date-fns";

const GameList = ({ games, players }) => {
  const getParticipationNames = (participation) => {
    if (!players) return [];
    return participation
      .map((playerId) => {
        const player = players.find((p) => p.id === playerId);
        return player ? player.name : "Unknown Player";
      })
      .join(", ");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "yy/MM/dd HH:mm");
  };

  return (
    <div>
      <Typography variant="h6">경기 목록</Typography>
      <List>
        {games.map((game) => (
          <ListItem key={game.id}>
            <Card style={{ display: "flex", width: "100%" }}>
              <CardMedia
                component="img"
                style={{ width: 60 }}
                image={game.opponentLogo}
                alt={`${game.opponent} logo`}
              />
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                <CardContent style={{ flex: "1 0 auto" }}>
                  <Typography variant="h6" component="div">
                    {game.opponent}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    component="div"
                  >
                    {game.score}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color={
                      game.result === "win"
                        ? "green"
                        : game.result === "lose"
                        ? "red"
                        : "grey"
                    }
                    component="div"
                  >
                    {game.result}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {formatDate(game.date)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    참여 선수: {getParticipationNames(game.participation || [])}
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default GameList;
