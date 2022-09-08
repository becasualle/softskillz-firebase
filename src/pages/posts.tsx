import { GetServerSideProps, NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Post, selectPosts, fetchAllPosts, setSearch, selectSearch, selectFilteredPosts } from '../features/posts/postsSlice'
import store from "../app/store";
import SubHeader from "../layout/header/SubHeader";
import PostCard from "../features/posts/PostCard";
import PostsGrid from "../features/posts/PostsGrid";

interface Props {
    posts: Post[];
}

const Posts: NextPage<Props> = ({ posts }) => {
    const dispatch = useAppDispatch();
    const [searchText, setSearchText] = useState('');

    const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearchText(e.target.value);
    }

    const filteredPosts = posts.filter(({ title }) => {
        return title.toLowerCase().includes(searchText.toLowerCase());
    })

    return (
        <section className='posts'>
            <SubHeader title="Читайте актуальные материалы" />
            <input type="text" value={searchText} onChange={handleSearch} />
            {filteredPosts.length ? <PostsGrid posts={filteredPosts} /> : <div>Нет результатов</div>}
        </section>
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