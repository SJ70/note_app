import { useState } from 'react'
import { ITag } from '../interface/ITag'
import AddNoteForm from './AddNoteForm'
import '../stylesheets/Header.css'
import { NotesType } from './Notes'

type HeaderProps = {
    title: string
    notesType: NotesType
    selectedTags: ITag[]
}

const Header: React.FC<HeaderProps> = ({title, notesType, selectedTags}) => {

    const [showAddNoteForm, setShowAddNoteForm] = useState<boolean>(false);

    return (
        <header>
            <p className='header-title'>{title}</p>
            {notesType === NotesType.DELETED ? <></> : <button className='round-border add-note-btn' onClick={() => setShowAddNoteForm(true)}>+</button>}
            {notesType === NotesType.DELETED ? <></> : <AddNoteForm initialTags={selectedTags} visible={showAddNoteForm} setVisible={setShowAddNoteForm}/>}
        </header>
    )
}

export default Header