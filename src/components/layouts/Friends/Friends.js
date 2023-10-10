import styles from './Friends.module.scss';
import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { AuthContext } from '../../../context/AuthContext';
const cx = classNames.bind(styles);
function Friends() {
    const { currentUser } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);
    const handleSearch = async () => {
        const q = query(collection(db, 'users'), where('displayName', '==', username));
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log(doc.id, ' => ', doc.data());
                setUser(doc.data());
            });
        } catch (err) {
            setError(true);
        }
    };
    const handleKey = (e) => {
        e.code === 'Enter' && handleSearch();
    };
    const handleChange = (e) => {
        setUsername(e.target.value);
    };
    const handleSelect = async () => {
        const combineId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, 'chats', combineId));
            if (!res.exists()) {
                // create a chat in chats collection
                await setDoc(doc(db, 'chats', combineId), { messages: [] });
                // create users chat
                await updateDoc(doc(db, 'userChats', currentUser.uid), {
                    [combineId + '.userInfo']: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combineId + '.date']: serverTimestamp(),
                });
                await updateDoc(doc(db, 'userChats', user.uid), {
                    [combineId + '.userInfo']: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combineId + '.date']: serverTimestamp(),
                });
            }
        } catch (err) {}
        setUsername('');
        setUser(null);
    };
    // const handleSelect = async () => {
    //     // check wheter the groups ( chats in firestore) exists, if not create
    //     const combineId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    //     try {
    //         const res = await getDocs(db, 'chats', combineId);
    //         if(!res.exists()){
    //             // create a chats collection
    //             await setDoc(doc,(db,"chats",combineId),{

    //             })
    //         }
    //     } catch (err) {}
    //     // create user chats
    // };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-input')}>
                <input
                    value={username}
                    onKeyDown={handleKey}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    className={cx('input')}
                    placeholder="Find a user"
                />
            </div>
            {error && <p>User not found</p>}
            {user && (
                <div className={cx('friend-div')} onClick={() => handleSelect()}>
                    <img className={cx('avatar')} src={user?.photoURL} alt="avatar" />
                    <div className={cx('name-mess')}>
                        <p className={cx('name')}>{user?.displayName}</p>
                        {/* <p className={cx('mess')}>{friend.message}</p> */}
                    </div>
                </div>
            )}
        </div>
    );
}
export default Friends;
