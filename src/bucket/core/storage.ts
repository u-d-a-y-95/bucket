import { Box, Config } from "./index.type";

export const push = (config: Config, content: Box) => {
  const stringfy = JSON.stringify(content);
  const signedContent = config.secure ? btoa(stringfy) : stringfy;
  localStorage.setItem(config.name, signedContent);
};

export const pull = (config: Config, fallback: Box) => {
  const content = localStorage.getItem(config.name);
  if (!content) return fallback;
  const unsignedContent = config.secure ? atob(content) : content;
  return unsignedContent ? JSON.parse(unsignedContent) : fallback;
};
