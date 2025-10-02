import Sidebar from "./sidebar";
import Prompter from "./prompter";
import "./index.css";
import DropdownSelect from "./dropdownSelect";
import { useState } from "react";

import type { SelectedModelsProps } from "./props";
import claudeLogo from "./assets/claude.svg"
import openaiLogo from "./assets/openai.svg"
import geminiLogo from "./assets/gemini.svg"

export default function Index() {
    const [selectedModels, setSelectedModels] = useState<SelectedModelsProps>({
        "Claude 4 Opus": {
            selected: false,
            logo: claudeLogo
        },
        "GPT-5": {
            selected: false,
            logo: openaiLogo
        },
        "Gemini 2.5 Pro": {
            selected: false,
            logo: geminiLogo
        }
    })

    function handleModelSelect(model: string) {
        setSelectedModels({
            ...selectedModels,
            [model]: {
                ...selectedModels[model],
                selected: !selectedModels[model].selected
            }
        })
    }

    return (
        <div className="app">
            <DropdownSelect onSelect={handleModelSelect} selected={selectedModels}/>
            <Sidebar />
            <Prompter />
        </div>
    )
}