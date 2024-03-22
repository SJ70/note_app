import { Link } from 'react-router-dom';
import '../stylesheets/Sidebar.css'
import { useSelector } from 'react-redux';
import { RootState } from '../modules';
import { ITag } from '../interface/ITag';
import { ReactComponent as TagSvg } from '../svgs/sell_500.svg';
import { ReactComponent as NotesSvg } from '../svgs/note_stack_500.svg';

const Sidebar = () => {

    const tags: ITag[] = useSelector((state: RootState) => state.tags);

    return (
        <div className='side-bar'>
            <p className='side-bar-title'>Note App</p>
            <Link className='side-bar-btn' to={'/'}>
                <NotesSvg className='svg'/>
                <span>Notes</span>
            </Link>
            <ul className='side-bar-tags'>
                {tags.map(tag => (
                    <li>
                        <Link className='side-bar-btn' key={tag.id} to={`/tag=${tag.id}`}>
                            <TagSvg className='svg'/>
                            <span>{tag.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar;