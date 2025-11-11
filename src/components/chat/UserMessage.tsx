import { memo } from "react";
import "../../styles/components/chat/message.css";

type UserMessageProps = {
    message: string
}

function UserMessage({message} : Readonly<UserMessageProps>) {
    return (
        <div className="message user"> 
            <p>{message}</p>
        </div>
    )
}

export default memo(UserMessage)