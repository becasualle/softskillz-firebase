import { GetServerSideProps, NextPage } from 'next'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Post, selectPosts, fetchAllPosts } from '../features/posts/postsSlice'
import store from "../app/store";

interface Props {
    posts: Post[];
}

const Posts: NextPage<Props> = ({ posts }) => {
    const dispatch = useAppDispatch();

    return (
        <div>
            <h1>Posts</h1>
            {posts.length && posts.map(post => (
                <div key={post.id}>{post.title}</div>
            ))}
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    await store.dispatch(fetchAllPosts());
    const posts = store.getState().posts.posts;
    return {
        props: {
            posts,
        }
    }
}

export default Posts