import React, { useState } from "react";
import {
	TextField,
	Button,
	Typography,
	List,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	IconButton,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from "@mui/material";
import { db } from "../../firebase";
import { collection, addDoc, getDocs, doc, updateDoc, query, where } from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
type Player = {
	id: string;
	number: number;
	name: string;
};
export const PlayerCard = ({ player, updateList }: { player: Player; updateList: () => void }) => {
	const [name, setName] = useState("");
	const [number, setNumber] = useState("");
	const [records, setRecords] = useState({}); // state to store player records
	const [editPlayerId, setEditPlayerId] = useState(null); // state to track which player is in edit mode

	const fetchRecords = async (playerId) => {
		const gamesSnapshot = await getDocs(collection(db, "games"));
		const playerRecords: { gameId: string; opponent: any }[] = [];

		for (const gameDoc of gamesSnapshot.docs) {
			const recordsQuery = query(collection(db, "games", gameDoc.id, "records"), where("batter", "==", playerId));
			const recordsSnapshot = await getDocs(recordsQuery);
			recordsSnapshot.forEach((doc) => playerRecords.push({ ...doc.data(), gameId: gameDoc.id, opponent: gameDoc.data().opponent }));
		}

		setRecords((prevRecords) => ({ ...prevRecords, [playerId]: playerRecords }));
	};
	const handleEdit = (playerId, playerName, playerNumber) => {
		setEditPlayerId(playerId); // set edit mode for this player
		setName(playerName); // set initial name in edit mode
		setNumber(playerNumber); // set initial number in edit mode
	};
	const handleCancelEdit = () => {
		setEditPlayerId(null); // exit edit mode
		setName(""); // clear name input
		setNumber(""); // clear number input
	};
	const handleSaveEdit = async (playerId: string) => {
		try {
			await updateDoc(doc(db, "players", playerId), {
				name,
				number,
			});
			setEditPlayerId(null); // exit edit mode
			alert("선수 정보가 성공적으로 수정되었습니다.");
			// Refresh player list
			const querySnapshot = await getDocs(collection(db, "players"));
			// setPlayers(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
			updateList();
		} catch (error) {
			console.error("Error updating player: ", error);
		}
	};
	return (
		<Accordion key={player.id} onChange={() => fetchRecords(player.id)}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<ListItemText primary={`${player.name} (#${player.number})`} />
				<ListItemSecondaryAction>
					<IconButton edge="end" aria-label="edit" onClick={() => handleEdit(player.id, player.name, player.number)} style={{ marginRight: 30 }}>
						<EditIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</AccordionSummary>
			<AccordionDetails>
				{editPlayerId === player.id ? (
					<>
						<TextField label="선수 이름" value={name} onChange={(e) => setName(e.target.value)} fullWidth required />
						<TextField label="등번호" value={number} onChange={(e) => setNumber(e.target.value)} fullWidth required />
						<Button onClick={() => handleSaveEdit(player.id)} variant="contained" color="primary" style={{ marginRight: 10 }}>
							저장
						</Button>
						<Button onClick={handleCancelEdit} variant="contained" color="secondary">
							취소
						</Button>
					</>
				) : (
					<>
						<Typography variant="h6">기록</Typography>
						<List>
							{records[player.id] &&
								records[player.id].map((record, index) => (
									<ListItem key={index}>
										<ListItemText
											primary={`상대 팀: ${record.opponent}, 타격 결과: ${record.result}, 타구 방향: ${record.hitLocation}, 시간: ${new Date(
												record.timestamp.seconds * 1000
											).toLocaleString()}`}
										/>
									</ListItem>
								))}
						</List>
					</>
				)}
			</AccordionDetails>
		</Accordion>
	);
};
