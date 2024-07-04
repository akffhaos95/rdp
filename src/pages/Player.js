import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { TextField, Button, Box, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Slide, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { collection, addDoc, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Player() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [players, setPlayers] = useState([]);
  const [editPlayerId, setEditPlayerId] = useState(null); // state to track which player is in edit mode
  const [showAddForm, setShowAddForm] = useState(false); // state to toggle new player form
  const [records, setRecords] = useState({}); // state to store player records

  useEffect(() => {
    const fetchPlayers = async () => {
      const querySnapshot = await getDocs(collection(db, 'players'));
      setPlayers(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchPlayers();
  }, []);

  const fetchRecords = async (playerId) => {
    const gamesSnapshot = await getDocs(collection(db, 'games'));
    const playerRecords = [];

    for (const gameDoc of gamesSnapshot.docs) {
      const recordsQuery = query(collection(db, 'games', gameDoc.id, 'records'), where('batter', '==', playerId));
      const recordsSnapshot = await getDocs(recordsQuery);
      recordsSnapshot.forEach((doc) => {
        playerRecords.push({ ...doc.data(), gameId: gameDoc.id, opponent: gameDoc.data().opponent });
      });
    }

    setRecords(prevRecords => ({ ...prevRecords, [playerId]: playerRecords }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'players'), {
        name,
        number,
      });
      console.log('Document written with ID: ', docRef.id);
      setName('');
      setNumber('');
      alert('선수가 성공적으로 등록되었습니다.');
      // Refresh player list
      const querySnapshot = await getDocs(collection(db, 'players'));
      setPlayers(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setShowAddForm(false); // hide add form after successful submission
    } catch (error) {
      console.error('Error adding player: ', error);
    }
  };

  const handleEdit = (playerId, playerName, playerNumber) => {
    setEditPlayerId(playerId); // set edit mode for this player
    setName(playerName); // set initial name in edit mode
    setNumber(playerNumber); // set initial number in edit mode
  };

  const handleSaveEdit = async (playerId) => {
    try {
      await updateDoc(doc(db, 'players', playerId), {
        name,
        number,
      });
      setEditPlayerId(null); // exit edit mode
      alert('선수 정보가 성공적으로 수정되었습니다.');
      // Refresh player list
      const querySnapshot = await getDocs(collection(db, 'players'));
      setPlayers(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error updating player: ', error);
    }
  };

  const handleCancelEdit = () => {
    setEditPlayerId(null); // exit edit mode
    setName(''); // clear name input
    setNumber(''); // clear number input
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm); // toggle add form visibility
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>선수 등록</Typography>

      {/* Add Player Button */}
      <Button
        onClick={toggleAddForm}
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        style={{ marginBottom: 20 }}
      >
        새로운 선수 등록
      </Button>

      {/* Slideout Add Player Form */}
      <Slide direction="left" in={showAddForm} mountOnEnter unmountOnExit>
        <Box>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                label="선수 이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="등번호"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                fullWidth
                required
              />
            </Box>
            <Button type="submit" variant="contained" color="primary" style={{ marginRight: 10 }}>저장</Button>
            <Button onClick={() => setShowAddForm(false)} variant="contained" color="secondary">취소</Button>
          </form>
        </Box>
      </Slide>

      {/* Player List */}
      <Typography variant="h5" gutterBottom mt={4}>등록된 선수 목록</Typography>
      <List>
        {players.map(player => (
          <Accordion key={player.id} onChange={() => fetchRecords(player.id)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <ListItemText primary={`${player.name} (#${player.number})`} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(player.id, player.name, player.number)}>
                  <EditIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </AccordionSummary>
            <AccordionDetails>
              {editPlayerId === player.id ? (
                <>
                  <TextField
                    label="선수 이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    required
                  />
                  <TextField
                    label="등번호"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    fullWidth
                    required
                  />
                  <Button
                    onClick={() => handleSaveEdit(player.id)}
                    variant="contained"
                    color="primary"
                    style={{ marginRight: 10 }}
                  >
                    저장
                  </Button>
                  <Button
                    onClick={handleCancelEdit}
                    variant="contained"
                    color="secondary"
                  >
                    취소
                  </Button>
                </>
              ) : (
                <>
                  <Typography variant="h6">기록</Typography>
                  <List>
                    {records[player.id] && records[player.id].map((record, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={`상대 팀: ${record.opponent}, 타격 결과: ${record.result}, 타구 방향: ${record.hitLocation}, 시간: ${new Date(record.timestamp.seconds * 1000).toLocaleString()}`} />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </List>
    </Box>
  );
}

export default Player;
