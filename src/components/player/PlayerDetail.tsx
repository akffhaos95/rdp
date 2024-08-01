// PlayerDetail.tsx

import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
import BoyIcon from "@mui/icons-material/Boy";
import React, { useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Button, Grid, useMediaQuery, TextField } from "@mui/material";
import * as Detail from "./PlayerDetail.style";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import PlayerToggle from "./PlayerToggle";
import { GoldenGloves, MVP, Pitcher, Batter } from "../achievement/badges";

interface Player {
  name: string;
  number: string;
  photoURL: string;
  stats: { label: string; value: string }[];
  batter: string;
  pitcher: string;
}
type BattingSide = "좌타" | "우타" | "양타";
type PitchingSide = "좌투" | "우투" | "양투";
// PlayerDetail 컴포넌트
const PlayerDetail: React.FC<{ player: Player }> = ({ player }) => {
  const stats = player?.stats ?? []; // stats가 undefined일 경우 빈 배열 사용
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Player>();
  const onSubmit: SubmitHandler<Player> = (data) => console.log(data);

  const [isEdit, setIsEdit] = useState(false);

  return (
    <Detail.Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button
          onClick={() => setIsEdit(!isEdit)}
          type="submit"
          className="edit"
        >
          {isEdit ? <SaveIcon /> : <EditIcon />}
        </Button>
        {/* photo textfield */}
        <Grid container style={{ marginBottom: 10, border: "1px solid blue" }}>
          <Grid md={3.5} xs={4.5} sm={4.5}>
            {player.photoURL ? (
              <Grid>
                <Detail.Photo
                  src={player.photoURL}
                  alt={player.name}
                  style={{
                    height: isMobile ? 220 : 300,
                    border: "1px solid black",
                  }}
                />
              </Grid>
            ) : (
              <Grid
                style={{
                  position: "relative",
                  height: isMobile ? 200 : 330,
                }}
              >
                <SportsBaseballIcon
                  style={{
                    fontSize: isMobile ? 130 : 220,
                    marginLeft: isMobile ? 20 : 15,
                    color: "#212F3D  ",
                  }}
                />
                <BoyIcon
                  style={{
                    fontSize: isMobile ? 130 : 220,
                    marginRight: "auto",
                    position: "absolute",
                    left: isMobile ? 20 : 15,
                    top: isMobile ? 77 : 130,
                    color: "#212F3D ",
                  }}
                />
              </Grid>
            )}
          </Grid>
          <Grid
            md={isMobile ? 5 : 3}
            xs={isMobile ? 5 : 3}
            sm={isMobile ? 5 : 4}
            pt={isMobile ? 4 : 3}
            style={{
              border: "1px solid orange",
              // display: isEdit ? "inline" : "none",
              marginLeft: "5%",
            }}
          >
            {isEdit ? (
              <>
                <PlayerToggle
                  name="pitcher"
                  control={control}
                  options={[
                    { value: "좌투", name: "좌투" },
                    { value: "우투", name: "우투" },
                    { value: "양투", name: "양투" },
                  ]}
                  value={player.pitcher}
                />

                <PlayerToggle
                  control={control}
                  name="batter"
                  options={[
                    { value: "좌타", name: "좌타" },
                    { value: "우타", name: "우타" },
                    { value: "양타", name: "양타" },
                  ]}
                  value={player.batter}
                />

                <Button className="img_btn">
                  사진 업로드
                  <input type="file" />
                </Button>
              </>
            ) : (
              <div style={{ display: "block" }}>
                <Batter battingSide={player.batter as BattingSide} />
                <Pitcher pitchingSide={player.pitcher as PitchingSide} />
              </div>
            )}
          </Grid>
        </Grid>
        {/* photo textfield */}
        {/* toggle & name number */}
        <Grid container style={{ border: "1px solid red" }}>
          <Grid container>
            {isEdit ? (
              <Grid md={4} xs={6} sm={5}>
                <TextField
                  id="outlined-basic"
                  label="선수명"
                  variant="outlined"
                  value={player.name}
                  {...register("name")}
                  style={{ margin: "15px 10px " }}
                />
                <TextField
                  id="outlined-basic"
                  label="선수 번호"
                  variant="outlined"
                  {...register("number")}
                  value={player.number}
                  style={{ margin: "15px 10px " }}
                />
              </Grid>
            ) : (
              <div style={{ display: "flex" }}>
                {" "}
                <GoldenGloves />
                <MVP year={2023} />
              </div>
            )}
            <Grid style={{ marginLeft: "auto" }}>
              <Detail.InfoContainer>
                <Detail.Number>{player.number}</Detail.Number>
                <Detail.Name>{player.name}</Detail.Name>
                <Detail.Stats>
                  <ul>
                    {stats.map((stat, index) => (
                      <li key={index}>
                        <span className="stat-label">{stat.label}</span>
                        <span className="stat-value">{stat.value}</span>
                      </li>
                    ))}
                  </ul>
                </Detail.Stats>
              </Detail.InfoContainer>
            </Grid>
          </Grid>
        </Grid>
        {/* toggle & name number */}
      </form>
    </Detail.Card>
  );
};

export default PlayerDetail;
