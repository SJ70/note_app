import { Link } from 'react-router-dom';
import '../stylesheets/Sidebar.css'
import { useSelector } from 'react-redux';
import { RootState } from '../modules';
import { ITag } from '../interface/ITag';
import { ReactComponent as TagSvg } from '../svgs/sell_500.svg';
import { ReactComponent as NotesSvg } from '../svgs/note_stack_500.svg';
import { ReactComponent as TrashSvg } from '../svgs/delete_500.svg';
import { useState } from 'react';

export const ALL_NOTES_PAGE_ID = -1;
export const DELETED_NOTES_PAGE_ID = -2;

const Sidebar = () => {

    const tags: ITag[] = useSelector((state: RootState) => state.tags);

    const [selectedPageId, setSelectedPageId] = useState<Number>(ALL_NOTES_PAGE_ID);
    console.log(selectedPageId)

    return (
        <div className='side-bar'>
            <p className='side-bar-title'>Note App</p>
            <div>
                <Link className={`${selectedPageId===ALL_NOTES_PAGE_ID ? 'selected-page' : ''} side-bar-btn`} onClick={() => setSelectedPageId(ALL_NOTES_PAGE_ID)} to={'/'}>
                    <NotesSvg className='svg'/>
                    <span>Notes</span>
                </Link>
            </div>
            <ul className='side-bar-tags'>
                {tags.map(tag => (
                    <li>
                        <Link className={`${selectedPageId===tag.id ? 'selected-page' : ''} side-bar-btn`} onClick={() => setSelectedPageId(tag.id)} key={tag.id} to={`/tag/${tag.id}`}> 
                            <TagSvg className='svg'/>
                            <span>{tag.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            <div>
                <Link className={`${selectedPageId===DELETED_NOTES_PAGE_ID ? 'selected-page' : ''} side-bar-btn`} onClick={() => setSelectedPageId(DELETED_NOTES_PAGE_ID)} to={'/deleted'}>
                    <TrashSvg className='svg'/>
                    <span>Deleted</span>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar;