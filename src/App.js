import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Box } from '@mui/material';
import Player from './pages/Player';
import GameRegistration from './pages/GameRegistration';
import GameRecords from './pages/GameRecords';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/player">선수</Button>
          <Button color="inherit" component={Link} to="/game-registration">경기 등록</Button>
          <Button color="inherit" component={Link} to="/game-records">경기 기록</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Box my={4}>
          <Routes>
            <Route path="/player" element={<Player />} />
            <Route path="/game-registration" element={<GameRegistration />} />
            <Route path="/game-records" element={<GameRecords />} />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
}

export default App;
