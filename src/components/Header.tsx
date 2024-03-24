import { useState } from 'react'
import { ITag } from '../interface/ITag'
import AddNoteForm from './AddNoteForm'
import '../stylesheets/Header.css'

type HeaderProps = {
    title: string
    selectedTag: ITag | undefined
}

const Header: React.FC<HeaderProps> = ({title, selectedTag}) => {

    const [showAddNoteForm, setShowAddNoteForm] = useState<boolean>(false);

    return (
        <header>
            <p className='header-title'>{title}</p>
            <button className='round-border add-note-btn' onClick={() => setShowAddNoteForm(true)}>+</button>
            <AddNoteForm initialTags={selectedTag ? [selectedTag] : []} visible={showAddNoteForm} setVisible={setShowAddNoteForm}/>
        </header>
    )
}

export default Header