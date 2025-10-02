import type { ModelProps } from "./props";

export default function Chat({ modelName, modelData }: { modelName: string, modelData: ModelProps }) {
    const logo = modelData.logo;

    return (
        <div className="chat">
            <div className="chat_header card border">
                <img src={logo} alt={modelName + " logo"} />
                <p>{modelName}</p>  
            </div>
            <div className="chat_messages">
                messages message messages
            </div>
        </div>
    )
}