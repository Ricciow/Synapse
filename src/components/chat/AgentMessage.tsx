import { memo } from "react";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import "../../styles/components/Chat/message.css";

type AgentMessageProps = {
    message: string
    reasoning?: string
}

function AgentMessage({ message, reasoning }: Readonly<AgentMessageProps>) {
    if(message == "" && reasoning == "") {
        return (<div className="message agent">gerando...</div>)
    }

    return (
        <div className="message agent"> 
            {reasoning && <p>{reasoning}</p>}
            <div className="message_area">
                <Markdown remarkPlugins={[remarkGfm]}>{message}</Markdown>
            </div>
        </div>
    )
}

export default memo(AgentMessage)