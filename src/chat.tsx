import type { ModelProps } from "./props";
import "./chat.css"

export default function Chat({ modelName, modelData }: { modelName: string, modelData: ModelProps }) {
    const logo = modelData.logo;

    return (
        <div className="chat">
            <div className="chat_header">
                <img src={logo} alt={modelName + " logo"} />
                <p>{modelName}</p>  
            </div>
            <div className="chat_messages">
                mensagem mensagem mensagem
            </div>
        </div>
    )
}