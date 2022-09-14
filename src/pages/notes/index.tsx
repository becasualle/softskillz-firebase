import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import SubHeader from "../../layout/header/SubHeader";
import PostsGrid from "../../features/posts/PostsGrid";
import { useGlobalContext } from '../../context';
import { useRouter } from 'next/router';
import { auth } from '../../firebase-config';
import { fetchAllNotes, selectNotes } from '../../features/posts/notesSlice';

interface Props {
}

const Posts: NextPage<Props> = () => {
    const [searchText, setSearchText] = useState('');
    const { isAuth } = useGlobalContext();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const notes = useAppSelector(selectNotes);

    useEffect(() => {
        if (!isAuth && !localStorage.getItem('isAuth')) {
            router.push('/login')
        } else {
            dispatch(fetchAllNotes());
        }
    }, [])

    const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearchText(e.target.value);
    }

    const filteredNotes = notes.filter((note) => {
        return note.author.id === auth.currentUser.uid && note.title.toLowerCase().includes(searchText.toLowerCase());
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