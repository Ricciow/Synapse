import type { MessageProps, ModelProps } from '../Props.tsx';
import '../../styles/components/ChatAnswerArea.css';
import UserMessage from '../chat/UserMessage.tsx';
import AgentMessage from '../chat/AgentMessage.tsx';
import { useEffect, useRef } from 'react';

export default function Chat({
  modelName,
  modelData,
  history,
  onToggleEnable = () => {},
}: Readonly<{
  modelName: string;
  modelData: ModelProps;
  history?: MessageProps[];
  onToggleEnable?: (state : boolean, modelName: string) => void;
}>) {
  const logo = modelData.logo;
  let state = modelData.enabled;
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  function handleToggle() {
    state = !state;
    onToggleEnable(state, modelName);
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  });

  return (
    <div className="chat">
      <div className="chat_header">
        <label htmlFor={modelName} className='model_label'>
          <input
            type="checkbox"
            className="model-checkbox"
            onChange={handleToggle}
            checked={state}
            id={modelName}
          />
          <img src={logo} alt={modelName + ' logo'} />
          <p>{modelName}</p>
        </label>
      </div>
      <div className="chat_messages" ref={scrollAreaRef}>
        {history?.map((message, index) => (
          <div className="message" key={`${modelName}-${index}`}>
            {message.role === 'user' && <UserMessage message={message.content} />}
            {message.role === 'assistant' && <AgentMessage message={message.content} reasoning={message.reasoning} />}
          </div>
        ))}
      </div>
    </div>
  );
}
