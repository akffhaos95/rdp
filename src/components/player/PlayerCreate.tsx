import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useRef, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import FaceIcon from "@mui/icons-material/Face";
import PlayerToggle from "./PlayerToggle";
import { db } from "../../firebase";
import theme from "../../style/Theme";
import { uploadPlayerPhoto } from "../../util/uploadPhoto";

interface FormType {
  name: string;
  number: string;
  batter: string;
  pitcher: string;
}

const PlayerCreate = ({ handleClose }: { handleClose: () => void }) => {
  const { register, handleSubmit, control } = useForm<FormType>();
  const [photo, setPhoto] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    try {
      const docRef = await addDoc(collection(db, "players"), data); // data에 있는 데이터를 firebase 콜렉션에 저장
      console.log("Document written with ID: ", docRef.id); // 생성된 데이터의 id

      if (photo) {
        // photo 데이터가 있는 상황
        console.log("Photo");
        const photoURL = await uploadPlayerPhoto(docRef.id, photo);
        if (photoURL) {
          // 데이터의 id 이름으로 파일 이름 변경 후 파이어 스토어에 저장된 사진의 주소를 photoUrl로 업로드
          await updateDoc(doc(db, "players", docRef.id), { photoURL });
        }
        handleClose();
      }
    } catch (error) {
      console.error("Error adding player: ", error);
    }
  };

  // const handlePhotoClick = () => {
  //   fileInputRef.current?.click();
  //   console.log(fileInputRef)
  // };

  // const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files[0]) {
  //     setPhoto(event.target.files[0]);
  //   }
  // };

  // const [photo, setPhoto] = useState<string | null>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid mt={5}>
          <Grid item>
            {photo === null ? (
              <Card
                style={{
                  width: 150,
                  height: 200,
                  color: "lightgray",
                  alignItems: "center",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <FaceIcon style={{ fontSize: 150 }} />
                사진을 추가하세요
              </Card>
            ) : (
              <img
                src={URL.createObjectURL(photo)}
                alt="Uploaded preview"
                style={{
                  width: 150,
                  height: 200,
                  color: "lightgray",
                  alignItems: "center",
                  textAlign: "center",
                  cursor: "pointer",
                  border: 10,
                }}
              />
            )}
            <Button onClick={handleButtonClick}>
              {photo !== null ? "사진 수정" : "사진 선택"}
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handlePhotoUpload}
            />
          </Grid>
          <Grid>
            <TextField
              id="outlined-basic"
              label="선수명"
              variant="outlined"
              {...register("name")}
            />
            <TextField
              id="outlined-basic"
              label="선수 번호"
              variant="outlined"
              {...register("number")}
            />
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
        <Button
          type="submit"
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
