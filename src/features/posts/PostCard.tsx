import { NextPage } from "next";
import Link from "next/link";
import { Post } from "./postsSlice";
import styles from "./PostCard.module.scss"
import Image from 'next/image';
import { deleteNote, Note } from "./notesSlice";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useAppDispatch } from "../../app/hooks";

interface Props {
    post: Note
}

const PostCard: NextPage<Props> = ({ post }) => {
    const dispatch = useAppDispatch();

    const deletePost = async (id) => {
        const postDoc = doc(db, 'notes', id);
        await deleteDoc(postDoc);
    }

    return (
        <article className={styles.post}>
            <div className={styles["post-image"]}>
                <Link href={`/posts/${encodeURIComponent(post.id)}`} >
                    <div>
                        <Image
                            src="https://images.unsplash.com/photo-1662411716147-3f6f6cc32399?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                            alt="post image"
                            width={1152}
                            height={767}
                            className="link"
                        />
                    </div>
                </Link>
            </div>
            <div className={styles["post-text"]}>
                <Link href={`/posts/${encodeURIComponent(post.id)}`}>
                    <h3 className="text__title link">{post.title}</h3>
                </Link>
                <p className="text__para">{post.text}</p>
            </div>
            <div className="post-actions">
                <button onClick={() => { dispatch(deleteNote(post.id)) }}>delete</button>
            </div>
        </article >
    )
}

export default PostCard;