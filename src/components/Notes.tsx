import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { INote } from '../interface/INote';
import Header from './Header';
import '../stylesheets/Notes.css'
import '../stylesheets/Tags.css'
import '../stylesheets/Note.css'
import { ReactComponent as UnpinnedSvg } from '../svgs/star_FILL0_400.svg';
import { ReactComponent as PinnedSvg } from '../svgs/star_FILL1_500.svg';
import { ReactComponent as DeleteSvg } from '../svgs/delete_500.svg';
import { ReactComponent as DeleteForeverSvg } from '../svgs/delete_forever_500.svg';
import { Action } from 'redux';
import { deleteForeverNote, deleteNote, switchPin } from '../modules/notes';
import { useParams } from 'react-router-dom';

export enum NotesType {
    ALL, TAGGED, DELETED
}

type NotesProps = {
    notesType: NotesType
}

const Notes: React.FC<NotesProps> = ({notesType}) => {

    let notes = useSelector((state: RootState) => state.notes);
    let title = notesType===NotesType.DELETED ? 'Deleted Notes' : 'Notes';
    const selectedTags = [];

    // all: 삭제되지 않은 , deleted: 삭제된
    notes = notes.filter(note => note.deleted === (notesType === NotesType.DELETED));

    // 태그 있다면 필터
    const { selectedTagId } = useParams();
    const allTags = useSelector((state: RootState) => state.tags);
    const selectedTag = allTags.find(tag => tag.id === Number(selectedTagId));
    if (selectedTag) {
        notes = selectedTag.notes;
        title = selectedTag.name;
        selectedTags.push(selectedTag);
    }

    // 검색어 필터
    const [searchingWord, setSearchingWord] = useState<string>('');
    if (searchingWord.length === 0) {
        notes = notes.filter(note => note.content.includes(searchingWord) || note.title.includes(searchingWord));
    }

    // 고정된 노트
    const pinnedNotes = notes.filter(note => note.pinned);

    return (
        <div className='notes-container'>
            <Header title={title} notesType={notesType} selectedTags={selectedTags}></Header>
            <div className='notes-wrapper'>

                <div className='searching-bar-container'>
                    <input className='searching-bar half-round-border' placeholder='검색어를 입력하세요.' value={searchingWord} onChange={(e) => setSearchingWord(e.target.value)}></input>
                </div>

                <p className='sub-kind'>Pinned Notes <span>({pinnedNotes.length})</span></p>
                <ul className='notes'>
                    {pinnedNotes.map((note: INote) => (<Note key={note.id} notesType={notesType} note={note}/>))}
                </ul>

                <p className='sub-kind'>All Notes <span>({notes.length})</span></p>
                <ul className='notes'>
                    {notes.map((note: INote) => (<Note key={note.id} notesType={notesType} note={note}/>))}
                </ul>

            </div>
        </div>
    )
}

type NoteProps = {
    notesType: NotesType
    note: INote
}

const Note: React.FC<NoteProps> = ({notesType, note}) => {

    const dispatch = useDispatch();
    
    const onSwitchPin = (note: INote) => dispatch(switchPin({note}) as Action);

    const onDeleteNote = (note: INote) => dispatch(deleteNote({note}) as Action);
    const onDeleteForeverNote = (note: INote) => dispatch(deleteForeverNote({note}) as Action);

    return (
        <li className='note round-border spring-on-hover' style={{backgroundColor: note.backgroundColor}} key={note.id}>
            <p className='note-title'>{note.title}</p>
            <p className='note-content'>{note.content}</p>
            <ul className='tags' style={note.tags.length === 0 ? {display: 'none'} : {}}>
                {note.tags.map(tag => 
                    <li key={tag.id} className='tag round-border'>{tag.name}</li>
                )}
            </ul>
            <p className='note-date'>{formatString(note.date)}</p>
            <p className='note-priority'>{note.priority}</p>
            <div id='switch-pin-btn' onClick={() => onSwitchPin(note)}>
                {note.pinned ? <PinnedSvg className='pinned'/> : <UnpinnedSvg className='unpinned'/>}
            </div>
            <div className='etc-btns'>
                {
                    notesType===NotesType.DELETED 
                    ? <DeleteForeverSvg onClick={() => onDeleteForeverNote(note)} className='svg'/>
                    : <DeleteSvg onClick={() => onDeleteNote(note)} className='svg'/>
                }
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