import { GetServerSideProps, NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Post, selectPosts, fetchAllPosts, setSearch, selectSearch, selectFilteredPosts } from '../features/posts/postsSlice'
import store from "../app/store";
import Header from "../layout/header/Header";
import PostCard from "../features/posts/PostCard";

interface Props {
    posts: Post[];
}

const Posts: NextPage<Props> = ({ posts }) => {
    const dispatch = useAppDispatch();
    const [searchText, setSearchText] = useState('');

    // more re-renders but can be useful in some cases:
    // const [filteredPosts, setFilteredPosts] = useState(posts);
    // useEffect(() => {
    //     const filteredBySearch = posts.filter(({ title }) => {
    //         return title.toLowerCase().includes(searchText.toLowerCase());
    //     });
    //     setFilteredPosts(filteredBySearch);
    // }, [searchText]);

    const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearchText(e.target.value);
    }

    const filteredPosts = posts.filter(({ title }) => {
        return title.toLowerCase().includes(searchText.toLowerCase());
    })

    const renderedPosts = filteredPosts.map(post => (
        <PostCard key={post.id} post={post} />
    ))

    return (
        <div>
            <h1>Test Title</h1>
            <Header title="Читайте актуальные материалы" />
            <input type="text" value={searchText} onChange={handleSearch} />
            {filteredPosts.length ? renderedPosts : <div>Нет результатов</div>}
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    await store.dispatch(fetchAllPosts());
    const posts = store.getState().posts.posts;
    return {
        props: {
            posts
        }
    }
}

export default Posts