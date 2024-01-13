import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import API from '../../API';
import Message from './components/Message';
import { setChatHistory, updateChatHistory } from './slice';

function Chat(props) {
    const [message, setMessage] = React.useState('');
    const [ws, setWs] = React.useState(null); // Initialize ws state
    const chatData = useSelector((state) => state.chat);
    const user = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    React.useEffect(() => {
        const ws = API.WebSocket(user.id, chatData.id);

        ws.onopen = (data) => {
            console.log("Connected");
            const historyRequest = {
                type:"get",
                user: user.id,
            }
            ws.send(JSON.stringify(historyRequest))
            setWs(ws);
        };

        ws.onmessage = (event) => {
            const receivedMessage = JSON.parse(event.data);
            console.log(receivedMessage)
            messageHandler(receivedMessage)
        };

        return () => {
            if (ws && ws.close) {
                ws.close();
            }
        };
    }, [user.id, chatData.id]);

    const messageHandler = (message) => {
        switch (message.type) {
            case "history":
                dispatch(setChatHistory(message.data))
                break;
            case "new":
                dispatch(updateChatHistory(message.data))
                break;
                    
            default:
                return 0
        }
    }

    const sendMessage = () => {
        if (ws?.readyState === WebSocket.OPEN) {
            const messageToSend = {
                type: "add",
                text: message,
                sender: user.id,
            };
            ws.send(JSON.stringify(messageToSend));
            setMessage('');
        }
    };

    return (
        <div className="chat-container">
            <h2>Chat with {chatData.firstName} {chatData.lastName}</h2>
            <div className='chat-history'>
            {chatData.chatHistory && chatData.chatHistory.map((message, index) => {
                console.log("Message:", message);
                console.log("User:", user);

                return (
                    <Message
                        key={index}
                        message={message}
                        classValue={user.id == message.sender_id ? "myMessage" : "someMessage"}
                    />
                );
            })}
            </div>
            <div className="message-input-container">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chat;
