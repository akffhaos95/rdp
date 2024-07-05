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

const CountBoard = ({
  ballCount,
  strikeCount,
  outCount,
  inning,
  halfInning,
}) => {
  const renderCircles = (count, type) => {
    let color;
    if (type === "ball") color = "lightgreen";
    if (type === "strike") color = "yellow";
    if (type === "out") color = "red";

    return Array.from({ length: 3 }, (_, i) => (
      <Box
        key={i}
        component="span"
        sx={{
          display: "inline-block",
          width: 24,
          height: 24,
          borderRadius: "50%",
          backgroundColor: i < count ? color : "transparent",
          border: `2px solid ${color}`,
          marginRight: 0.5,
        }}
      ></Box>
    ));
  };

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        padding: 2,
        borderRadius: 2,
        width: "100%",
        maxWidth: 300,
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        {inning}회 {halfInning}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">카운트</TableCell>
            <TableCell align="center">표시</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>볼</TableCell>
            <TableCell>{renderCircles(ballCount, "ball")}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>스트라이크</TableCell>
            <TableCell>{renderCircles(strikeCount, "strike")}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>아웃</TableCell>
            <TableCell>{renderCircles(outCount, "out")}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default CountBoard;
