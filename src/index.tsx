import Sidebar from "./sidebar";
import Prompter from "./prompter";
import "./index.css";
import DropdownSelect from "./dropdownSelect";
import { useState } from "react";

import type { SelectedModelsProps } from "./props";
import claudeLogo from "./assets/claude.svg"
import openaiLogo from "./assets/openai.svg"
import geminiLogo from "./assets/gemini.svg"
import Chat from "./chat";

const chatLimit = 3;

export default function Index() {
    const [selectedModels, setSelectedModels] = useState<SelectedModelsProps>({
        "Claude 4 Opus": {
            selected: true,
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
    var totalSelected = 0;
    for (const model in selectedModels) {
        if (selectedModels[model].selected) {
            totalSelected++;
        }
    }

    function handleModelSelect(model: string) {
        if(totalSelected >= chatLimit && !selectedModels[model].selected) return;

        if(selectedModels[model].selected === true) {
            totalSelected--;
        }
        else {
            totalSelected++;
        }

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
            <Sidebar />
            <DropdownSelect onSelect={handleModelSelect} selected={selectedModels}/>
            <div className="chat_area">
                {
                Object.keys(selectedModels).filter(model => selectedModels[model].selected).map((model) => (
                    <Chat key={model} modelName={model} modelData={selectedModels[model]} />
                )).flatMap((chat, index, array) => (
                    index < array.length - 1 ? [chat, <div className="chat_divider"/>] : [chat]
                ))
                }
            </div>
            <Prompter />
        </div>
    )
}