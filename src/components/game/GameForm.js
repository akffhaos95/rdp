import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Box, Typography } from '@mui/material';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const GameForm = ({ players, onGameAdded }) => {
  const [opponent, setOpponent] = useState('');
  const [participation, setParticipation] = useState([]);
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [league, setLeague] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'games'), {
        opponent,
        participation,
        date,
        venue,
        league,
      });
      console.log('Document written with ID: ', docRef.id);
      setOpponent('');
      setParticipation([]);
      setDate('');
      setVenue('');
      setLeague('');
      alert('경기가 성공적으로 등록되었습니다.');
      const querySnapshot = await getDocs(collection(db, 'games'));
      const gamesData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      onGameAdded(gamesData);
    } catch (error) {
      console.error('Error adding game: ', error);
    }
  };

  const handleParticipationChange = (playerId) => {
    setParticipation((prevParticipation) =>
      prevParticipation.includes(playerId)
        ? prevParticipation.filter((id) => id !== playerId)
        : [...prevParticipation, playerId]
    );
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        경기 등록
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            label="상대팀"
            value={opponent}
            onChange={(e) => setOpponent(e.target.value)}
            fullWidth
            required
          />
        </Box>
        <Box mb={2}>
          <Typography variant="h6">출석 선수</Typography>
          {players.map((player) => (
            <FormControlLabel
              key={player.id}
              control={
                <Checkbox
                  checked={participation.includes(player.id)}
                  onChange={() => handleParticipationChange(player.id)}
                />
              }
              label={`${player.name} (#${player.number})`}
            />
          ))}
        </Box>
        <Box mb={2}>
          <TextField
            label="경기 시간"
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="구장"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            fullWidth
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="리그"
            value={league}
            onChange={(e) => setLeague(e.target.value)}
            fullWidth
            required
          />
        </Box>
        <Button type="submit" variant="contained" color="primary">
          저장
        </Button>
      </form>
    </Box>
  );
};

export default GameForm;
