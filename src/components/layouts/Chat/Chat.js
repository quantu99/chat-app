import Input from '../Input/Input';
import MessNav from '../MessNav/MessNav';
import Message from '../Message/Message';
import Messages from '../Messages/Messages';
import styles from './Chat.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function Chat({ haveChat, back }) {
    return (
        <div className={cx('wrapper')}>
            <MessNav back={back} haveChat={haveChat} />
            <Messages />
            <Input />
        </div>
    );
}
export default Chat;
