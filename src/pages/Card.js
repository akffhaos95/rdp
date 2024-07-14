import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import CardBox from "../components/card/CardBox";
import CardListBox from "../components/card/CardListBox";
import { db } from "../firebase";

const Card = () => {
  const [cardList, setCardList] = useState(null);
  const [card, setCard] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const [scale, setScale] = useState(20); // 초기값 10%
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
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            scale={scale}
            handleScaleChange={handleScaleChange}
          />
          <CardBox
            card={card}
            setCard={setCard}
            isEdit={isEdit}
            scale={scale}
          />
        </>
      )}
    </div>
  );
};

export default Card;
