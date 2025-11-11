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
import { redirect, useLoaderData, type LoaderFunctionArgs } from "react-router-dom";
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

async function fetchHistory(id: string): Promise<ConversationProps[]| Response> {
    const response = await fetch(`${BackendUrl}/conversation/history/${id}`);

    if (!response.ok) {
        return redirect('/chat');
    }

    const json: ConversationProps[] = await response.json();

    return json;
}

type LoaderData = {
    models: SelectedModelsProps;
    history: ConversationProps[];
    id: string
};

export async function chatPageLoader({ params }: LoaderFunctionArgs): Promise<LoaderData| Response> {
    const id = params.id as string;

    const data = await Promise.all([
        fetchModels(),
        fetchHistory(id),
    ])

    const models = data[0]
    const history = data[1]

    if(history instanceof Response) {
        return history
    }

    let totalSelected = 0;
    history.forEach((conversation) => {
        if (models[conversation.model] && totalSelected < chatLimit) {
            models[conversation.model] = {
                ...models[conversation.model],
                selected: true,
            };
            totalSelected++;
        }
    });

    const result = {
        models,
        history,
        id
    }

    return result
}

export default function ChatPage() {
    const { models, history, id } = useLoaderData<LoaderData>();
    const [conversation, setConversation] = useState<ConversationProps[]>(history);
    const [selectedModels, setSelectedModels] =
        useState<SelectedModelsProps>(models);

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

    async function sendPromptRequest(prompt: string, model: string) {
        const userMessage = { role: "user", content: prompt }
        const agentMessage = { role: "assistant", content: "", reasoning: "" }

        setConversation((prev: ConversationProps[]): ConversationProps[] => {
            return prev.map((conversation) => {
                if (conversation.model === model) {
                    return {
                        ...conversation,
                        messages: [...conversation.messages, userMessage, agentMessage],
                    };
                }
                return conversation;
            });
        });
        
        const response = await fetch(`${BackendUrl}/conversation/${id}/message`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_input: prompt,
                model: model
            }),
        });

        if (!response.ok || !response.body) {
            setConversation((prev : ConversationProps[]) : ConversationProps[] => {
                return prev.map((conversation) => {
                    if (conversation.model === model) {
                        return {
                            ...conversation,
                            messages: conversation.messages.slice(0, -1)
                        }
                    }
                    return conversation
                })
            });

            throw new Error(`Erro na requisição: ${response.status}`);
        }
        
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let baseResponse = {
            role: "assistant" as const,
            content: "",
            reasoning: "",
        }

        async function processStream() {
            const { done, value } = await reader.read();

            if (done) {
                return;
            }

            const chunkString = decoder.decode(value, { stream: true });
            const jsonStrings = chunkString.trim().split('\n');

            jsonStrings.forEach(str => {
                if (str) {
                    try {
                        const jsonData = JSON.parse(str);
                        
                        if (jsonData.content) baseResponse.content += jsonData.content;
                        if (jsonData.reasoning) baseResponse.reasoning += jsonData.reasoning;

                        setConversation((prev : ConversationProps[]) : ConversationProps[] => {
                            return prev.map((conversation) => {
                                if (conversation.model === model) {
                                    return {
                                        ...conversation,
                                        messages: [...conversation.messages.slice(0, -1), baseResponse]
                                    }
                                }
                                return conversation
                            })
                        })
                    } catch (err) {
                        console.error("Não foi possível parsear o JSON do chunk:", str, err);
                    }
                }
            });

            await processStream();
        };

        await processStream();
    }

    function handleSendPrompt(text: string) {
        for (const model in selectedModels) {
            if (selectedModels[model].selected && selectedModels[model].enabled) {
                sendPromptRequest(text, model);
            }
        }
    }

    return (
        <div className="chat_region">
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
                            history={conversation.find((message) => message.model === model)?.messages}
                            onToggleEnable={handleModelToggle}
                        />
                    ))
                    .flatMap((chat, index, array) =>
                        index < array.length - 1
                            ? [
                                  chat,
                                  <div
                                      key={`divider${index}`} //NOSONAR
                                      className="chat_divider"
                                  />,
                              ]
                            : [chat]
                    )}
            </div>
            <Prompter enabled={totalSelected > 0} onSubmit={handleSendPrompt}/>
        </div>
    );
}
