import React from 'react';
import API from '../../API';
import UserComponent from './components/User';

function ChatsList(props) {
    const [users, setUsers] = React.useState([])
    const fetchData = async () =>{
        const response = await API.GET("users")
        setUsers(await response.json())
    }
    React.useEffect(() => {
        fetchData()
    }, []);
    return (
        <div>
            <h2>Chats page</h2>
            <div>
                {users.length > 0 && users.map((user) => (
                    <UserComponent user={user}/>
                    ))}
            </div>
        </div>
    )
}

export default ChatsList