import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";

import QrScanner from "react-qr-scanner"; // QR 스캐너 컴포넌트 추가

const HintMain = () => {
  const [scannedData, setScannedData] = useState(null); // 스캔한 데이터
  const [showScanner, setShowScanner] = useState(false); // 스캐너 표시 상태

  const handleScan = (data) => {
    if (data) {
      setScannedData(data); // 스캔한 데이터 저장
      setShowScanner(false); // 스캐너 닫기
      // 스캔한 데이터를 기반으로 필요한 처리
      console.log("스캔한 데이터:", data);
      // 필요에 따라 힌트 페이지로 이동
      window.location.href = `/${data}`; // 스캔한 QR코드의 내용을 기반으로 페이지 이동
    }
  };

  const handleError = (err) => {
    console.error(err); // 오류 처리
  };
  return (
    <Box sx={{ padding: 2 }}>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setShowScanner(true)}
        sx={{ marginTop: 2 }}
      >
        QR 코드 스캔하기
      </Button>
      {showScanner && (
        <QrScanner
          onScan={handleScan}
          onError={handleError}
          style={{ width: "100%", height: "400px", marginTop: "20px" }}
        />
      )}
    </Box>
  );
};

export default HintMain;
