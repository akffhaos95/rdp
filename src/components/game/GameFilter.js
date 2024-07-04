import React, { useState } from 'react';
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';
import dayjs from 'dayjs';

const GameFilter = ({ games, players, onFilter }) => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');
  const [selectedVenues, setSelectedVenues] = useState([]);
  const [selectedLeagues, setSelectedLeagues] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [searchOpponent, setSearchOpponent] = useState('');

  const handleFilter = () => {
    let filtered = games;

    if (year) {
      filtered = filtered.filter((game) => dayjs(game.date).year().toString() === year);
    }

    if (month) {
      filtered = filtered.filter((game) => dayjs(game.date).month().toString() === month);
    }

    if (timeOfDay) {
      filtered = filtered.filter((game) => {
        const hour = dayjs(game.date).hour();
        return timeOfDay === 'morning' ? hour < 12 : hour >= 12;
      });
    }

    if (selectedVenues.length > 0) {
      filtered = filtered.filter((game) => selectedVenues.includes(game.venue));
    }

    if (selectedLeagues.length > 0) {
      filtered = filtered.filter((game) => selectedLeagues.includes(game.league));
    }

    if (selectedPlayers.length > 0) {
      filtered = filtered.filter((game) =>
        selectedPlayers.every((playerId) => game.participation.includes(playerId))
      );
    }

    if (searchOpponent) {
      filtered = filtered.filter((game) => game.opponent.includes(searchOpponent));
    }

    onFilter(filtered);
  };

  const uniqueVenues = [...new Set(games.map((game) => game.venue))];
  const uniqueLeagues = [...new Set(games.map((game) => game.league))];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        경기 조회
      </Typography>
      <Grid container spacing={2} alignItems="center" mb={2}>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel>년도</InputLabel>
            <Select value={year} onChange={(e) => setYear(e.target.value)}>
              {[...new Set(games.map((game) => dayjs(game.date).year().toString()))].map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel>월</InputLabel>
            <Select value={month} onChange={(e) => setMonth(e.target.value)}>
              {[...Array(12).keys()].map((month) => (
                <MenuItem key={month} value={(month + 1).toString()}>
                  {month + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel>시간대</InputLabel>
            <Select value={timeOfDay} onChange={(e) => setTimeOfDay(e.target.value)}>
              <MenuItem value="morning">오전</MenuItem>
              <MenuItem value="afternoon">오후</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel>구장</InputLabel>
            <Select
              multiple
              value={selectedVenues}
              onChange={(e) => setSelectedVenues(e.target.value)}
              renderValue={(selected) => selected.join(', ')}
            >
              {uniqueVenues.map((venue) => (
                <MenuItem key={venue} value={venue}>
                  <Checkbox checked={selectedVenues.includes(venue)} />
                  {venue}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel>리그</InputLabel>
            <Select
              multiple
              value={selectedLeagues}
              onChange={(e) => setSelectedLeagues(e.target.value)}
              renderValue={(selected) => selected.join(', ')}
            >
              {uniqueLeagues.map((league) => (
                <MenuItem key={league} value={league}>
                  <Checkbox checked={selectedLeagues.includes(league)} />
                  {league}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="상대팀"
            value={searchOpponent}
            onChange={(e) => setSearchOpponent(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">참여 선수</Typography>
          {players.map((player) => (
            <FormControlLabel
              key={player.id}
              control={
                <Checkbox
                  checked={selectedPlayers.includes(player.id)}
                  onChange={(e) =>
                    setSelectedPlayers((prev) =>
                      e.target.checked ? [...prev, player.id] : prev.filter((id) => id !== player.id)
                    )
                  }
                />
              }
              label={player.name}
            />
          ))}
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" onClick={handleFilter}>
        조회
      </Button>
    </Box>
  );
};

export default GameFilter;
