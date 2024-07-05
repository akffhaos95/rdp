import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Container, Box } from "@mui/material";
import Player from "./pages/Player";
import GameRegistration from "./pages/Game";
import GameRecords from "./pages/GameRecords";
import { createTheme, ThemeProvider } from "@mui/material";
import "./style/font.css";
const theme = createTheme({
  typography: {
    fontFamily: "Noto Serif KR", //font.css파일에 @import 넣은 후에 fontFamily는 이곳에 적용
    //각 css에서 font-weight, font-size 수정해서 굵기와 크기 변경 가능
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/player">
              선수
            </Button>
            <Button color="inherit" component={Link} to="/game-registration">
              경기 등록
            </Button>
            <Button color="inherit" component={Link} to="/game-records">
              경기 기록
            </Button>
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
    </ThemeProvider>
  );
}

export default App;
