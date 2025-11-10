import { type LoaderFunctionArgs } from "react-router-dom";
import { authTokenLocalStorage } from "../constants/localstorage";
import authenticatedFetch from "../api/authenticatedFetch";
import type { Conversation } from "../components/Chat/chatTypes.ts";

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
