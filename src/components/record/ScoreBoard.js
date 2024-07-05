import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const ScoreBoard = ({ innings, homeTeamScores, awayTeamScores }) => {
  const totalInnings = Math.max(innings.length, 7); // 최소 7회까지 표시

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        padding: 2,
        borderRadius: 2,
        width: "100%",
        maxWidth: 600,
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        스코어 보드
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>이닝</TableCell>
            {Array.from({ length: totalInnings }, (_, i) => (
              <TableCell key={i} align="center">
                {i + 1}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>원정팀</TableCell>
            {Array.from({ length: totalInnings }, (_, i) => (
              <TableCell key={i} align="center">
                {awayTeamScores[i] !== undefined ? awayTeamScores[i] : ""}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>홈팀</TableCell>
            {Array.from({ length: totalInnings }, (_, i) => (
              <TableCell key={i} align="center">
                {homeTeamScores[i] !== undefined ? homeTeamScores[i] : ""}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default ScoreBoard;
