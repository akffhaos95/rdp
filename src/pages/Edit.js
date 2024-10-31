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

  const handleTab = (newValue) => setTab(newValue);
  const handleScaleChange = (event, newValue) => setScale(newValue);

  useEffect(() => {
    const fetchFirestoreData = async () => {
      try {
        const cardSnapshot = await getDocs(collection(db, "card"));
        const cardData = cardSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setCardList(cardData);
        if (cardData.length > 0) setCard(cardData[0]);
      } catch (error) {
        console.error("Error fetching Firestore data:", error);
      }
    };

    fetchFirestoreData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        maxHeight: "100%",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Sidebar card={card} setCard={setCard} tab={tab} handleTab={handleTab} />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
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
