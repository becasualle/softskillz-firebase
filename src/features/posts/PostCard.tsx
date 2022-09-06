import { NextPage } from "next";
import Link from "next/link";
import { Post } from "./postsSlice";
import styles from "./PostCard.module.scss"
import Image from 'next/image';

interface Props {
    post: Post
}

const PostCard: NextPage<Props> = ({ post }) => {
    return (
        <article className={styles.post}>
            <div className={styles["post-image"]}>
                <Link href={`/posts/${encodeURIComponent(post.id)}`} >
                    <Image
                        src="https://images.unsplash.com/photo-1662411716147-3f6f6cc32399?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                        alt="post image"
                        width={1152}
                        height={767}
                        className="link"
                    />
                </Link>
            </div>
            <div className={styles["post-text"]}>
                <Link href={`/posts/${encodeURIComponent(post.id)}`}>
                    <h3 className="text__title link">{post.title}</h3>
                </Link>
                <p className="text__para">{post.body}</p>
            </div>
        </article>
    )
}

export default PostCard;