import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import CardBox from "../components/card/CardBox";
import CardListBox from "../components/card/CardListBox";
import Sidebar from "../components/edit/Sidebar";
import { db } from "../firebase";

const Edit = () => {
  const [cardList, setCardList] = useState(null);
  const [card, setCard] = useState(null);
  const [scale, setScale] = useState(20); // 초기값 20%

  const handleScaleChange = (event, newValue) => {
    setScale(newValue);
  };

  useEffect(() => {
    const fetchFirestoreData = async () => {
      try {
        const cardSnapshot = await getDocs(collection(db, "card"));
        const cardData = cardSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setCardList(cardData);

        // 초반은 첫번째 player를 저장
        if (cardData.length > 0) {
          setCard(cardData[0]);
        }
      } catch (error) {
        console.error("Error fetching Firestore data:", error);
      }
    };

    const flattenObjectToString = (obj) => {
      if (!obj || typeof obj !== "object") {
        return ""; //type narrowing
      }

      return Object.entries(obj)
        .map(([key, value]) => {
          if (typeof value === "object" && value !== null) {
            return `${key}: { ${flattenObjectToString(value)} }`;
          }
          return `${key}: ${String(value)}`;
        })
        .join(", ");
    };

    const flattenedString = flattenObjectToString(card);
    console.log(flattenedString);
    fetchFirestoreData();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar card={card} setCard={setCard} /> 사이드바 추가
      <div style={{ flex: 1 }}>
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
    </div>
  );
};

export default Edit;