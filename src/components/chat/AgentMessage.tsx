import { memo } from "react";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import "../../styles/components/Chat/message.css";
import TextDropdown from "../Dropdown/TextDropdown.tsx";
import Spinner from "../../other/Spinner.tsx";

type AgentMessageProps = {
    message: string
    reasoning?: string
}

function AgentMessage({ message, reasoning }: Readonly<AgentMessageProps>) {
    if(message == "" && reasoning == "") {
        return (<div className="message agent"><Spinner message="Gerando..."/></div>)
    }

    return (
        <div className="message agent"> 
            {reasoning && <TextDropdown title="Pensamento" text={reasoning} />}
            <div className="message_area">
                <Markdown remarkPlugins={[remarkGfm]}>{message}</Markdown>
            </div>
        </div>
    )
}

export default memo(AgentMessage)