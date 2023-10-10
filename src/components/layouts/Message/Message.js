import styles from './Message.module.scss';
import classNames from 'classnames/bind';
import { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { ChatContext } from '../../../context/ChatContext';
const cx = classNames.bind(styles);
function Message({ message }) {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    const isOwner = () => {
        return message.senderId === currentUser.uid;
    };
    const ref = useRef();
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [message]);
    return (
        //  'owner'
        <div ref={ref} className={cx('wrapper', isOwner() ? 'owner' : '')}>
            <div className={cx('info')}>
                <img
                    className={cx('avatar')}
                    alt="avatar"
                    src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL}
                />
                <p className={cx('date')}>Just now</p>
            </div>
            <div className={cx('content-div', isOwner() ? 'content-div-owner' : '')}>
                {!message.text == '' && (
                    <div className={cx('content-box', isOwner() ? 'content-box-owner' : '')}>
                        <p className={cx('content')}>{message?.text}</p>
                    </div>
                )}
                {message?.img && (
                    <img
                        onClick={() => {
                            window.open(message?.img);
                        }}
                        className={cx('image')}
                        alt="content"
                        src={message?.img}
                    />
                )}
            </div>
            {/* <div className={cx('content-div', 'content-div-owner')}>
                <div className={cx('content-box', 'content-box-owner')}>
                    <p className={cx('content')}>Hello there</p>
                </div>
                <img
                    className={cx('image')}
                    src="https://static.vecteezy.com/system/resources/previews/004/773/704/original/a-girl-s-face-with-a-beautiful-smile-a-female-avatar-for-a-website-and-social-network-vector.jpg"
                />
            </div> */}
        </div>
    );
}

export default Message;
