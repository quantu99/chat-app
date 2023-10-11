import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../firebase';
const cx = classNames.bind(styles);
function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (err) {
            setError(true);
        }
    };

    return (
        <div className={'grid'}>
            <div className={cx('row', 'no-gutters')}>
                <div className={cx('wrapper', 'col', 'l-5', 'm-8', 'c-10')}>
                    <p className={cx('brand')}>Dreamer's Chat</p>
                    <p className={cx('title')}>Login</p>

                    <form onSubmit={handleSubmit} className={cx('form')}>
                        <div className={cx('input-div')}>
                            <label className={cx('label')} htmlFor="email">
                                Email
                            </label>
                            <input className={cx('input')} id="email" placeholder="Enter email" />
                        </div>
                        <div className={cx('input-div')}>
                            <label className={cx('label')} htmlFor="password">
                                Password
                            </label>
                            <input className={cx('input')} id="password" placeholder="Enter password" type="password" />
                        </div>

                        <button className={cx('btn')}>Sign in</button>
                        {error && <p>Something went wrong</p>}
                    </form>
                    <p className={cx('navigate-para')}>
                        You don't have an account?{' '}
                        <Link to={'/register'} className={cx('navigate-span')}>
                            Register
                        </Link>{' '}
                        now
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
