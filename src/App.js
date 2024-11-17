import "./style/font.css";

import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import {
  Link,
  Route,
  HashRouter as Router,
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
import HintPersonal from "./components/crime/hintPersonal";
import HintStart from "./components/crime/hintStart";
import Player from "./pages/Player";
import Record from "./pages/Record";
import TemporaryDrawer from "./SideBar";
import Timer from "./components/crime/timer";
import theme from "./style/Theme";
import { useEffect } from "react";
import { useMediaQuery } from "@mui/material";

const font_theme = createTheme({
  typography: {
    fontFamily: "Noto Serif KR",
  },
});

function MenuToolbar() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <AppBar position="pixed" style={{ zIndex: 50 }}>
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
  const savedName = localStorage.getItem("personal_name");
  const logo = `${process.env.PUBLIC_URL}/hint/logo.png`;

  return (
    <AppBar position="pixed" style={{ zIndex: 50 }}>
      <Toolbar style={{ background: theme.main }}>
        <img
          src={logo}
          alt="Rascal Logo"
          style={{ height: "35px", width: "auto" }} // 로고 크기 조정
        />
        <Button color="inherit" component={Link} to="/crime">
          가이드
        </Button>
        {savedName && (
          <Button
            color="inherit"
            component={Link}
            to={`/crime/personal/${savedName}`}
          >
            프로필
          </Button>
        )}
        <Button color="inherit" component={Link} to="/crime/hint-list">
          발견한 힌트
        </Button>
      </Toolbar>
    </AppBar>
  );
}

function AppContent() {
  const location = useLocation();
  const backgroundImage = `${process.env.PUBLIC_URL}/hint/background.png`;

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.6,
          zIndex: -1,
        }}
      ></div>
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
          paddingBottom: "50px",
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
            <Route path="/crime" element={<HintStart />} />
            <Route path="/crime/time" element={<Timer />} />
            <Route
              path="/crime/personal/:personal_name"
              element={<HintPersonal />}
            />
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
