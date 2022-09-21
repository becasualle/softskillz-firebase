import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import styles from "../create-note.module.scss";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { defaultNote, initialDistortions, Note } from "../../../features/posts/notesSlice";
import { getBackDistortions, getUIDistortions } from "../../../features/posts/notes-helpers";

import { useGlobalContext } from "../../../context";
import { db } from "../../../firebase-config";
import Button from "../../../components/Button";

interface Props {
  postId: string;
}

const editNote: NextPage<Props> = ({ postId }) => {
  const router = useRouter();
  const { isAuth } = useGlobalContext();
  const initialNote = JSON.parse(JSON.stringify(defaultNote));
  const [note, setNote] = useState(initialNote);
  const noteRef = doc(db, "notes", postId);

  const updateNote: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await updateDoc(noteRef, { ...note, distortions: getBackDistortions(note.distortions) });
    router.push("/notes");
  };

  useEffect(() => {
    const getNote = async () => {
      const docSnap = await getDoc(noteRef);

      if (docSnap.exists()) {
        const note = docSnap.data() as Note;
        const UINote = { ...note, distortions: getUIDistortions(note.distortions) };
        setNote(UINote);
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

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNote({ ...note, [name]: value });
  };

  const handleCheck: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const checked = e.target.checked;
    const name = e.target.name;
    const changedDistortions = note.distortions.map((dist) => {
      if (dist.val === name) {
        dist.checked = checked;
      }
      return dist;
    });
    setNote({ ...note, distortions: changedDistortions });
  };

  const renderedDistortions = note.distortions.map((distortion) => (
    <div className={styles["distortion-group"]} key={distortion.example}>
      <div className={styles["distortion-check"]}>
        <input
          type="checkbox"
          name={distortion.val}
          id={distortion.val}
          value={distortion.val}
          checked={distortion.checked}
          onChange={handleCheck}
        />
        <label htmlFor={distortion.val}>{distortion.val}</label>
      </div>
      <small>{distortion.example}</small>
    </div>
  ));

  return (
    <section className={`py-3`}>
      <form onSubmit={updateNote} className={styles["cbt-form"]}>
        {/* Ситуация/Триггер input text */}
        <div className={styles["input-group"]}>
          <label htmlFor="title">Ситуация/Триггер</label>
          <input
            className={styles["input-group__text"]}
            type="text"
            placeholder="Что случилось?"
            id="title"
            name="title"
            value={note.title}
            onChange={handleChange}
          />
        </div>

        {/* Описание ситуации textarea */}
        <div className={styles["input-group"]}>
          <label htmlFor="description">Описание ситуации</label>
          <textarea
            placeholder="Изложите факты о ситуации"
            id="description"
            name="description"
            value={note.description}
            onChange={handleChange}
          />
        </div>

        {/* Эмоция select */}
        <div className={styles["input-group"]}>
          <label htmlFor="emotion">Эмоция</label>
          <select
            name="emotion"
            id="emotion"
            value={note.emotion}
            onChange={handleChange}
          >
            <option value="default">Выберите самую яркую эмоцию</option>
            <option value="Гнев">Гнев, возмущение</option>
            <option value="Тревога">Страх, тревога</option>
            <option value="Грусть">Грусть, разочарование</option>
            <option value="Вина">Вина, сожаление</option>
            <option value="Стыд">Стыд, смущение</option>
            <option value="Радость">Радость, возбуждение</option>
            <option value="Любовь">Любовь, благодарность</option>
          </select>
        </div>

        {/* Сила эмоции input */}
        <div className={styles["input-group"]}>
          <label htmlFor="emotePower">Сила эмоции</label>
          <input
            className={styles["input-group__range"]}
            type="range"
            name="emotePower"
            id="emotePower"
            min="1"
            max="10"
            value={note.emotePower}
            onChange={handleChange}
          />
        </div>

        {/* Автоматические мысли textarea */}
        <div className={styles["input-group"]}>
          <label htmlFor="autoThoughts">Автоматические мысли</label>
          <textarea
            placeholder="Какие мысли крутятся в голове в отношении этой ситуации"
            id="autoThoughts"
            name="autoThoughts"
            value={note.autoThoughts}
            onChange={handleChange}
          />
        </div>

        {/* Когнитивные искажения input checkbox */}
        <div className={styles["input-group"]}>
          <div className={styles["distortion-description"]}>
            <p>Когнитивные искажения</p>
            <small>
              Выберите те когнитивные искажения, которые вы нашли в своих
              автоматических мыслях:
            </small>
          </div>
          <div className={styles["distortion-list"]}>{renderedDistortions}</div>
        </div>

        {/* Анализ автоматических мыслей textarea */}
        <div className={styles["input-group"]}>
          <label htmlFor="thoughtAnalyze">Анализ автоматических мыслей</label>
          <textarea
            placeholder="Какие есть аргументы за и против? Насколько эти мысли соотвествуют фактам, логике? Приносят ли они пользу или вредят?"
            id="thoughtAnalyze"
            name="thoughtAnalyze"
            value={note.thoughtAnalyze}
            onChange={handleChange}
          />
        </div>

        {/* Альтернативные мысли textarea */}
        <div className={styles["input-group"]}>
          <label htmlFor="rationalThoughts">Альтернативные мысли</label>
          <textarea
            placeholder="Как можно конструктивно думать о ситуации без когнитивных искажений, с пользой для себя и окружающих?"
            id="rationalThoughts"
            name="rationalThoughts"
            value={note.rationalThoughts}
            onChange={handleChange}
          />
        </div>
        {/* @ts-ignore */}
        <Button> Сохранить запись </Button>
      </form>
    </section>
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
