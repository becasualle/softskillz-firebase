import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import styles from "./create-note.module.scss";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { useRouter } from "next/router";
import { useGlobalContext } from "../../context";
import { Author, PostNote, Note } from "../../features/posts/notesSlice";
import Button from "../../components/Button";
import dayjs from "dayjs";

interface Props {}

const createNote: NextPage<Props> = () => {
  const [noteContent, setNoteContent] = useState({ title: "", text: "" });

  const router = useRouter();

  const notesCollectionRef = collection(db, "notes");

  const { isAuth } = useGlobalContext();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  const createNote = async () => {
    const createdAt = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const author: Author = {
      name: auth.currentUser.displayName,
      id: auth.currentUser.uid,
      email: auth.currentUser.email,
    };
    const note: PostNote = {
      title: noteContent.title,
      text: noteContent.text,
      author,
      createdAt,
    };
    await addDoc(notesCollectionRef, note);
    router.push("/notes");
  };

  useEffect(() => {
    if (!isAuth && !localStorage.getItem("isAuth")) {
      router.push("/login");
    }
  }, []);

  // Информация для отрисовки блока формы со списком чекбоксов когнитивных искажений
  const cognitiveDistortions = [
    { name: "Катастрофизация", example: "Что если случится худшее?" },
    { name: "Черно-белое мышление", example: "Я полный неудачник" },
    {
      name: "Эмоциональное рассуждение",
      example: "Я так чувствую, стало быть это правда",
    },
    { name: "Усиление негатива", example: "Я абсолютно все загубил " },
    {
      name: "Ментальный фильтр",
      example: "Они так сказали просто из вежливости",
    },
    { name: "Навешивание ярлыков", example: "Если я ошибся, значит, я идиот" },
    {
      name: "Предсказание будущего",
      example: "Я наверняка провалю мой экзамен",
    },
    { name: "Чтение мыслей", example: "Он думает, что я не справлюсь" },
    { name: "Персонализация", example: "Это всё из-за меня" },
    { name: "Обвинение других", example: "Это они во всем виноваты" },
    { name: "Чрезмерное обобщение", example: "Мне вечно не везет" },
  ];

  const renderedDistortions = cognitiveDistortions.map((distortion) => (
    <div className="distortion-group" key={distortion.example}>
      <div className="distortion-check">
        <input type="checkbox" name={distortion.name} id={distortion.name} />
        <label htmlFor={distortion.name}>{distortion.name}</label>
      </div>
      <small>{distortion.example}</small>
    </div>
  ));

  return (
    <section className={`py-3`}>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="title">Ситуация/Триггер</label>
          <input
            type="text"
            placeholder="Что случилось?"
            id="title"
            name="title"
            onChange={(e) =>
              setNoteContent({ ...noteContent, title: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="post">Описание ситуации</label>
          <textarea
            placeholder="Изложите факты о ситуации"
            id="post"
            name="post"
            onChange={(e) =>
              setNoteContent({ ...noteContent, text: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="emotions">Описание ситуации</label>
          <select name="emotions" id="emotions">
            <option>Выберите самую яркую эмоцию</option>
            <option value="Anger">Гнев, возмущение</option>
            <option value="Anxiety">Страх, тревога</option>
            <option value="Depression">Грусть, разочарование</option>
            <option value="Guilt">Вина, сожаление</option>
            <option value="Shame">Стыд, смущение</option>
            <option value="Happiness">Радость, возбуждение</option>
            <option value="Love">Любовь, благодарность</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="emotePower">Описание ситуации</label>
          <input
            type="range"
            name="emotePower"
            id="emotePower"
            min="1"
            max="10"
          />
        </div>
        <div className="input-group">
          <label htmlFor="autoThoughts">Автоматические мысли</label>
          <textarea
            placeholder="Какие мысли крутятся в голове в отношении этой ситуации"
            id="autoThoughts"
            name="autoThoughts"
          />
        </div>
        <div className="input-group">
          <div className="distortions-description">
            <p>Когнитивные искажения</p>
            <small>
              Выберите те когнитивные искажения, которые вы нашли в своих
              автоматических мыслях:
            </small>
          </div>
          {renderedDistortions}
        </div>
        <div className="input-group">
          <label htmlFor="thoughtAnalyze">Анализ автоматических мыслей</label>
          <textarea
            placeholder="Какие есть аргументы за и против? Насколько эти мысли соотвествуют фактам, логике? Приносят ли они пользу или вредят?"
            id="thoughtAnalyze"
            name="thoughtAnalyze"
          />
        </div>
        <div className="input-group">
          <label htmlFor="rationalThoughts">Альтернативные мысли</label>
          <textarea
            placeholder="Как можно конструктивно думать о ситуации без когнитивных искажений, с пользой для себя и окружающих?"
            id="rationalThoughts"
            name="rationalThoughts"
          />
        </div>
        <Button> Сохранить запись </Button>
      </form>
    </section>
  );
};

export default createNote;
