import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

const HintList = () => {
  const [storedHints, setStoredHints] = useState([]);

  useEffect(() => {
    // 로컬 스토리지에서 힌트 번호 리스트 가져오기
    const fetchStoredHints = () => {
      const hints = JSON.parse(localStorage.getItem("hintList")) || [];
      setStoredHints(hints);
    };

    fetchStoredHints();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        저장된 힌트 목록
      </Typography>
      {storedHints.length === 0 ? (
        <Typography>저장된 힌트가 없습니다.</Typography>
      ) : (
        storedHints.map((hint) => (
          <Box key={hint} sx={{ marginBottom: 1 }}>
            <Link to={`/crime/${hint}`}>
              <Button variant="contained" color="primary">
                {hint} {/* 힌트 번호를 버튼에 표시 */}
              </Button>
            </Link>
          </Box>
        ))
      )}
    </Box>
  );
};

export default HintList;
