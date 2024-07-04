import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, getDoc, addDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography, List, ListItem, ListItemText, Stepper, Step, StepLabel } from '@mui/material';
import SelectGame from '../components/record/SelectGame';
import LineupRegistration from '../components/record/LineupRegistration';
import BaseballField from '../components/record/BaseballField';

const GameRecords = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedGame, setSelectedGame] = useState(null);
  const [lineupRegistered, setLineupRegistered] = useState(false);
  const [players, setPlayers] = useState([]);
  const [currentBatterIndex, setCurrentBatterIndex] = useState(0);
  const [result, setResult] = useState('');
  const [hitLocation, setHitLocation] = useState('');
  const [records, setRecords] = useState([]);
  const [lineup, setLineup] = useState([]);
  const [outCount, setOutCount] = useState(0);
  const [ballCount, setBallCount] = useState(0);
  const [strikeCount, setStrikeCount] = useState(0);

  useEffect(() => {
    const fetchPlayers = async () => {
      const querySnapshot = await getDocs(collection(db, 'players'));
      setPlayers(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchPlayers();
  }, []);

  useEffect(() => {
    if (selectedGame) {
      const fetchGameDetails = async () => {
        const gameDoc = await getDoc(doc(db, 'games', selectedGame));
        if (gameDoc.exists()) {
          setLineup(gameDoc.data().lineup || []);
        }
      };
  
      const fetchRecords = async () => {
        const q = query(collection(db, 'games', selectedGame, 'records'), orderBy('timestamp', 'asc'));
        const querySnapshot = await getDocs(q);
        setRecords(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      };
  
      fetchGameDetails();
      fetchRecords();
    }
  }, [selectedGame]);

  const handleGameSelect = (gameId) => {
    setSelectedGame(gameId);
    setActiveStep(1);
  };

  const handleLineupSubmit = () => {
    setLineupRegistered(true);
    setActiveStep(2);
  };

  const handleSubmit = async () => {
    const event = {
      batter: lineup[currentBatterIndex].batter,
      result: result,
      hitLocation: hitLocation,
      timestamp: new Date(),
    };
    await addDoc(collection(db, 'games', selectedGame, 'records'), event);
    setResult('');
    setHitLocation('');
    setCurrentBatterIndex((currentBatterIndex + 1) % lineup.length);

    const q = query(collection(db, 'games', selectedGame, 'records'), orderBy('timestamp', 'asc'));
    const querySnapshot = await getDocs(q);
    setRecords(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const currentBatter = players.find(player => player.id === lineup[currentBatterIndex]?.batter);

  return (
    <Box>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {['경기 선택', '라인업 등록', '타격 기록'].map((label, index) => (
          <Step key={label} onClick={() => setActiveStep(index)} style={{ cursor: 'pointer' }}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === 0 && <SelectGame onGameSelect={handleGameSelect} />}
      {activeStep === 1 && <LineupRegistration gameId={selectedGame} onLineupSubmit={handleLineupSubmit} players={players} />}
      {activeStep === 2 && (
        <Box>
          <Typography variant="h6">타격 기록</Typography>
          <Box display="flex">
            <Box>
              <Typography variant="h6">스코어 보드</Typography>
              <Typography>아웃카운트: {outCount}</Typography>
              <Typography>볼카운트: {ballCount}</Typography>
              <Typography>스트라이크카운트: {strikeCount}</Typography>
            </Box>
            <Box>
              <Typography variant="h6">라인업</Typography>
              <List>
                {lineup.map((player, index) => (
                  <ListItem key={index} selected={index === currentBatterIndex}>
                    <ListItemText primary={`${index + 1}번 타자: ${players.find(p => p.id === player.batter)?.name}`} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
          <Box>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>타격 결과</InputLabel>
              <Select value={result} onChange={(e) => setResult(e.target.value)}>
                <MenuItem value="아웃">아웃</MenuItem>
                <MenuItem value="안타">안타</MenuItem>
                <MenuItem value="2루타">2루타</MenuItem>
                <MenuItem value="3루타">3루타</MenuItem>
                <MenuItem value="홈런">홈런</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="h6" sx={{ mt: 2 }}>타구 방향</Typography>
            <BaseballField onLocationSelect={setHitLocation} />
            <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
              기록 추가
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default GameRecords;
