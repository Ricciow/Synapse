import "./dropdownOption.css"
import type { SelectedModelsProps } from "./props"
export default function DropdownOption({ title, onSelect, selected }: { title: string , onSelect?: (model: string) => void, selected?: SelectedModelsProps }) {
    const exists = selected && selected[title]
    
    return (
        <button 
            className="dropdown_option card hoverable"
            onClick={() => onSelect && onSelect(title)}
        >
            <img src={exists? selected[title].logo : ""} alt={title + " logo"} />
            <p>{title}</p>
        </button>
    )
}