import Clarity from "@microsoft/clarity";

export const sendClarityTag = (tagName: string, value: string | string[]) => {
  Clarity.setTag(tagName, value);
};

export const sendClarityEvent = (eventName: string) => {
  Clarity.event(eventName);
};
