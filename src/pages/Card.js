import * as XLSX from "xlsx";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import CardBox from "../components/card/CardBox";
import CardListBox from "../components/card/CardListBox";
import { db } from "../firebase";

const Card = () => {
  const [cardList, setCardList] = useState(null);
  const [card, setCard] = useState(null);
  const [scale, setScale] = useState(20); // 초기값 10%

  const [playerList, setPlayerList] = useState(null);
  const [batterList, setBatterList] = useState(null);
  const [pitcherList, setPitcherList] = useState(null);
  const [player, setPlayer] = useState(null);

  const handleScaleChange = (event, newValue) => {
    setScale(newValue);
  };

  useEffect(() => {
    const fetchExcelData = async () => {
      try {
        const filePath = `${process.env.PUBLIC_URL}/rascalData.xlsx`;
        const response = await fetch(filePath);
        if (response.ok) {
          const arrayBuffer = await response.arrayBuffer();
          const data = new Uint8Array(arrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });

          const playersheet = workbook.Sheets["24년 시즌 (민석이 제공용)"];
          const playersheetData = XLSX.utils.sheet_to_json(playersheet);
          console.log(playersheetData);

          const playerWorkSheet = workbook.Sheets["선수"];
          const playerData = XLSX.utils.sheet_to_json(playerWorkSheet);
          setPlayerList(playerData);

          const batterWorkSheet = workbook.Sheets["타자"];
          const batterData = XLSX.utils.sheet_to_json(batterWorkSheet);
          setBatterList(batterData);

          const pitcherWorkSheet = workbook.Sheets["투수"];
          const pitcherData = XLSX.utils.sheet_to_json(pitcherWorkSheet);
          setPitcherList(pitcherData);

          // 초반은 첫번째 player를 저장
          setPlayer(playerData[0]);
        } else {
          console.error("Failed to fetch the Excel file.");
        }
      } catch (error) {
        console.error("Error reading Excel file:", error);
      }
    };
    fetchExcelData();

    const fetchFirestoreData = async () => {
      try {
        const cardSnapshot = await getDocs(collection(db, "card"));
        const cardData = cardSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setCardList(cardData);

        // 초반은 첫번째 player를 저장
        setCard(cardList[0]);
      } catch (error) {
        console.error("Error fetching Firestore data:", error);
      }
    };

    fetchFirestoreData();
  }, []);

  return (
    <div>
      {cardList && (
        <>
          <CardListBox
            cardList={cardList}
            setCard={setCard}
            scale={scale}
            handleScaleChange={handleScaleChange}
          />
          <CardBox card={card} setCard={setCard} scale={scale} />
        </>
      )}
    </div>
  );
};

export default Card;
