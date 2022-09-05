import { GetServerSideProps, NextPage } from 'next'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import makeStore from '../app/store';
import { Post, selectPosts, fetchAllPosts } from '../features/posts/postsSlice'

interface Props {
    posts?: Post[];
    message?: string;
}

const Posts: NextPage<Props> = () => {
    const posts = useAppSelector(selectPosts);
    console.log({ posts })
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
    const store = makeStore();
    await store.dispatch(fetchAllPosts());

    return {
        props: {
            initialState: store.getState(),
        }
    }
}



export default Posts