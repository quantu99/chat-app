import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Input.module.scss';
import classNames from 'classnames/bind';
import { faImage, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { ChatContext } from '../../../context/ChatContext';
import { arrayUnion, updateDoc, doc, Timestamp, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../../firebase';
import { v4 as uuid } from 'uuid';
const cx = classNames.bind(styles);
function Input() {
    const [text, setText] = useState('');
    const [img, setImg] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    const handleSend = async () => {
        if (img) {
            const storageRef = await ref(storage, uuid());
            const uploadTask = uploadBytesResumable(storageRef, img);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {},
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, 'chats', data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text: text ? text : null,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL,
                            }),
                        });
                    });
                },
            );
        } else {
            await updateDoc(doc(db, 'chats', data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
            [data.chatId + '.lastMessage']: {
                text,
            },
            [data.chatId + '.date']: serverTimestamp(),
        });
        await updateDoc(doc(db, 'userChats', data.user.uid), {
            [data.chatId + '.lastMessage']: {
                text,
            },
            [data.chatId + '.date']: serverTimestamp(),
        });
        setText('');
        setImg(null);
    };
    const handleKey = (e) => {
        e.code === 'Enter' && handleSend();
    };
    return (
        <div className={cx('wrapper')}>
            <input
                value={text}
                onKeyDown={handleKey}
                onChange={(e) => setText(e.target.value)}
                className={cx('input')}
                placeholder="Type something..."
            />
            <div className={cx('send')}>
                <label htmlFor="attach">
                    <FontAwesomeIcon className={cx('icon')} icon={faPaperclip} />
                </label>
                <input id="attach" type="file" style={{ display: 'none' }} />
                <label htmlFor="image">
                    <FontAwesomeIcon className={cx('icon')} icon={faImage} />
                </label>
                <input onChange={(e) => setImg(e.target.files[0])} id="image" type="file" style={{ display: 'none' }} />
                <button onClick={!text == '' || img ? handleSend : null} className={cx('btn')}>
                    Send
                </button>
            </div>
        </div>
    );
}
export default Input;
