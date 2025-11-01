import type { ModelProps } from '../projetos/Props.tsx';
import '../../styles/components/ChatAnswerArea.css';

export default function Chat({
  modelName,
  modelData,
}: {
  modelName: string;
  modelData: ModelProps;
}) {
  const logo = modelData.logo;

  return (
    <div className="chat">
      <div className="chat_header">
        <input
          type="checkbox"
          className="model-checkbox"
        />
        <img src={logo} alt={modelName + ' logo'} />
        <p>{modelName}</p>
      </div>
      <div className="chat_messages">mensagem mensagem mensagem</div>
    </div>
  );
}
