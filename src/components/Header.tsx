import { useState } from 'react'
import { ITag } from '../interface/ITag'
import AddNoteForm from './AddNoteForm'
import '../stylesheets/Header.css'

type HeaderProps = {
    title: string
    selectedTag: ITag | undefined
}

const Header: React.FC<HeaderProps> = (props) => {

    const [showAddNoteForm, setShowAddNoteForm] = useState<boolean>(false);

    return (
        <header>
            <p className='header-title'>{props.title}</p>
            <button className='round-border add-note-btn' onClick={() => setShowAddNoteForm(true)}>+</button>
            <AddNoteForm visible={showAddNoteForm} setVisible={setShowAddNoteForm}/>
        </header>
    )
}

export default Header