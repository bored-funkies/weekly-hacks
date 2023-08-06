import ColorHelper from "./ColorHelper";

const ColorPalettes = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
];

const getRandomColor = (): string => {
  return ColorPalettes[Math.floor(Math.random() * ColorPalettes.length)];
}

const ColorUtil = new ColorHelper();


export { ColorPalettes, getRandomColor, ColorUtil };