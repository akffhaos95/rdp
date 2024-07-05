import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { TextField, Button, Box, Typography, List, Slide, Grid, Card, css } from "@mui/material";
import { collection, addDoc, getDocs, doc, updateDoc, query, where } from "firebase/firestore";
import AddIcon from "@mui/icons-material/Add";
import { PlayerCard } from "../components/player/PlayerCard.tsx";
import theme from "../style/Theme";
import main_component from "../style/component.style";

/** @jsxImportSource @emotion/react */
function Player() {
	const [name, setName] = useState("");
	const [number, setNumber] = useState("");
	const [players, setPlayers] = useState([]);
	const [showAddForm, setShowAddForm] = useState(false); // state to toggle new player form

	useEffect(() => {
		const fetchPlayers = async () => {
			const querySnapshot = await getDocs(collection(db, "players"));
			setPlayers(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
		};
		fetchPlayers();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const docRef = await addDoc(collection(db, "players"), {
				name,
				number,
			});
			console.log("Document written with ID: ", docRef.id);
			setName("");
			setNumber("");
			alert("선수가 성공적으로 등록되었습니다.");
			// Refresh player list
			const querySnapshot = await getDocs(collection(db, "players"));
			setPlayers(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
			setShowAddForm(false); // hide add form after successful submission
		} catch (error) {
			console.error("Error adding player: ", error);
		}
	};

	const updateList = async () => {
		const querySnapshot = await getDocs(collection(db, "players"));
		setPlayers(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
	};

	const toggleAddForm = () => {
		setShowAddForm(!showAddForm); // toggle add form visibility
	};

	return (
		<Box>
			<Typography variant="h4" gutterBottom>
				선수 등록
			</Typography>

			{/* Add Player Button */}
			<Button onClick={toggleAddForm} variant="contained" color="primary" startIcon={<AddIcon />} style={{ marginBottom: 20, background: theme.main }}>
				새로운 선수 등록
			</Button>

			{/* Slideout Add Player Form */}
			<Slide direction="left" in={showAddForm} mountOnEnter unmountOnExit>
				<Box>
					<form onSubmit={handleSubmit}>
						<Box mb={2}>
							<TextField label="선수 이름" value={name} onChange={(e) => setName(e.target.value)} fullWidth required />
						</Box>
						<Box mb={2}>
							<TextField label="등번호" value={number} onChange={(e) => setNumber(e.target.value)} fullWidth required />
						</Box>
						<Button type="submit" variant="contained" color="primary" style={{ marginRight: 10 }}>
							저장
						</Button>
						<Button onClick={() => setShowAddForm(false)} variant="contained" color="secondary">
							취소
						</Button>
					</form>
				</Box>
			</Slide>

			{/* Player List */}
			<Typography variant="h5" gutterBottom mt={4}>
				등록된 선수 목록
			</Typography>
			<Grid container style={{ background: theme.bg }}>
				{players.map((player) => (
					<Grid xs={2.4}>
						<PlayerCard player={player} updateList={updateList} />
					</Grid>
				))}
				<Grid xs={2.4}>
					<Card css={main_component.card_add}>
						<Typography variant="h1" component="div" style={{ margin: "auto" }}>
							+
						</Typography>
					</Card>
				</Grid>
			</Grid>
			{/* <List>
				{players.map((player) => (
					<PlayerCard player={player} updateList={updateList} />
				))}
			</List> */}
		</Box>
	);
}

export default Player;
