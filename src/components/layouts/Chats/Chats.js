import { useContext, useEffect, useState } from 'react';
import styles from './Chats.module.scss';
import classNames from 'classnames/bind';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';
import { AuthContext } from '../../../context/AuthContext';
import { ChatContext } from '../../../context/ChatContext';
const cx = classNames.bind(styles);
function Chats({ click }) {
    const [chats, setChats] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);
    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
                setChats(doc.data());
            });
            return () => {
                unsub();
            };
        };
        currentUser.uid && getChats();
    }, [currentUser.uid]);
    const handleSelect = (u) => {
        dispatch({ type: 'CHANGE_USER', payload: u });
    };
    return (
        <div onClick={() => click()} className={cx('wrapper')}>
            {Object.entries(chats)
                ?.sort((a, b) => b[1].date - a[1].date)
                .map((chat) => (
                    <div onClick={() => handleSelect(chat[1].userInfo)} key={chat[0]} className={cx('friend-div')}>
                        <img className={cx('avatar')} src={chat[1].userInfo.photoURL} alt="avatar" />
                        <div className={cx('name-mess')}>
                            <p className={cx('name')}>{chat[1].userInfo.displayName}</p>
                            {chat[1].lastMessage?.text && <p className={cx('mess')}>{chat[1].lastMessage?.text}</p>}
                            {chat[1].lastMessage?.text === '' && (
                                <p className={cx('mess')}>-- A new image was sent --</p>
                            )}
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default Chats;
