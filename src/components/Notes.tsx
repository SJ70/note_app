import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { INote } from '../interface/INote';
import Header from './Header';
import { ITag } from '../interface/ITag';
import '../stylesheets/Notes.css'
import '../stylesheets/Note.css'
import { ReactComponent as UnpinnedSvg } from '../svgs/star_FILL0_400.svg';
import { ReactComponent as PinnedSvg } from '../svgs/star_FILL1_500.svg';
import { Action } from 'redux';
import { switchPin } from '../modules/notes';

type NotesProps = {
    selectedTag: ITag | null
}

const Notes: React.FC<NotesProps> = (props) => {

    const notes = useSelector((state: RootState) => state.notes);
    const title = props.selectedTag ? props.selectedTag.name : 'Notes';

    const pinnedNotes = notes.filter(note => note.pinned);

    return (
        <div className='notes-container'>
            <Header title={title} selectedTag={props.selectedTag}></Header>
            <div className='notes-wrapper'>

                <p className='sub-kind'>Pinned Notes <span>({pinnedNotes.length})</span></p>
                <ul className='notes'>
                    {pinnedNotes.map((note: INote) => (<Note key={note.id} note={note}/>))}
                </ul>

                <p className='sub-kind'>All Notes <span>({notes.length})</span></p>
                <ul className='notes'>
                    {notes.map((note: INote) => (<Note key={note.id} note={note}/>))}
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
            <ul className='note-tags'>
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