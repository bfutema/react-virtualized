import { DateHelper } from './date';
import { randomIntFromInterval } from './randomIntFromInterval';

const colors: string[] = [
  '#FFE066',
  '#71C3FC',
  '#8CE99A',
  '#F0A58F',
  '#FAA2C1',
  '#E599F7',
  '#FAB005',
  '#228AE6',
  '#41C057',
  '#EA7369',
  '#E64980',
  '#BE4ADB',
  '#E67700',
  '#1B6EC2',
  '#2F9E44',
  '#C02323',
  '#A61D4D',
  '#862E9C',
];

export type IData = {
  id: number;
  avatar_url?: string;
  title: string;
  info?: string;
  color: string;
  bars: { color: string; start: Date; end: Date }[];
};

function generateData(quantity = 1000): IData[] {
  const data: IData[] = [];

  for (let index = 0; index < quantity; index++) {
    const avatar_url = 'https://avatars.githubusercontent.com/u/46576135?v=4';
    const title = `Título ${index + 1}`;
    const [start, end] = DateHelper.randomDatesFormatted();
    const info = `${start} - ${end}`;
    const randomNumber = randomIntFromInterval(0, colors.length);
    const color = colors[randomNumber];

    data.push({ id: index + 1, avatar_url, title, info, color, bars: [] });
  }

  return data;
}

export { generateData };
