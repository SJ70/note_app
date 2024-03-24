import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { INote } from '../interface/INote';
import Header from './Header';
import '../stylesheets/Notes.css'
import '../stylesheets/Note.css'
import { ReactComponent as UnpinnedSvg } from '../svgs/star_FILL0_400.svg';
import { ReactComponent as PinnedSvg } from '../svgs/star_FILL1_500.svg';
import { Action } from 'redux';
import { switchPin } from '../modules/notes';
import { useParams } from 'react-router-dom';

const Notes = () => {

    const { selectedTagId } = useParams();

    const allTags = useSelector((state: RootState) => state.tags);
    const allNotes = useSelector((state: RootState) => state.notes);

    const selectedTag = allTags.find(tag => tag.id === Number(selectedTagId));
    const selectedNotes = selectedTag ? selectedTag.notes : allNotes;
    const title = selectedTag ? selectedTag.name : 'Notes';

    const [searchingWord, setSearchingWord] = useState<string>('');
    const searchedNotes = searchingWord.length === 0 ? selectedNotes : selectedNotes.filter(note => note.content.includes(searchingWord) || note.title.includes(searchingWord));

    const pinnedNotes = searchedNotes.filter(note => note.pinned);

    return (
        <div className='notes-container'>
            <Header title={title} selectedTag={selectedTag}></Header>
            <div className='notes-wrapper'>

                <div className='searching-bar-container'>
                    <input className='searching-bar half-round-border' placeholder='검색어를 입력하세요.' value={searchingWord} onChange={(e) => setSearchingWord(e.target.value)}></input>
                </div>

                <p className='sub-kind'>Pinned Notes <span>({pinnedNotes.length})</span></p>
                <ul className='notes'>
                    {pinnedNotes.map((note: INote) => (<Note key={note.id} note={note}/>))}
                </ul>

                <p className='sub-kind'>All Notes <span>({searchedNotes.length})</span></p>
                <ul className='notes'>
                    {searchedNotes.map((note: INote) => (<Note key={note.id} note={note}/>))}
                </ul>

            </div>
        </div>
    )
}

type NoteProps = {
    note: INote
}

const Note: React.FC<NoteProps> = ({note}) => {

    const dispatch = useDispatch();
    
    const onSwitchPin = (note: INote) => dispatch(switchPin({note}) as Action);

    return (
        <li className='note round-border spring-on-hover' style={{backgroundColor: note.backgroundColor}} key={note.id}>
            <p className='note-title'>{note.title}</p>
            <p className='note-content'>{note.content}</p>
            <ul className='note-tags' style={note.tags.length === 0 ? {display: 'none'} : {}}>
                {note.tags.map(tag => 
                    <li key={tag.id} className='note-tag round-border'>{tag.name}</li>
                )}
            </ul>
            <p className='note-date'>{formatString(note.date)}</p>
            <p className='note-priority'>{note.priority}</p>
            <div id='switch-pin-btn' onClick={() => onSwitchPin(note)}>
                {note.pinned ? <PinnedSvg className='pinned'/> : <UnpinnedSvg className='unpinned'/>}
            </div>
        </li>
    )
}   

const formatString = (date: Date) => {
    const d = new Date(date);

    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    
    let hour = d.getHours();
    const minute = d.getMinutes().toString().padStart(2, '0');

    const ampm = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12;
    hour = hour ? hour : 12; 

    const hourFormatted = hour.toString().padStart(2, '0');

    return `${year}/${month}/${day} ${hourFormatted}:${minute} ${ampm}`;
}

export default Notes;