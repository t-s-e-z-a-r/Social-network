import React from 'react';
import { useSelector } from 'react-redux';
import API from '../../API';

function Chat(props) {
    const [message, setMessage] = React.useState('');
    const [ws, setWs] = React.useState(null); // Initialize ws state
    const userData = useSelector((state) => state.chat);
    const user = useSelector((state) => state.user);

    React.useEffect(() => {
        const ws = API.WebSocket(user.id, userData.id);

        ws.onopen = (data) => {
            console.log("Connected", data);
            const historyRequest = {
                "type":"get",
            }
            ws.send(JSON.stringify(historyRequest))
            setWs(ws);
        };

        ws.onmessage = (event) => {
            // const receivedMessage = JSON.parse(event.data);
            console.log("Received");
        };

        return () => {
            if (ws && ws.close) {
                ws.close();
            }
        };
    }, [user.id, userData.id]);

    const sendMessage = () => {
        console.log("State", ws?.readyState);
        if (ws?.readyState === WebSocket.OPEN) {
            const messageToSend = {
                text: message,
                sender: user.id,
            };
            ws.send(JSON.stringify(messageToSend));
            setMessage('');
        }
    };

    return (
        <div className="chat-container">
            <h2>Chat with {userData.firstName} {userData.lastName}</h2>
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
