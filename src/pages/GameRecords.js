import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, addDoc, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography, List, ListItem, ListItemText, Stepper, Step, StepLabel } from '@mui/material';
import SelectGame from '../components/record/SelectGame';
import LineupRegistration from '../components/record/LineupRegistration';
import BaseballField from '../components/record/BaseballField';
import CountBoard from '../components/record/CountBoard';
import ScoreBoard from '../components/record/ScoreBoard';

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
  const [score, setScore] = useState(Array(9).fill(0));
  const [currentInning, setCurrentInning] = useState(1);
  const [halfInning, setHalfInning] = useState('초');
  const [runners, setRunners] = useState({ first: '', second: '', third: '' });

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
        const q = query(collection(db, 'events'), orderBy('timestamp', 'desc'), limit(1));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const lastEvent = querySnapshot.docs[0].data();
          setCurrentInning(lastEvent.inning);
          setOutCount(lastEvent.outs);
          setHalfInning(lastEvent.teamAtBat === 'away' ? '초' : '말');
          setRunners(lastEvent.runners);
          const batterIndex = lineup.findIndex(player => player.batter === lastEvent.batter);
          setCurrentBatterIndex(batterIndex !== -1 ? batterIndex : 0);
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
  }, [selectedGame, lineup]);

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
      gameId: selectedGame,
      batter: lineup[currentBatterIndex].batter,
      result: result,
      hitLocation: hitLocation,
      inning: currentInning,
      outs: outCount,
      teamAtBat: halfInning === '초' ? 'away' : 'home',
      runners: runners,
      timestamp: new Date(),
    };
    await addDoc(collection(db, 'events'), event);

    // Update counts based on result
    if (result === '아웃') {
      setOutCount((prev) => prev + 1);
      if (outCount + 1 >= 3) {
        if (halfInning === '초') {
          setHalfInning('말');
        } else {
          setHalfInning('초');
          setCurrentInning((prev) => prev + 1);
        }
        setOutCount(0);
      }
    } else {
      // Update runners based on the hit result
      let newRunners = { ...runners };
      if (result === '안타') {
        if (runners.third) setScore((prev) => prev.map((s, i) => (i === currentInning - 1 ? s + 1 : s)));
        newRunners = { first: lineup[currentBatterIndex].batter, second: runners.first, third: runners.second };
      }
      setRunners(newRunners);
    }

    // Reset counts for next batter
    setBallCount(0);
    setStrikeCount(0);

    // Move to the next batter
    setCurrentBatterIndex((currentBatterIndex + 1) % lineup.length);

    // Fetch updated records
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
          <Box display="flex" justifyContent="space-between">
            <CountBoard ballCount={ballCount} strikeCount={strikeCount} outCount={outCount} inning={currentInning} halfInning={halfInning} />
            <ScoreBoard
              innings={Array.from({ length: score.length }, (_, i) => i + 1)}
              homeTeamScores={score}
              awayTeamScores={score} // For now, we use the same scores for both teams as an example
            />
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
