import { db, storage } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const uploadPlayerPhoto = async (playerId, file) => {
  try {
    const storageRef = ref(storage, `players/${playerId}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file: ", error);
    return null;
  }
};

export const uploadOpponentPhoto = async (opponentId, file) => {
  if (!file) return;

  const storageRef = ref(storage, `opponent/${opponentId}`);
  await uploadBytes(storageRef, file);
  const photoURL = await getDownloadURL(storageRef);

  const opponentDocRef = doc(db, "opponent", opponentId);
  await updateDoc(opponentDocRef, { photoURL });
};
