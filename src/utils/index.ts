export const setItemByMemory = (key: string, value: string[]): void => {
  window.localStorage.setItem(key, JSON.stringify(value));
};
export const getItemByMemory = (key: string): string[] => {
  return JSON.parse(window.localStorage.getItem(key) || "[]");
};
