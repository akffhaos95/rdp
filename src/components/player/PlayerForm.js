import { Box, Button, Slide, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import AddIcon from "@mui/icons-material/Add";
import { db } from "../../firebase";
import theme from "../../style/Theme";
import { uploadPlayerPhoto } from "../../util/uploadPhoto";

const PlayerForm = ({ players, setPlayers }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoPreviewURL, setPhotoPreviewURL] = useState("");

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "players"));
        setPlayers(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error("Error fetching players: ", error);
      }
    };
    fetchPlayers();
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "players"), {
        name,
        number,
      });
      console.log("Document written with ID: ", docRef.id);

      if (photo) {
        console.log("Photo");
        const photoURL = await uploadPlayerPhoto(docRef.id, photo);
        if (photoURL) {
          await updateDoc(doc(db, "players", docRef.id), { photoURL });
        }
      }

      // Reset form
      setName("");
      setNumber("");
      setPhoto(null);
      setPhotoPreviewURL("");
      alert("선수가 성공적으로 등록되었습니다.");

      // Refresh player list
      const querySnapshot = await getDocs(collection(db, "players"));
      setPlayers(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding player: ", error);
    }
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        선수 등록
      </Typography>

      <Button
        onClick={toggleAddForm}
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        style={{ marginBottom: 20, background: theme.main }}
      >
        새로운 선수 등록
      </Button>

      <Slide direction="left" in={showAddForm} mountOnEnter unmountOnExit>
        <Box>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                label="선수 이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="등번호"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                fullWidth
                required
              />
            </Box>
            <Box mb={2}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="upload-photo"
                type="file"
                onChange={handlePhotoChange}
              />
              <label htmlFor="upload-photo">
                <Button variant="contained" color="primary" component="span">
                  사진 업로드
                </Button>
              </label>
            </Box>
            {photoPreviewURL && (
              <Box mb={2}>
                <img
                  src={photoPreviewURL}
                  alt="미리보기"
                  style={{ width: "100%", maxHeight: 200 }}
                />
              </Box>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginRight: 10 }}
            >
              저장
            </Button>
            <Button
              onClick={() => setShowAddForm(false)}
              variant="contained"
              color="secondary"
            >
              취소
            </Button>
          </form>
        </Box>
      </Slide>
    </>
  );
};

export default PlayerForm;
