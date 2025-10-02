import "./dropdownSelect.css"
import "./card.css"
import { useState } from "react"
import DropdownOption from "./dropdownOption";
import type { SelectedModelsProps } from "./props";

export default function DropdownSelect({ onSelect, selected }: { onSelect?: (model: string) => void, selected?: SelectedModelsProps }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    function handleClick() {
        setDropdownOpen(!dropdownOpen);
    }

    return (
        <div>
            <button 
                className="dropdown_select card border"
                onClick={handleClick}
            >
                <p>Modelos</p>
                <i className={`fi fi-br-angle-${dropdownOpen ? "up" : "down"}`}></i>
            </button>
            <div className={`dropdown_options card border ${dropdownOpen ? "open" : "closed"}`}>
                <DropdownOption onSelect={onSelect} selected={selected} title="Claude 4 Opus" />
                <DropdownOption onSelect={onSelect} selected={selected} title="GPT-5" />
                <DropdownOption onSelect={onSelect} selected={selected} title="Gemini 2.5 Pro" />
            </div>
        </div>
    )
}