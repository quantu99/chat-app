import { useEffect, useState } from 'react';
import Chat from '../../components/layouts/Chat/Chat';
import Sidebar from '../../components/layouts/Sidebar/Sidebar';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function Home() {
    const [chat, setChat] = useState(false);
    const [haveChat, setHaveChat] = useState(false);
    const handleClick = () => {
        setChat(true);
    };
    const handleBack = () => {
        setChat(false);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('grid')}>
                    <div className={cx('row', 'no-gutters')}>
                        <div className={cx('col', 'l-4', haveChat && !chat ? 'c-12' : 'c-0')}>
                            <Sidebar click={handleClick} />
                        </div>
                        <div className={cx('col', 'l-8', chat ? 'c-12' : 'c-0')}>
                            <Chat back={handleBack} haveChat={setHaveChat} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Home;
