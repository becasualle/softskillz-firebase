import { GetServerSideProps, NextPage } from 'next'
import React, { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Post, selectPosts, fetchAllPosts, setSearch, selectSearch, selectFilteredPosts } from '../../features/posts/postsSlice'
import store from "../../app/store";
import SubHeader from "../../layout/header/SubHeader";
import PostCard from "../../features/posts/PostCard";
import PostsGrid from "../../features/posts/PostsGrid";
import { useGlobalContext } from '../../context';
import { useRouter } from 'next/router';
import { getDocs, collection } from 'firebase/firestore';
import { auth, db } from '../../firebase-config';
import { Note } from './create-note';

interface Props {
    posts: Post[];
}

const Posts: NextPage<Props> = ({ posts }) => {
    const dispatch = useAppDispatch();
    const [searchText, setSearchText] = useState('');
    const [notes, setNotes] = useState<Note[]>([]);

    const { isAuth } = useGlobalContext();
    const router = useRouter();

    const notesCollectionRef = collection(db, 'notes');
    // TODO: вынести стейт и функцию глобально
    // TODO: показывать текст "Идет загрузка" пока контент грузится и текст "У вас пока нет записей", когда authUserNotes пустой
    const getNotes = async () => {
        const data = await getDocs(notesCollectionRef);
        const authUserNotes = data.docs.filter(doc => doc.data().author.id === auth.currentUser.uid);
        const notes = authUserNotes.map(
            (doc) => ({
                ...doc.data(), id: doc.id
            } as Note)
        )
        setNotes(notes);
    }

    useEffect(() => {
        if (!isAuth && !localStorage.getItem('isAuth')) {
            router.push('/login')
        }

        getNotes();

    }, [])

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
            {notes.length ? <PostsGrid posts={notes} /> : <div>Нет результатов</div>}
            {/* {filteredPosts.length ? <PostsGrid posts={filteredPosts} /> : <div>Нет результатов</div>} */}
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