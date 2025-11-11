import Sidebar from "../components/Sidebar.tsx";
import Prompter from "../components/Prompter.tsx";
import "../styles/pages/ChatPage.css";
import DropdownSelect from "../components/Dropdown/dropdownSelect.tsx";
import { useState } from "react";
import type { ConversationProps, SelectedModelsProps } from "../components/Props.tsx";
import claudeLogo from "../assets/claude.svg";
import openaiLogo from "../assets/openai.svg";
import geminiLogo from "../assets/gemini.svg";
import deepseekLogo from "../assets/deepseek.svg";
import Chat from "../components/ChatPage/ChatAnswerArea.tsx";
import { BackendUrl } from "../constants/env.ts";
import { useLoaderData, type LoaderFunctionArgs } from "react-router-dom";
const chatLimit = 3;

const logoConvertion: Record<string, string> = {
    anthropic: claudeLogo,
    openai: openaiLogo,
    gemini: geminiLogo,
    deepseek: deepseekLogo,
};

async function fetchModels(): Promise<SelectedModelsProps> {
    const response = await fetch(`${BackendUrl}/conversation/models`);

    if (!response.ok) {
        return {};
    }

    const json: Array<{ name: string; model: string; provider: string }> =
        await response.json();

    const models: SelectedModelsProps = {};

    for (const model of json) {
        models[model.name] = {
            selected: false,
            enabled: true,
            logo: logoConvertion[model.provider],
        };
    }

    return models;
}

async function fetchHistory(id: string): Promise<ConversationProps[]> {
    const response = await fetch(`${BackendUrl}/conversation/history/${id}`);

    if (!response.ok) {
        return [];
    }

    const json: ConversationProps[] = await response.json();

    return json;
}

type LoaderData = {
    models: SelectedModelsProps;
    history: ConversationProps[];
};

export async function chatPageLoader({ params }: LoaderFunctionArgs): Promise<LoaderData> {
    const id = params.id as string;

    const data = await Promise.all([
        fetchModels(),
        fetchHistory(id),
    ])

    const result = {
        models: data[0],
        history: data[1],
    }

    return result
}

export default function ChatPage() {
    const { models, history } = useLoaderData<LoaderData>();
    const [selectedModels, setSelectedModels] =
        useState<SelectedModelsProps>(models);
    
    history.forEach((conversation) => {
        if (selectedModels[conversation.model]) {
            selectedModels[conversation.model] = {
                ...selectedModels[conversation.model],
                selected: true,
            };
        }
    });

    let totalSelected = 0;
    for (const model in selectedModels) {
        if (selectedModels[model].selected) {
            totalSelected++;
        }
    }

    function handleModelSelect(model: string) {
        if (totalSelected >= chatLimit && !selectedModels[model].selected)
            return;

        if (selectedModels[model].selected === true) {
            totalSelected--;
        } else {
            totalSelected++;
        }

        setSelectedModels({
            ...selectedModels,
            [model]: {
                ...selectedModels[model],
                selected: !selectedModels[model].selected,
            },
        });
    }

    function handleModelToggle(state: boolean, model: string) {
        setSelectedModels({
            ...selectedModels,
            [model]: {
                ...selectedModels[model],
                enabled: state,
            },
        });
    }

    return (
        <div className="app">
            <Sidebar />
            <DropdownSelect
                onSelect={handleModelSelect}
                selected={selectedModels}
            />
            <div className="chat_area">
                {Object.keys(selectedModels)
                    .filter((model) => selectedModels[model].selected)
                    .map((model) => (
                        <Chat
                            key={model}
                            modelName={model}
                            modelData={selectedModels[model]}
                            history={history.find((message) => message.model === model)?.messages}
                            onToggleEnable={handleModelToggle}
                        />
                    ))
                    .flatMap((chat, index, array) =>
                        index < array.length - 1
                            ? [
                                  chat,
                                  <div
                                      key={`divider${index}`}
                                      className="chat_divider"
                                  />,
                              ] //NOSONAR
                            : [chat]
                    )}
            </div>
            <Prompter enabled={totalSelected > 0} />
        </div>
    );
}
