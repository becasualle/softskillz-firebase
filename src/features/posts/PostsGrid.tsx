import { NextPage } from "next";
import React from "react";
import { Post } from "./postsSlice";
import { Note } from "./notesSlice";
import PostCard from "./PostCard";
import styles from "./PostsGrid.module.scss";

interface Props {
  posts: Note[];
}
const PostsGrid: NextPage<Props> = ({ posts }) => {
  return (
    <section className={styles.posts}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
};

export default PostsGrid;
