import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../modules'
import { ITag } from '../interface/ITag'
import { addNote } from '../modules/notes'
import { INote, Note } from '../interface/INote'
import { Action } from 'redux'
import { addNoteInTag } from '../modules/tags'
import '../stylesheets/NoteForm.css'

type AddNoteFormProps = {
    visible: boolean
    setVisible: Function
}

const AddNoteForm: React.FC<AddNoteFormProps> = ({visible, setVisible}) => {

    const notesCount = useSelector((state: RootState) => state.notes.length) + 1;

    const [title, setTitle] = useState<string>(`노트 ${notesCount}`);
    const [content, setContent] = useState<string>(`노트 ${notesCount}`);
    const [tags, setTags] = useState<ITag[]>([]);
    const [backgroundColor, setBackgroundColor] = useState<string>('white');
    const [priority, setPriority] = useState<number>(100);

    const initForm = () => {
        setTitle(`노트 ${notesCount}`);
        setContent(`노트 ${notesCount}`);
        setTags([]);
        setBackgroundColor('white');
        setPriority(100);
    }

    useEffect(() => {
        initForm();
    }, [visible]);

    const dispatch = useDispatch();

    const onAddNote = (note: INote) => dispatch(addNote({note}) as Action);
    const onAddNoteInTag = (tag: ITag, note: INote) => dispatch(addNoteInTag({tag, note}) as Action);

    const onSubmit = () => {
        const note: INote = new Note(title, content, tags, backgroundColor, priority);
        onAddNote(note);
        for (const tag of tags) {
            onAddNoteInTag(tag, note);
        }
        setVisible(false);
    }

    return (
        <div className='backdrop' style={{zIndex: (visible ? 10 : -999), opacity: (visible ? 1 : 0)}}>
            <div className='note-form round-border'>
                <p id='form-type'>노트 생성하기</p>
                <input id='form-title' onChange={(e) => setTitle(e.target.value)} value={title}></input>
                <input id='form-content' onChange={(e) => setContent(e.target.value)} value={content}></input>
                <div>add-tag</div>
                <div>set-bg-color</div>
                <div>set-priority</div>
                <button id='form-submit' type='submit' onClick={onSubmit}>생성하기</button>
            </div>
        </div>
    )
}

export default AddNoteForm;