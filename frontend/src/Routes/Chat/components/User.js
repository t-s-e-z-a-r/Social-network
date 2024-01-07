import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserChatData } from '../slice';

const UserComponent = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = props
    const handleClick = () => {
        dispatch(setUserChatData(user))
        navigate(`/chats/${user.id}`);
    }
    return (
        <div key={user.id} onClick={handleClick}>
        <h3>{user.first_name} {user.last_name}</h3>
        </div>
    );
};

export default UserComponent;
