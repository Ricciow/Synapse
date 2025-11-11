import type { ModelProps } from '../Props.tsx';
import '../../styles/components/ChatAnswerArea.css';

export default function Chat({
  modelName,
  modelData,
  onToggleEnable = () => {},
}: Readonly<{
  modelName: string;
  modelData: ModelProps;
  onToggleEnable?: (state : boolean, modelName: string) => void;
}>) {
  const logo = modelData.logo;
  let state = modelData.enabled;

  function handleToggle() {
    state = !state;
    onToggleEnable(state, modelName);
  }

  return (
    <div className="chat">
      <div className="chat_header">
        <input
          type="checkbox"
          className="model-checkbox"
          onChange={handleToggle}
          checked={state}
        />
        <img src={logo} alt={modelName + ' logo'} />
        <p>{modelName}</p>
      </div>
      <div className="chat_messages">mensagem mensagem mensagem</div>
    </div>
  );
}
