import { NextPage } from "next";
import Link from "next/link";
import { Post } from "./postsSlice";
import styles from "./PostCard.module.scss"
import Image from 'next/image';
import { deleteNote, Note } from "./notesSlice";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useAppDispatch } from "../../app/hooks";
import Button from "../../components/Button";

interface Props {
    post: Note
}

const PostCard: NextPage<Props> = ({ post }) => {
    const dispatch = useAppDispatch();
    const cardText = post.text.length > 140 ? post.text.slice(0, 141) + '...' : post.text;

    return (
        <article className={styles.post}>
            <div className={styles["post-text"]}>
                <Link href={`/posts/${encodeURIComponent(post.id)}`}>
                    <h3 className="post-text__title link">{post.title}</h3>
                </Link>
                <p className={styles["post-text__para"]}>{cardText}</p>
            </div>
            <div className="post-actions">
                <Button >
                    <Link href={`/notes/edit/${encodeURIComponent(post.id)}`}>редактировать</Link>
                </Button>
                <Button type="hollow" onClick={() => { dispatch(deleteNote(post.id)) }}>удалить</Button>
            </div>
        </article >
    )
}

export default PostCard;