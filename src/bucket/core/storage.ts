import { Config } from "./index.type";

export const push = <T>(config: Config, content: T) => {
  const stringfy = JSON.stringify(content);
  const signedContent = config.secure ? btoa(stringfy) : stringfy;
  localStorage.setItem(config.name, signedContent);
};

export const pull = <T>(config: Config, fallback: T) => {
  const content = localStorage.getItem(config.name);
  if (!content) return fallback;
  const unsignedContent = config.secure ? atob(content) : content;
  return unsignedContent ? JSON.parse(unsignedContent) : fallback;
};
