import React, { useState, useEffect } from 'react';
import { collection, doc, addDoc, getDocs, getDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { FormControl, InputLabel, Select, MenuItem, Button, Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import BaseballField from './BaseballField';

const BattingRecord = ({ gameId, players }) => {
  const [currentBatterIndex, setCurrentBatterIndex] = useState(0);
  const [result, setResult] = useState('');
  const [hitLocation, setHitLocation] = useState('');
  const [records, setRecords] = useState([]);
  const [lineup, setLineup] = useState([]);

  useEffect(() => {
    const fetchGameDetails = async () => {
      const gameDoc = await getDoc(doc(db, 'games', gameId));
      if (gameDoc.exists()) {
        setLineup(gameDoc.data().lineup || []);
      }
    };

    const fetchRecords = async () => {
      const q = query(collection(db, 'games', gameId, 'records'), orderBy('timestamp', 'asc'));
      const querySnapshot = await getDocs(q);
      setRecords(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchGameDetails();
    fetchRecords();
  }, [gameId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const event = {
      batter: lineup[currentBatterIndex].batter,
      result: result,
      hitLocation: hitLocation,
      timestamp: new Date(),
    };
    await addDoc(collection(db, 'games', gameId, 'records'), event);
    setResult('');
    setHitLocation('');
    setCurrentBatterIndex((currentBatterIndex + 1) % lineup.length);
    // Fetch the updated records
    const q = query(collection(db, 'games', gameId, 'records'), orderBy('timestamp', 'asc'));
    const querySnapshot = await getDocs(q);
    setRecords(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const currentBatter = players.find(player => player.id === lineup[currentBatterIndex]?.batter);

  return (
    <Box>
      <Typography variant="h6">타격 기록</Typography>
      <List>
        {records.map((record, index) => (
          <ListItem key={record.id}>
            <ListItemText
              primary={`${index + 1}. ${players.find(player => player.id === record.batter)?.name}: ${record.result}, ${record.hitLocation}, ${new Date(record.timestamp.seconds * 1000).toLocaleString()}`}
            />
          </ListItem>
        ))}
      </List>
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        현재 타자: {currentBatter ? currentBatter.name : '선수 없음'}
      </Typography>
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
  );
};

export default BattingRecord;
