import '../styles/components/Prompter.css';
import '../styles/components/Cards/card.css';
import { useEffect, useRef, useState } from 'react';

export default function Prompter({ enabled = true, onSubmit = () => {}}: Readonly<{ enabled: boolean, onSubmit?: (text: string) => void }>) {
  const [text, setText] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
        const textarea = textAreaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [text]);

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setText(event.target.value);
    };

    function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit();
        }
    };

    function handleSubmit() {
        onSubmit(text);
        setText("");
    };

  return (
    <label
      className={`prompter card ${enabled ? '' : 'disabled'}`}
      htmlFor="prompt_input"
      aria-label="Input de mensagem"
    >
      <textarea
        className="prompt_input"
        id="prompt_input"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={textAreaRef}
        placeholder={
          enabled
            ? 'Digite sua mensagem aqui...'
            : 'Selecione ao menos um modelo para começar a conversar.'
        }
      />
      <button className="send_button" onClick={handleSubmit}>
        <i className="fi fi-rr-paper-plane-top" />
      </button>
    </label>
  );
}
