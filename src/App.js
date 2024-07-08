import "./style/font.css";

import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ThemeProvider, createTheme, useTheme } from "@mui/material";

import Card from "./pages/Card";
import Footer from "./components/Footer";
import Game from "./pages/Game";
import Player from "./pages/Player";
import Record from "./pages/Record";
import { main_component } from "./style/component.style";
import theme from "./style/Theme";

const font_theme = createTheme({
  typography: {
    fontFamily: "Noto Serif KR", //font.css파일에 @import 넣은 후에 fontFamily는 이곳에 적용
    //각 css에서 font-weight, font-size 수정해서 굵기와 크기 변경 가능
  },
});

function MenuToolbar() {
  const theme = useTheme();

  return (
    <AppBar position="static">
      <Toolbar style={{ background: theme.main }}>
        <Typography variant="h5" style={{ fontFamily: "Rye" }}>
          RASCAL
        </Typography>
        <Button color="inherit" component={Link} to="/player">
          선수
        </Button>
        <Button color="inherit" component={Link} to="/game">
          경기 등록
        </Button>
        <Button color="inherit" component={Link} to="/record">
          경기 기록
        </Button>
        <Button color="inherit" component={Link} to="/card">
          카드
        </Button>
      </Toolbar>
    </AppBar>
  );
}

function App() {
  return (
    <ThemeProvider theme={font_theme}>
      <Router>
        <MenuToolbar />
        <Container>
          <Box my={4}>
            <Routes>
              <Route path="/player" element={<Player />} />
              <Route path="/game" element={<Game />} />
              <Route path="/record" element={<Record />} />
              <Route path="/card" element={<Card />} />
            </Routes>
          </Box>
        </Container>
      </Router>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
