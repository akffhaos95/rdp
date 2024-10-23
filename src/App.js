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
import { ThemeProvider, createTheme } from "@mui/material";
import Card from "./pages/Card";
import Edit from "./pages/Edit";
import Footer from "./components/Footer";
import Game from "./pages/Game";
import Player from "./pages/Player";
import Record from "./pages/Record";
import TemporaryDrawer from "./SideBar";
import { useMediaQuery } from "@mui/material";
import theme from "./style/Theme";
const font_theme = createTheme({
  typography: {
    fontFamily: "Noto Serif KR",
  },
});

function MenuToolbar() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <AppBar position="static" style={{ zIndex: 50 }}>
      <Toolbar style={{ background: theme.main }}>
        {isMobile ? (
          <TemporaryDrawer />
        ) : (
          <>
            <Typography variant="h5" style={{ fontFamily: "Rye" }}>
              RASCAL
            </Typography>
            <Button color="inherit" component={Link} to="/card">
              카드
            </Button>
            <Button color="inherit" component={Link} to="/edit">
              카드 수정
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

function App() {
  return (
    <ThemeProvider theme={font_theme}>
      <Router>
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            width: "100vw",
            overflow: "hidden",
          }}
        >
          <MenuToolbar />
          <main
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "space-between",
              overflow: "hidden",
            }}
          >
            <Box
              style={{
                flex: 1,
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              <Routes>
                <Route path="/player" element={<Player />} />
                <Route path="/game" element={<Game />} />
                <Route path="/record" element={<Record />} />
                <Route path="/card" element={<Card />} />
                <Route path="/edit" element={<Edit />} />
              </Routes>
            </Box>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
