import type { ModelProps } from '../Props.tsx';
import '../../styles/components/ChatAnswerArea.css';

export default function Chat({
  modelName,
  modelData,
  onToggleEnable = () => {},
}: Readonly<{
  modelName: string;
  modelData: ModelProps;
  onToggleEnable?: (state : boolean) => void;
}>) {
  const logo = modelData.logo;
  let state = modelData.enabled;

  function handleToggle() {
    state = !state;
    onToggleEnable(state);
  }

  return (
    <div className="chat">
      <div className="chat_header">
        <input
          type="checkbox"
          className="model-checkbox"
          onClick={handleToggle}
          checked={state}
        />
        <img src={logo} alt={modelName + ' logo'} />
        <p>{modelName}</p>
      </div>
      <div className="chat_messages">mensagem mensagem mensagem</div>
    </div>
  );
}
