import { useLoaderData, type LoaderFunctionArgs, Await } from "react-router-dom";
import { Suspense, useState } from "react";
import ErrorPage from "./ErrorPage";
import Spinner from "../components/Others/Spinner.tsx";
import Sidebar from "../components/projetos/Sidebar";
import Prompter from "../components/Chat/Prompter.tsx";
import DropdownSelect from "../components/Dropdown/dropdownSelect";
import Chat from "../components/ChatPage/ChatAnswerArea";
import { authTokenLocalStorage } from "../constants/localstorage";
import authenticatedFetch from "../api/authenticatedFetch";
import claudeLogo from "../components/assets/claude.svg";
import openaiLogo from "../components/assets/openai.svg";
import geminiLogo from "../components/assets/gemini.svg";
import "../styles/pages/ChatPage.css";
import type { Conversation } from "../components/Chat/chatTypes.ts";

type ModelInfo = {
  selected: boolean;
  logo: string;
};

type SelectedModels = {
  [key: string]: ModelInfo;
};

async function loadConversation(id: string): Promise<Conversation> {
  const token = authTokenLocalStorage();
  const response = await authenticatedFetch(`conversation/${id}`, { method: "GET" }, token);

  if (!response.ok) {
    throw new Response("Não foi possível carregar o histórico do chat.", {
      status: response.status,
      statusText: response.statusText,
    });
  }

  const data: Conversation = await response.json();
  return {
    messages: data.messages,
    title: data.title,
    description: data.description,
  };
}

export async function chatPageLoader({ params }: LoaderFunctionArgs) {
  const id = params.id as string;
  const conversationPromise = loadConversation(id);
  return { id, conversationData: conversationPromise };
}

const chatLimit = 3;

export default function ChatPage() {
  const { id, conversationData } = useLoaderData() as {
    id: string;
    conversationData: Promise<Conversation>;
  };

  const [selectedModels, setSelectedModels] = useState<SelectedModels>({
    "Claude Sonnet 4.5": { selected: true, logo: claudeLogo },
    "GPT-5": { selected: false, logo: openaiLogo },
    "Gemini 2.5 Pro": { selected: false, logo: geminiLogo },
  });

  const [responses, setResponses] = useState<{ [model: string]: string }>({});

  const totalSelected = Object.values(selectedModels).filter((m) => m.selected).length;

  function handleModelSelect(model: string) {
    if (totalSelected >= chatLimit && !selectedModels[model].selected) return;

    setSelectedModels({
      ...selectedModels,
      [model]: {
        ...selectedModels[model],
        selected: !selectedModels[model].selected,
      },
    });
  }

  async function handleSendPrompt(prompt: string) {
    const token = authTokenLocalStorage();
    const selected = Object.keys(selectedModels).filter((m) => selectedModels[m].selected);

    const newResponses: { [model: string]: string } = {};
    setResponses({});

    for (const model of selected) {
      const modeloBackend =
        model === "Claude Sonnet 4.5"
          ? "anthropic/claude-3-5-sonnet"
          : model === "GPT-5"
          ? "openai/gpt-5"
          : "google/gemini-2.5-pro";

      const response = await authenticatedFetch(
        "api/ai/gerarRespostaStream",
        {
          method: "POST",
          body: JSON.stringify({
            historico: [{ role: "user", content: prompt }],
            modelo: modeloBackend,
          }),
        },
        token
      );

      if (!response.ok) {
        newResponses[model] = "Erro ao gerar resposta.";
      } else {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let text = "";

        // continuous stream reading
        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            text += decoder.decode(value, { stream: true });
            setResponses((prev) => ({ ...prev, [model]: text }));
          }
        }
      }
    }

    setResponses(newResponses);
  }

  return (
    <Suspense
      fallback={<Spinner message="Carregando histórico do chat..." className="chat_page_spinner" />}
    >
      <Await resolve={conversationData} errorElement={<ErrorPage />}>
        {(resolvedData) => (
          <div className="app">
            <Sidebar />
            <DropdownSelect onSelect={handleModelSelect} selected={selectedModels} />

            <div className="chat_area">
              {Object.keys(selectedModels)
                .filter((m) => selectedModels[m].selected)
                .map((model) => (
                  <Chat
                    key={model}
                    modelName={model}
                    modelData={selectedModels[model]}
                    content={responses[model] || ""}
                  />
                ))
                .flatMap((chat, i, arr) =>
                  i < arr.length - 1
                    ? [chat, <div key={`divider-${i}`} className="chat_divider" />]
                    : [chat]
                )}
            </div>

            <Prompter enabled={totalSelected > 0} onSend={handleSendPrompt} />
          </div>
        )}
      </Await>
    </Suspense>
  );
}
