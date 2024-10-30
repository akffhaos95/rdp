import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import CardBox from "../components/card/CardBox";
import CardListBox from "../components/card/CardListBox";
import Sidebar from "../components/edit/Sidebar";
import { db } from "../firebase";

const Edit = () => {
  const [cardList, setCardList] = useState(null);
  const [card, setCard] = useState(null);
  const [scale, setScale] = useState(20);
  const [tab, setTab] = React.useState("1");

  const handleTab = (newValue) => {
    setTab(newValue);
  };
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

        if (cardData.length > 0) {
          setCard(cardData[0]);
        }
      } catch (error) {
        console.error("Error fetching Firestore data:", error);
      }
    };

    const flattenObjectToString = (obj) => {
      if (!obj || typeof obj !== "object") {
        return ""; // type narrowing
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
    <div
      style={{
        display: "flex",
        height: "100%",
        flexGrow: 1,
      }}
    >
      <Sidebar card={card} setCard={setCard} tab={tab} handleTab={handleTab} />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
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
