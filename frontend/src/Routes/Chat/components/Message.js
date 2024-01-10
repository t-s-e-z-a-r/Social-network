import React from "react";

const Message = (props) => {
    const { message, classValue } = props;
    console.log(classValue)
    return (
        <div className={`message ${classValue}`}>
            <span>{message.text}</span>
        </div>
    );
};

export default Message;
