import pokeballImage from '../assets/pokeball.png';

export const toUpperCase = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const parsedNumber = (number: number, targetLength: number, padString: string) => {
 return number.toString().padStart(targetLength, padString);
};

export const parseImageUrl = (id: number) : string => {
  const parsedId = parsedNumber(id || 1, 3, '0');
  const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${parsedId}.png`;
  if (id <= 1025) { //the image is available until id 1025
    return image;
  }
  return pokeballImage;
};