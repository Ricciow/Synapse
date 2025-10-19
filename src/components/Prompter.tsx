import '/src/styles/components/Prompter.css';
import '/src/styles/components/Cards/card.css';
import { useEffect, useRef, useState } from 'react';

export default function Prompter({ enabled = true }: { enabled: boolean }) {
  const [text, setText] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textAreaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [text]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <label
      className={`prompter card ${!enabled ? 'disabled' : ''}`}
      htmlFor="prompt_input"
      aria-label="Input de mensagem"
    >
      <textarea
        className="prompt_input"
        id="prompt_input"
        value={text}
        onChange={handleChange}
        ref={textAreaRef}
        placeholder={
          enabled
            ? 'Digite sua mensagem aqui...'
            : 'Selecione ao menos um modelo para começar a conversar.'
        }
      />
      <button className="send_button">
        <i className="fi fi-rr-paper-plane-top" />
      </button>
    </label>
  );
}
