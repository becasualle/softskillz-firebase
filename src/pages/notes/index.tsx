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
import { getNotes } from '../api/notes';

interface Props {
}

const Posts: NextPage<Props> = () => {
    const [searchText, setSearchText] = useState('');
    const [userNotes, setUserNotes] = useState<Note[]>([]);
    const { isAuth } = useGlobalContext();
    const router = useRouter();

    useEffect(() => {
        if (!isAuth && !localStorage.getItem('isAuth')) {
            router.push('/login')
        } else {
            getNotes()
                .then(notes => notes.filter(note => note.author.id === auth.currentUser.uid))
                .then(userNotes => setUserNotes(userNotes))
        }

    }, [])

    const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearchText(e.target.value);
    }

    const filteredNotes = userNotes.filter(({ title }) => {
        return title.toLowerCase().includes(searchText.toLowerCase());
    })

    return (
        <section className='posts'>
            <SubHeader title="Читайте актуальные материалы" />
            <input type="text" value={searchText} onChange={handleSearch} />
            {filteredNotes.length ? <PostsGrid posts={filteredNotes} /> : <div>Нет результатов</div>}
        </section>
    )
}

// export const getServerSideProps: GetServerSideProps = async () => {
//     const notes = await getNotes();
//     return {
//         props: {
//             notes
//         }
//     }
// }

export default Posts