import Sidebar from '../components/Sidebar.tsx';
import Prompter from '../components/Prompter.tsx';
import '../styles/pages/ChatPage.css';
import DropdownSelect from '../components/Dropdown/dropdownSelect.tsx';
import { useState } from 'react';
import type { SelectedModelsProps } from '../components/Props.tsx';
import claudeLogo from '../assets/claude.svg';
import openaiLogo from '../assets/openai.svg';
import geminiLogo from '../assets/gemini.svg';
import deepseekLogo from '../assets/deepseek.svg';
import Chat from '../components/ChatPage/ChatAnswerArea.tsx';
import { BackendUrl } from '../constants/env.ts';
import { useLoaderData } from 'react-router-dom';
const chatLimit = 3;

const logoConvertion : Record<string, string> = {
  'anthropic': claudeLogo,
  'openai': openaiLogo,
  'gemini': geminiLogo,
  'deepseek': deepseekLogo
};

export async function chatPageLoader(): Promise<SelectedModelsProps> {
  const response = await fetch(`${BackendUrl}/conversation/models`)
  
  if (!response.ok) {
    return {}
  }

  const json : Array<{name: string, model: string, provider: string}> = await response.json();

  const models: SelectedModelsProps = {}

  for (const model of json) {
    models[model.name] = {
      selected: false,
      logo: logoConvertion[model.provider],
    }
  }

  return models;
}

export default function ChatPage() {
  const models = useLoaderData<SelectedModelsProps>()
  const [selectedModels, setSelectedModels] = useState<SelectedModelsProps>(models);

  let totalSelected = 0;
  for (const model in selectedModels) {
    if (selectedModels[model].selected) {
      totalSelected++;
    }
  }

  function handleModelSelect(model: string) {
    if (totalSelected >= chatLimit && !selectedModels[model].selected) return;

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

  return (
    <div className="app">
      <Sidebar />
      <DropdownSelect onSelect={handleModelSelect} selected={selectedModels} />
      <div className="chat_area">
        {Object.keys(selectedModels)
          .filter((model) => selectedModels[model].selected)
          .map((model) => (
            <Chat
              key={model}
              modelName={model}
              modelData={selectedModels[model]}
            />
          ))
          .flatMap((chat, index, array) =>
            index < array.length - 1
              ? [chat, <div key={`divider${index}`} className="chat_divider" />] //NOSONAR
              : [chat]
          )}
      </div>
      <Prompter enabled={totalSelected > 0} />
    </div>
  );
}
