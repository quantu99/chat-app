import Chat from '../../components/layouts/Chat/Chat';
import Sidebar from '../../components/layouts/Sidebar/Sidebar';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Sidebar />
                <Chat />
            </div>
        </div>
    );
}
export default Home;
