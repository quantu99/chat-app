import styles from './Navbar.module.scss';
import classNames from 'classnames/bind';
import { getAuth, signOut } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
const cx = classNames.bind(styles);
function Navbar() {
    const { currentUser } = useContext(AuthContext);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('brand-div')}>
                <p className={cx('brand')}>Dreamer's Chat</p>
            </div>
            <div className={cx('info-div')}>
                <img className={cx('avatar')} src={currentUser.photoURL} alt="avatar" />
                <div className={cx('username-div')}>
                    <p className={cx('username')}>{currentUser.displayName}</p>
                    <button onClick={() => signOut(auth)} className={cx('btn')}>
                        Log out
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Navbar;
