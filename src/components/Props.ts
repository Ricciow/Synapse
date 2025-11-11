export type SelectedModelsProps = {
  [model: string]: ModelProps;
};

export type ModelProps = {
  selected: boolean;
  enabled: boolean;
  logo: string;
};

export type ConversationProps = {
  model: string;
  messages: MessageProps[];
};

export type MessageProps = {
  role: string;
  content: string;
};