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
import { db } from "../../firebase";
import { useForm, Controller, SubmitHandler } from "react-hook-form"


interface FormType {
  // playerId: string;
  playerName:string;
  playerNumber:string;
  batter:string;
  pitcher:string;
}
const PlayerCreate = ({ handleClose }: { handleClose: () => void }) => {
  const {register,handleSubmit,control}= useForm<FormType>();
  const onSubmit: SubmitHandler<FormType> = (data) => console.log(data);

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
      <form  onSubmit={handleSubmit(onSubmit)}>
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
          <TextField id="outlined-basic" label="선수명" variant="outlined"{...register("playerName")} />
          <TextField id="outlined-basic" label="선수 번호" variant="outlined" {...register("playerNumber")}/>
        </Grid>
        <Grid>
          <PlayerToggle
            control={control}
            name="batter"
            options={[
              { value: "좌타", name: "좌타" },
              { value: "우타", name: "우타" },
              { value: "양타", name: "양타" },
            ]}
            
          />
        </Grid>
        <Grid>
          <PlayerToggle
          name="pitcher"
          control={control}
            options={[
              { value: "좌투", name: "좌투" },
              { value: "우투", name: "우투" },
              { value: "양투", name: "양투" },
            ]}
          
          />
        </Grid>
      </Grid>
      <Button type="submit"
        style={{ background: theme.main, color: "white" }}
        variant="contained"
      >
        선수 생성
      </Button>
      </form>
    </Card>
  );
};

export default PlayerCreate;
