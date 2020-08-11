import React from 'react';
import FlashMessage from 'react-flash-message';


const Message = ({ msgType }) => {
    return (
        <FlashMessage>
            <strong className="flash-message">{msgType === 'correct' ? 'Correct!' : 'Wrong! Try again!'}</strong>
        </FlashMessage>
    )
}


export default Message;