// const { loading, items, hasNextPage, error, loadMore } = useLoadItems();
import { useEffect, useReducer } from 'react';

import { DateHelper } from '@utils/date';
import { IData } from '@utils/generateData';
import { randomIntFromInterval } from '@utils/randomIntFromInterval';

import { onData, onError, onLoading } from './actions';
import { IState, itemsReducer } from './reducer';

let dataLength = 100;

const ARRAY_SIZE = 100;
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

interface IUseLoadItemsProps {
  scrollRef: React.RefObject<HTMLDivElement>;
}

function useLoadItems({ scrollRef }: IUseLoadItemsProps) {
  const [state, dispatch] = useReducer(itemsReducer, {
    isLoading: false,
    data: [],
    hasPrevPage: false,
    hasNextPage: true,
    error: undefined,
    pagination: { page: 0, last: 200 },
  } as IState);

  useEffect(() => {
    if (scrollRef.current) {
      if (state.pagination.page > 1) {
        const { height } = scrollRef.current.getBoundingClientRect();

        scrollRef.current?.scrollTo(0, height / 2 / 2);
      }
    }
  }, [scrollRef, state.pagination.page]);

  async function loadMore(direction: number) {
    dispatch(onLoading());

    try {
      const { newData } = await loadItems(
        direction === 1 ? dataLength - ARRAY_SIZE : dataLength - ARRAY_SIZE * 2,
        direction,
      );

      console.log(newData);

      dispatch(onData({ direction, newData }));
    } catch (err) {
      dispatch(onError());
    }
  }

  return { ...state, loadMore };
}

export { useLoadItems };
