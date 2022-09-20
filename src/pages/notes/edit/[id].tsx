import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import styles from "../create-note.module.scss";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { defaultNote, Note } from "../../../features/posts/notesSlice";
import { useGlobalContext } from "../../../context";
import { db } from "../../../firebase-config";

interface Props {
  postId: string;
}

const editNote: NextPage<Props> = ({ postId }) => {
  const router = useRouter();
  const { isAuth } = useGlobalContext();
  const [note, setNote] = useState(defaultNote);
  const noteRef = doc(db, "notes", postId);

  const updateNote = async () => {
    await updateDoc(noteRef, { ...note });
    router.push("/notes");
  };

  useEffect(() => {
    const getNote = async () => {
      const docSnap = await getDoc(noteRef);

      if (docSnap.exists()) {
        const note = docSnap.data() as Note;
        setNote(note);
      } else {
        throw Error("Документ не найден");
      }
    };

    if (!isAuth && !localStorage.getItem("isAuth")) {
      router.push("/login");
    } else {
      getNote().catch(console.error);
    }
  }, []);

  return (
    <div className={styles.createPostPage}>
      <div className={styles.cpContainer}>
        <h1>Разберите своё состояние</h1>
        <div className={styles.inputGp}>
          <label htmlFor="title">Заголовок</label>
          <input
            type="text"
            placeholder="Заголовок..."
            value={note.title}
            id="title"
            name="title"
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />
        </div>
        <div className={styles.inputGp}>
          <label htmlFor="post">Ситуация</label>
          <textarea
            placeholder="Ситуация..."
            value={note.description}
            id="post"
            name="post"
            onChange={(e) => setNote({ ...note, description: e.target.value })}
          />
        </div>
        <button onClick={updateNote}> Обновить запись </button>
      </div>
    </div>
  );
};

export default editNote;

export const getServerSideProps = async ({ params }) => {
  const { id } = params;

  return {
    props: {
      postId: id,
    },
  };
};
