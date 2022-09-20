import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import styles from "./Post.module.scss";
import { useRouter } from "next/router";
import { useGlobalContext } from "../../context";
import { defaultNote, PostNote } from "../../features/posts/notesSlice";
import { db } from "../../firebase-config";
import { doc, getDoc } from "firebase/firestore";

type Props = {
  postId: string;
};

const Note: NextPage<Props> = ({ postId }) => {
  const router = useRouter();
  const { isAuth } = useGlobalContext();
  const [note, setNote] = useState(defaultNote);
  const noteRef = doc(db, "notes", postId);

  useEffect(() => {
    const getNote = async () => {
      const docSnap = await getDoc(noteRef);

      if (docSnap.exists()) {
        const note = docSnap.data() as PostNote;
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
    <section className={[styles.post, "py-3"].join(" ")}>
      <h2>{note.title}</h2>

      <div className={[styles["post-part"], styles["post-labels"]].join(" ")}>
        <span className={styles["post-labels__emote"]}>{note.emotion}</span>
        <span className={styles["post-labels__emote"]}>{note.emotePower}</span>
        {note.distortions.map((distortion, index) => (
          <span className={styles["post-labels__distortion"]} key={index}>
            {distortion}
          </span>
        ))}
      </div>

      <div className={styles["post-part"]}>
        <h3>Описание ситуации</h3>
        <p>{note.description}</p>
      </div>
      <div className={styles["post-part"]}>
        <h3>Автоматические мысли</h3>
        <p>{note.autoThoughts}</p>
      </div>
      <div className={styles["post-part"]}>
        <h3>Анализ автоматических мыслей</h3>
        <p>{note.thoughtAnalyze}</p>
      </div>
      <div className={styles["post-part"]}>
        <h3>Альтернативные мысли</h3>
        <p>{note.rationalThoughts}</p>
      </div>
    </section>
  );
};

export default Note;

export const getServerSideProps = async ({ params }) => {
  const { id } = params;

  return {
    props: {
      postId: id,
    },
  };
};
