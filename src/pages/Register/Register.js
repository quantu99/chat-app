import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import avatar from '../../image/empty-image.png';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
const cx = classNames.bind(styles);
function Register() {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            const storageRef = await ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, file);

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
                (error) => {
                    setError(true);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        console.log();
                        await setDoc(doc(db, 'users', res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });
                        await setDoc(doc(db, 'userChats', res.user.uid), {});
                        navigate('/login');
                    });
                },
            );
        } catch (err) {
            setError(true);
            console.log({ message: err.message });
        }
    };

    return (
        <div className={cx('register', 'grid')}>
            <div className={cx('row', 'no-gutters')}>
                <div className={cx('wrapper', 'l-5')}>
                    <p className={cx('brand')}>Dreamer's Chat</p>
                    <p className={cx('title')}>Create new account</p>

                    <form onSubmit={handleSubmit} className={cx('form')}>
                        <div className={cx('input-div')}>
                            <label className={cx('label')} htmlFor="username">
                                Username
                            </label>
                            <input
                                className={cx('input')}
                                id="username"
                                placeholder="This will be appear like your name with others"
                            />
                        </div>
                        <div className={cx('input-div')}>
                            <label className={cx('label')} htmlFor="email">
                                Email
                            </label>
                            <input
                                className={cx('input')}
                                id="email"
                                placeholder="This will be appear like your name with others"
                            />
                        </div>
                        <div className={cx('input-div')}>
                            <label className={cx('label')} htmlFor="password">
                                Password
                            </label>
                            <input className={cx('input')} id="password" placeholder="Enter password" type="password" />
                        </div>
                        {/* <div className={cx('input-div')}>
                            <label className={cx('label')} htmlFor="confirm">
                                Confirm password
                            </label>
                            <input
                                className={cx('input')}
                                id="confirm"
                                placeholder="Enter password again"
                                type="password"
                            />
                        </div> */}
                        <div className={cx('input-div-file')}>
                            <label className={cx('label-file')} htmlFor="file">
                                <img className={cx('avatar-file')} src={avatar} alt="empty-image" />
                            </label>
                            <input className={cx('input-file')} id="file" type="file" />
                            <p className={cx('para-file')}>Import your avatar file</p>
                        </div>
                        <button className={cx('btn')}>Sign up</button>
                        {error && <p>Something went wrong</p>}
                    </form>
                    <p className={cx('navigate-para')}>
                        You have already an account?{' '}
                        <Link to={'/login'} className={cx('navigate-span')}>
                            Login
                        </Link>{' '}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
