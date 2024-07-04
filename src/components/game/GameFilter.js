import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  Box,
  Typography,
  Select,
  MenuItem,
  Grid,
  Autocomplete,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dayjs from 'dayjs';

const GameFilter = ({ games, players, onFilter }) => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');
  const [selectedVenues, setSelectedVenues] = useState([]);
  const [selectedLeagues, setSelectedLeagues] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [searchOpponent, setSearchOpponent] = useState('');
  const [showFilters, setShowFilters] = useState(false);

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

  const handleChipDelete = (filterType, value) => {
    switch (filterType) {
      case 'year':
        setYear('');
        break;
      case 'month':
        setMonth('');
        break;
      case 'timeOfDay':
        setTimeOfDay('');
        break;
      case 'venue':
        setSelectedVenues((prev) => prev.filter((venue) => venue !== value));
        break;
      case 'league':
        setSelectedLeagues((prev) => prev.filter((league) => league !== value));
        break;
      case 'player':
        setSelectedPlayers((prev) => prev.filter((playerId) => playerId !== value));
        break;
      case 'opponent':
        setSearchOpponent('');
        break;
      default:
        break;
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        경기 조회
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowFilters((prev) => !prev)}
      >
        {showFilters ? '필터 숨기기' : '필터 보기'}
      </Button>
      {showFilters && (
        <Accordion expanded={showFilters} onChange={() => setShowFilters((prev) => !prev)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>필터 옵션</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2} alignItems="center" mb={2}>
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <TextField
                    label="년도"
                    select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  >
                    {[...new Set(games.map((game) => dayjs(game.date).year().toString()))].map(
                      (year) => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      )
                    )}
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <TextField
                    label="월"
                    select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                  >
                    {[...Array(12).keys()].map((month) => (
                      <MenuItem key={month} value={(month + 1).toString()}>
                        {month + 1}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <TextField
                    label="시간대"
                    select
                    value={timeOfDay}
                    onChange={(e) => setTimeOfDay(e.target.value)}
                  >
                    <MenuItem value="morning">오전</MenuItem>
                    <MenuItem value="afternoon">오후</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <Autocomplete
                  multiple
                  options={uniqueVenues}
                  getOptionLabel={(option) => option}
                  value={selectedVenues}
                  onChange={(e, newValue) => setSelectedVenues(newValue)}
                  renderInput={(params) => <TextField {...params} label="구장" />}
                />
              </Grid>
              <Grid item xs={2}>
                <Autocomplete
                  multiple
                  options={uniqueLeagues}
                  getOptionLabel={(option) => option}
                  value={selectedLeagues}
                  onChange={(e, newValue) => setSelectedLeagues(newValue)}
                  renderInput={(params) => <TextField {...params} label="리그" />}
                />
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
                <Autocomplete
                  multiple
                  options={players}
                  getOptionLabel={(option) => option.name}
                  value={selectedPlayers.map((id) => players.find((player) => player.id === id))}
                  onChange={(e, newValue) => setSelectedPlayers(newValue.map((player) => player.id))}
                  renderInput={(params) => <TextField {...params} label="선수" />}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}
      <Box mt={2}>
        {year && <Chip label={`년도: ${year}`} onDelete={() => handleChipDelete('year')} />}
        {month && <Chip label={`월: ${month}`} onDelete={() => handleChipDelete('month')} />}
        {timeOfDay && (
          <Chip label={`시간대: ${timeOfDay}`} onDelete={() => handleChipDelete('timeOfDay')} />
        )}
        {selectedVenues.map((venue) => (
          <Chip key={venue} label={`구장: ${venue}`} onDelete={() => handleChipDelete('venue', venue)} />
        ))}
        {selectedLeagues.map((league) => (
          <Chip key={league} label={`리그: ${league}`} onDelete={() => handleChipDelete('league', league)} />
        ))}
        {selectedPlayers.map((playerId) => {
          const player = players.find((p) => p.id === playerId);
          return (
            <Chip
              key={playerId}
              label={`선수: ${player.name}`}
              onDelete={() => handleChipDelete('player', playerId)}
            />
          );
        })}
        {searchOpponent && (
          <Chip
            label={`상대팀: ${searchOpponent}`}
            onDelete={() => handleChipDelete('opponent')}
          />
        )}
      </Box>
      <Button variant="contained" color="primary" onClick={handleFilter} sx={{ mt: 2 }}>
        조회
      </Button>
    </Box>
  );
};

export default GameFilter;
