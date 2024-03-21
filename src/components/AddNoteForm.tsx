import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../modules'
import { ITag } from '../interface/ITag'
import { addNote } from '../modules/notes'
import { INote, Note } from '../interface/INote'
import { Action } from 'redux'
import { addNoteInTag } from '../modules/tags'
import '../stylesheets/NoteForm.css'
import SetTagsForm from './SetTagsForm'
import '../stylesheets/Animation.css'

type AddNoteFormProps = {
    visible: boolean
    setVisible: Function
}

type BackgroundColor = {
    value: string,
    name: string,
}

const backgroundColors: BackgroundColor[] = [
    {value: 'white', name: 'White'},
    {value: '#ffdddd', name: 'Red'},
    {value: '#ddfff0', name: 'Green'},
    {value: '#ddf0ff', name: 'Blue'},
];

const AddNoteForm: React.FC<AddNoteFormProps> = ({visible, setVisible}) => {

    const notesCount = useSelector((state: RootState) => state.notes.length) + 1;

    const [title, setTitle] = useState<string>(`노트 ${notesCount}`);
    const [content, setContent] = useState<string>(`노트 ${notesCount}`);
    const [tags, setTags] = useState<ITag[]>([]);
    const [showSetTagsForm, setShowSetTagsForm] = useState<boolean>(false);
    const [backgroundColor, setBackgroundColor] = useState<string>(backgroundColors[0].value);
    const [priority, setPriority] = useState<number>(100);

    const initForm = () => {
        setTitle(`노트 ${notesCount}`);
        setContent(`노트 ${notesCount}`);
        setTags([]);
        setShowSetTagsForm(false);
        setBackgroundColor(backgroundColors[0].value);
        setPriority(100);
    }

    useEffect(() => {
        initForm();
    }, [visible]);

    const dispatch = useDispatch();

    const onAddNote = (note: INote) => dispatch(addNote({note}) as Action);

    const onSubmit = () => {
        if (!visible) return;
        const note: INote = new Note(title, content, tags, backgroundColor, priority);
        onAddNote(note);
        setVisible(false);
    }

    return (
        <div>
            <div className={`backdrop ${visible ? 'appear' : 'disappear'}`}>
                <div className='note-form round-border'>
                    <p id='form-type'>노트 생성하기</p>
                    <input id='form-title' onChange={(e) => setTitle(e.target.value)} value={title}></input>
                    <input id='form-content' onChange={(e) => setContent(e.target.value)} value={content} style={{backgroundColor: `${backgroundColor}`}}></input>

                    <div className='form-set-tags'>
                        <button onClick={() => setShowSetTagsForm(true)}>태그 수정</button>
                    </div>
                    <div>
                        배경색
                        <select value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)}>
                            {backgroundColors.map(bgc => {
                                return (
                                    <option key={bgc.name} value={bgc.value}>{bgc.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div>set-priority</div>
                    
                    <button id='form-submit' type='submit' onClick={onSubmit}>생성하기</button>
                </div>
            </div>
            <SetTagsForm visible={showSetTagsForm} setVisible={setShowSetTagsForm} selectedTags={tags} setSelectedTags={setTags}/>
        </div>
    )
}

export default AddNoteForm;