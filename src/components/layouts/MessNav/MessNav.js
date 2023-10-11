import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './MessNav.module.scss';
import classNames from 'classnames/bind';
import { faChevronLeft, faEllipsis, faUserPlus, faVideo } from '@fortawesome/free-solid-svg-icons';
import { ChatContext } from '../../../context/ChatContext';
import { useContext, useEffect } from 'react';

const cx = classNames.bind(styles);
function MessNav({ back, haveChat }) {
    const { data } = useContext(ChatContext);
    useEffect(() => {
        if (data?.user) {
            haveChat(true);
        }
    }, [data]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('name-div')}>
                <FontAwesomeIcon className={cx('name-icon')} onClick={() => back()} icon={faChevronLeft} />
                <p className={cx('name')}>{data.user?.displayName}</p>
            </div>
            <div className={cx('icon-div')}>
                <FontAwesomeIcon className={cx('icon')} icon={faVideo} />
                <FontAwesomeIcon className={cx('icon')} icon={faUserPlus} />
                <FontAwesomeIcon className={cx('icon')} icon={faEllipsis} />
            </div>
        </div>
    );
}

export default MessNav;
