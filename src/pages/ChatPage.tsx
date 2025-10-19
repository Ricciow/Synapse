import Sidebar from '/src/components/Sidebar.tsx';
import Prompter from '/src/components/Prompter.tsx';
import '/src/styles/pages/ChatPage.css';
import DropdownSelect from '/src/components/Dropdown/dropdownSelect.tsx';
import { useState } from 'react';
import type { SelectedModelsProps } from '/src/components/Props.tsx';
import claudeLogo from '/src/components/assets/claude.svg';
import openaiLogo from '/src/components/assets/openai.svg';
import geminiLogo from '/src/components/assets/gemini.svg';
import Chat from '/src/components/ChatPage/ChatAnswerArea.tsx';

const chatLimit = 3;

export default function ChatPage() {
  const [selectedModels, setSelectedModels] = useState<SelectedModelsProps>({
    'Claude Sonnet 4.5': {
      selected: true,
      logo: claudeLogo,
    },
    'GPT-5': {
      selected: false,
      logo: openaiLogo,
    },
    'Gemini 2.5 Pro': {
      selected: false,
      logo: geminiLogo,
    },
  });
  var totalSelected = 0;
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
              ? [chat, <div className="chat_divider" />]
              : [chat]
          )}
      </div>
      <Prompter enabled={totalSelected > 0} />
    </div>
  );
}
