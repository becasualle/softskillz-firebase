import { NextPage } from "next";
import { Post } from "./postsSlice";
import styles from "./PostCard.module.scss"

interface Props {
    post: Post
}

const PostCard: NextPage<Props> = ({ post }) => {
    return (
        <article className={styles.post}>
            <div className={styles["post-text"]}>
                <h3 className="text__title">{post.title}</h3>
                <p className="text__para">{post.body}</p>
            </div>
        </article>
    )
}

export default PostCard;