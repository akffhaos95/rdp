import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const GameList = ({ games, players }) => {
  const getParticipationNames = (participation) => {
    if (!players) return [];
    return participation.map((playerId) => {
      const player = players.find((p) => p.id === playerId);
      return player ? player.name : 'Unknown Player';
    }).join(', ');
  };

  return (
    <div>
      <Typography variant="h6">경기 목록</Typography>
      <List>
        {games.map((game) => (
          <ListItem key={game.id}>
            <ListItemText
              primary={`${game.opponent} - ${game.date}`}
              secondary={`참여 선수: ${getParticipationNames(game.participation || [])}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default GameList;
