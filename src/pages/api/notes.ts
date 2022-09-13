import { auth, db } from "../../firebase-config";
import { getDocs, collection } from "firebase/firestore";
import { Note } from "../notes/create-note";

const notesCollectionRef = collection(db, "notes");

export const getNotes = async () => {
  const data = await getDocs(notesCollectionRef);
  //   const authUserNotes = data.docs.filter(
  //     (doc) => doc.data().author.id === auth.currentUser.uid
  //   );
  const notes = data.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        id: doc.id,
      } as Note)
  );

  return notes;
};
