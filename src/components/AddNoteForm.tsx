import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../modules'
import { ITag } from '../interface/ITag'
import { addNote } from '../modules/notes'
import { INote, Note } from '../interface/INote'
import { Action } from 'redux'
import { addNoteInTag } from '../modules/tags'
import '../stylesheets/Form.css'
import '../stylesheets/NoteForm.css'
import SetTagsForm from './SetTagsForm'
import '../stylesheets/Animation.css'
import { ReactComponent as CloseSvg } from '../svgs/close_700.svg';

type AddNoteFormProps = {
    initialTags: ITag[]
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

const AddNoteForm: React.FC<AddNoteFormProps> = ({initialTags, visible, setVisible}) => {

    const notesCount = useSelector((state: RootState) => state.notes.length) + 1;

    const [title, setTitle] = useState<string>(`노트 ${notesCount}`);
    const [content, setContent] = useState<string>(`노트 ${notesCount}`);
    const [tags, setTags] = useState<ITag[]>(initialTags);
    const [showSetTagsForm, setShowSetTagsForm] = useState<boolean>(false);
    const [backgroundColor, setBackgroundColor] = useState<string>(backgroundColors[0].value);
    const [priority, setPriority] = useState<number>(100);

    const initForm = () => {
        setTitle(`노트 ${notesCount}`);
        setContent(`노트 ${notesCount}`);
        setTags(initialTags);
        setShowSetTagsForm(false);
        setBackgroundColor(backgroundColors[0].value);
        setPriority(100);
    }

    useEffect(() => {
        initForm();
    }, [visible]);

    const dispatch = useDispatch();

    const onAddNote = (note: INote) => dispatch(addNote({note}) as Action);
    const onAddNoteInTag = (tag: ITag, note: INote) => dispatch(addNoteInTag({tag, note}) as Action);

    const onSubmit = () => {
        if (!visible) return;
        const note: INote = new Note(title, content, tags, backgroundColor, priority);
        onAddNote(note);
        for (const tag of tags) {
            onAddNoteInTag(tag, note);
        }
        setVisible(false);
    }

    const onDeleteTag = (tag: ITag) => {
        setTags(tags.filter(t => t !== tag));
    }

    return (
        <div>
            <div className={`backdrop ${visible ? 'appear' : 'disappear'}`}>
                <div className='note-form form round-border'>
                    <p className='form-title'>노트 생성하기</p>
                    <input id='form-title' className='half-round-border' onChange={(e) => setTitle(e.target.value)} value={title}></input>
                    <textarea id='form-content' className='half-round-border' onChange={(e) => setContent(e.target.value)} value={content} style={{backgroundColor: `${backgroundColor}`}}></textarea>

                    <ul className='tags' style={tags.length === 0 ? {display: 'none'} : {}}>
                        {tags.map(tag => 
                            <li key={tag.id} className='tag round-border'>
                                <span>{tag.name}</span>
                                <CloseSvg className='delete-tag-btn' onClick={() => onDeleteTag(tag)}/>
                            </li>
                        )}
                    </ul>

                    <div className='form-settings'>
                        <div className='form-set-tags'>
                            <button className='half-round-border spring-on-hover' onClick={() => setShowSetTagsForm(true)}>태그 수정</button>
                        </div>
                        <div>
                            <span className='form-set-type'>배경색</span>
                            <select value={backgroundColor} className='half-round-border' onChange={(e) => setBackgroundColor(e.target.value)}>
                                {backgroundColors.map(bgc => {
                                    return (
                                        <option key={bgc.name} value={bgc.value}>{bgc.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div>
                            <span className='form-set-type'>우선순위</span>
                            <select value={priority} className='half-round-border' onChange={(e) => setPriority(Number(e.target.value))}>
                                <option key={100} value={100}>High</option>
                                <option key={50} value={50}>Normal</option>
                                <option key={0} value={0}>Low</option>
                            </select>
                        </div>
                    </div>
                    
                    <button id='form-submit' type='submit' className='half-round-border spring-on-hover' onClick={onSubmit}>생성하기</button>
                    <CloseSvg className='close-btn' onClick={() => setVisible(false)}/>
                </div>
            </div>
            <SetTagsForm visible={showSetTagsForm} setVisible={setShowSetTagsForm} selectedTags={tags} setSelectedTags={setTags}/>
        </div>
    )
}

export default AddNoteForm;