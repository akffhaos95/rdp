import {
  Card,
  Typography,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Button,
} from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import theme from "../../style/Theme";
import PlayerToggle from "./PlayerToggle";

const PlayerCreate = ({ handleClose }: { handleClose: () => void }) => {
  const [batter, setBatter] = useState(() => "");
  const [pitcher, setPitcher] = useState(() => "");
  const handleBatter = (event: any) => {
    setBatter(event.target.value);
  };
  const handlePitcher = (event: any) => {
    setPitcher(event.target.value);
  };
  return (
    <Card
      style={{
        height: "fit-content",
        minHeight: 100,
        padding: 15,
        position: "relative",
      }}
    >
      <CloseIcon
        style={{ position: "absolute", right: 20 }}
        onClick={handleClose}
      />
      <Typography variant="h5" style={{ fontWeight: 500 }}>
        신규 선수 등록
      </Typography>
      <Grid mt={5}>
        <Grid item>
          <Card
            style={{
              width: 150,
              height: 200,
              color: "lightgray",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <FaceIcon style={{ fontSize: 150 }} />
            사진을 추가하세요
          </Card>
        </Grid>
        <Grid>
          <TextField id="outlined-basic" label="선수명" variant="outlined" />
          <TextField id="outlined-basic" label="선수 번호" variant="outlined" />
        </Grid>
        <Grid>
          <PlayerToggle
            options={[
              { value: "좌타", name: "좌타" },
              { value: "우타", name: "우타" },
              { value: "양타", name: "양타" },
            ]}
            value={batter}
            handleValue={handleBatter}
          />
        </Grid>
        <Grid>
          <PlayerToggle
            options={[
              { value: "좌투", name: "좌투" },
              { value: "우투", name: "우투" },
              { value: "양투", name: "양투" },
            ]}
            value={pitcher}
            handleValue={handlePitcher}
          />
        </Grid>
      </Grid>
      <Button
        style={{ background: theme.main, color: "white" }}
        variant="contained"
      >
        선수 생성
      </Button>
    </Card>
  );
};

export default PlayerCreate;
