// const { loading, items, hasNextPage, error, loadMore } = useLoadItems();
import { useState } from 'react';

import { DateHelper } from '@utils/date';
import { IData } from '@utils/generateData';
import { randomIntFromInterval } from '@utils/randomIntFromInterval';

let dataLength = 20;

const ARRAY_SIZE = 20;
const RESPONSE_TIME_IN_MS = 1000;
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

interface IResponse {
  newHasPrevPage: boolean;
  newHasNextPage: boolean;
  newData: IData[];
}

let prevStartCursor = 0;

function loadItems(startCursor = 0, direction = 1): Promise<IResponse> {
  return new Promise(resolve => {
    let newArray: IData[] = [];

    setTimeout(() => {
      if (startCursor >= 0) {
        for (
          let index = startCursor;
          direction === 1
            ? index < startCursor + ARRAY_SIZE
            : index >= startCursor - ARRAY_SIZE;
          direction === 1 ? index++ : index--
        ) {
          const avatar_url =
            'https://avatars.githubusercontent.com/u/46576135?v=4';
          const title = `Título ${direction === 1 ? index + 1 : index + 1}`;
          const [start, end] = DateHelper.randomDatesFormatted();
          const info = `${start} - ${end}`;
          const randomNumber = randomIntFromInterval(0, colors.length - 1);
          const color = colors[randomNumber];

          const newItem = {
            id: direction === 1 ? index + 1 : index + 1,
            avatar_url,
            title,
            info,
            color,
            bars: [],
          };

          newArray = [...newArray, newItem];
        }
      }

      if (direction === 1) dataLength += ARRAY_SIZE;
      else dataLength -= ARRAY_SIZE;

      prevStartCursor = startCursor;

      resolve({
        newHasPrevPage: prevStartCursor > ARRAY_SIZE,
        newHasNextPage: dataLength <= 1000,
        newData:
          direction === 1
            ? newArray.sort((a, b) => (a.id > b.id ? 1 : -1))
            : newArray.sort((a, b) => (b.id > a.id ? -1 : 1)),
      });
    }, RESPONSE_TIME_IN_MS);
  });
}

function useLoadItems() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<IData[]>([]);
  const [hasPrevPage, setHasPrevPage] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [error, setError] = useState<Error>();

  async function loadMore(direction: number) {
    setIsLoading(true);

    try {
      const { newData, newHasPrevPage, newHasNextPage } = await loadItems(
        direction === 1 ? dataLength - 20 : dataLength - 40,
        direction,
      );

      setData(state => (newData.length === 0 ? state : newData));
      setHasPrevPage(newHasPrevPage);
      setHasNextPage(newHasNextPage);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, data, hasPrevPage, hasNextPage, error, loadMore };
}

export { useLoadItems };
