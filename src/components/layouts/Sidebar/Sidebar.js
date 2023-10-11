import Chats from '../Chats/Chats';
import Friends from '../Friends/Friends';
import Navbar from '../Navbar/Navbar';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function Sidebar({ click }) {
    return (
        <div className={cx('wrapper')}>
            <Navbar />
            <Friends />
            <Chats click={click} />
        </div>
    );
}
export default Sidebar;
