import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';
import { INote } from '../interface/INote';
import Header from './Header';
import { ITag } from '../interface/ITag';
import '../stylesheets/Notes.css'
import '../stylesheets/Note.css'

type NotesProps = {
    selectedTag: ITag | null
}

const Notes: React.FC<NotesProps> = (props) => {

    const notes = useSelector((state: RootState) => state.notes);
    const title = props.selectedTag ? props.selectedTag.name : 'Notes';

    return (
        <div className='notes-container'>
            <Header title={title} selectedTag={props.selectedTag}></Header>
            <div className='notes-wrapper'>
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
    return (
        <li className='note round-border spring-on-hover' style={{backgroundColor: note.backgroundColor}} key={note.id}>
            <p className='note-title'>{note.title}</p>
            <p className='note-content'>{note.content}</p>
            <ul className='note-tags'>
                {note.tags.map(tag => 
                    <li className='note-tag round-border'>{tag.name}</li>
                )}
            </ul>
            <p className='note-date'>{formatString(note.date)}</p>
            <p className='note-priority'>{note.priority}</p>
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