import Message from '../Message/Message';
import styles from './Messages.module.scss';
import classNames from 'classnames/bind';
import { ChatContext } from '../../../context/ChatContext';
import { useContext, useEffect, useState } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../../firebase';

const cx = classNames.bind(styles);
function Messages() {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);
    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });
        return () => {
            unSub();
        };
    }, [data.chatId]);
    console.log(messages);
    return (
        <div className={cx('wrapper')}>
            {messages.map((message) => (
                <Message key={message.id} message={message} />
            ))}
        </div>
    );
}

export default Messages;
