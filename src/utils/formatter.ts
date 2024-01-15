export const toUpperCase = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const parsedNumner = (number: number, targetLength: number, padString: string) => {
 return number.toString().padStart(targetLength, padString);
};
