import Chats from '../Chats/Chats';
import Friends from '../Friends/Friends';
import Navbar from '../Navbar/Navbar';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <Navbar />
            <Friends />
            <Chats />
        </div>
    );
}
export default Sidebar;
