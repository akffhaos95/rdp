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

const PlayerCreate = ({ handleClose }: { handleClose: () => void }) => {
  const [devices, setDevices] = useState(() => ["phone"]);
  const handleDevices = (
    event: React.MouseEvent<HTMLElement>,
    newDevices: string[]
  ) => {
    if (newDevices.length) {
      setDevices(newDevices);
    }
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
          <ToggleButtonGroup
            value={devices}
            onChange={handleDevices}
            aria-label="device"
          >
            <ToggleButton value="1" aria-label="1">
              좌타
            </ToggleButton>
            <ToggleButton value="2" aria-label="2">
              우타
            </ToggleButton>
            <ToggleButton value="3" aria-label="3">
              양타
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid>
          <ToggleButtonGroup
            value={devices}
            onChange={handleDevices}
            aria-label="device"
          >
            <ToggleButton value="41" aria-label="4">
              좌투
            </ToggleButton>
            <ToggleButton value="5" aria-label="5">
              우투
            </ToggleButton>
            <ToggleButton value="6" aria-label="6">
              양투
            </ToggleButton>
          </ToggleButtonGroup>
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
