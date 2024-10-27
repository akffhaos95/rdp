import "./style/font.css";

import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import {
  Link,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";

import Card from "./pages/Card";
import Edit from "./pages/Edit";
import Footer from "./components/Footer";
import Game from "./pages/Game";
import Hint from "./components/crime/hint";
import HintList from "./components/crime/hintList";
import HintMain from "./components/crime/hintMain";
import Player from "./pages/Player";
import Record from "./pages/Record";
import TemporaryDrawer from "./SideBar";
import Timer from "./components/crime/timer";
import theme from "./style/Theme";
import { useMediaQuery } from "@mui/material";

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

function CrimeToolbar() {
  return (
    <AppBar position="static" style={{ zIndex: 50 }}>
      <Toolbar style={{ background: theme.main }}>
        <Typography variant="h5" style={{ fontFamily: "Rye" }}>
          Rascal 크라임씬
        </Typography>
        {/* <Button color="inherit" component={Link} to="/crime">
          힌트
        </Button> */}
        <Button color="inherit" component={Link} to="/crime/hint-list">
          발견한 힌트
        </Button>
      </Toolbar>
    </AppBar>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      {location.pathname.startsWith("/crime") ? (
        <CrimeToolbar />
      ) : (
        <MenuToolbar />
      )}
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
            <Route path="/crime/time" element={<Timer />} />
            <Route path="/crime" element={<HintMain />} />
            <Route path="/crime/:hint_number" element={<Hint />} />
            <Route path="/crime/hint-list" element={<HintList />} />
          </Routes>
        </Box>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider theme={font_theme}>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
