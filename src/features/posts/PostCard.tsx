import { NextPage } from "next";
import Link from "next/link";
import styles from "./PostCard.module.scss";
import { deleteNote, Note } from "./notesSlice";
import { useAppDispatch } from "../../app/hooks";
import Button from "../../components/Button";

interface Props {
  post: Note;
}

const PostCard: NextPage<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const cardText =
    post.description.length > 140
      ? post.description.slice(0, 141) + "..."
      : post.description;

  return (
    <article className={styles.post}>
      <div className={styles["post-text"]}>
        <Link href={`/notes/${encodeURIComponent(post.id)}`}>
          <h3 className="post-text__title link">{post.title}</h3>
        </Link>
        <p className={styles["post-text__para"]}>{cardText}</p>
      </div>
      <div className={styles["post-actions"]}>
        {/* TODO: обновить страницу редактирования под новую форму и раскомментить кнопку */}
        {/* <Button>
          <Link href={`/notes/edit/${encodeURIComponent(post.id)}`}>
            редактировать
          </Link>
        </Button> */}
        <Button
          type="danger"
          onClick={() => {
            dispatch(deleteNote(post.id));
          }}
        >
          удалить
        </Button>
      </div>
    </article>
  );
};

export default PostCard;
