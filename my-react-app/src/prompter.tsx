import "./prompter.css"
import "./card.css"
import { useEffect, useRef, useState } from "react"

export default function Prompter() {
    const [text, setText] = useState("")
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        const textarea = textAreaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [text]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    }

    return (
        <label className="prompter card" htmlFor="prompt_input" aria-label="Input de mensagem">
            <textarea 
                className="prompt_input" 
                id="prompt_input" 
                value={text} 
                onChange={handleChange} 
                ref={textAreaRef} 
                placeholder="Digite sua mensagem aqui..." 
            />
            <button className="send_button"><i className="fi fi-rr-paper-plane-top"/></button>
        </label>
    )
}