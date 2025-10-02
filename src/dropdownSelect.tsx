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
        <div className="dropdown_select_container">
            <button 
                className="dropdown_select card border"
                onClick={handleClick}
            >
                <p>Modelos</p>
                <i className={`fi fi-br-angle-${dropdownOpen ? "up" : "down"}`}></i>
            </button>
            <div className={`dropdown_options card border ${dropdownOpen ? "open" : "closed"}`}>
                {Object.keys(selected || {}).map((model) => (
                    <DropdownOption key={model} onSelect={onSelect} selected={selected} title={model} />
                ))}
            </div>
        </div>
    )
}