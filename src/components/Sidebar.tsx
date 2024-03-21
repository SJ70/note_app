import { Link } from 'react-router-dom';
import '../stylesheets/Sidebar.css'

const Sidebar = () => {
    return (
        <div className='side-bar'>
            <p className='title'>Note App</p>
            <Link to={'/'}>Notes</Link>
            <ul className='tags'>
                <Link to={'/tag=:tag'}>aaa</Link>
            </ul>
        </div>
    )
}

export default Sidebar;