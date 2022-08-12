import { IData } from '@utils/generateData';

// eslint-disable-next-line no-shadow
export enum ActionTypes {
  ON_LOADING = 'ON_LOADING',
  ON_DATA = 'ON_DATA',
  ON_ERROR = 'ON_ERROR',
}

type IPagination = {
  page: number;
  last: number;
};

export type IState = {
  isLoading: boolean;
  data: IData[];
  hasPrevPage: boolean;
  hasNextPage: boolean;
  error: Error | undefined;
  pagination: IPagination;
};

export type IAction = {
  type: string;
  payload: any;
};

export function itemsReducer(state: IState, action: IAction) {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.ON_LOADING: {
      return { ...state, isLoading: true } as IState;
    }
    case ActionTypes.ON_DATA: {
      const { direction, newData } = payload;

      if (direction === 1) {
        return {
          hasPrevPage: state.pagination.page + 1 > 1,
          hasNextPage: state.pagination.page + 1 !== state.pagination.last,
          data: newData,
          isLoading: false,
          pagination: {
            page: state.pagination.page + 1,
            last: state.pagination.last,
          },
        } as IState;
      }

      return {
        hasPrevPage: state.pagination.page - 1 > 1,
        hasNextPage: state.pagination.page - 1 !== state.pagination.last,
        data: newData,
        isLoading: false,
        pagination: {
          page: state.pagination.page - 1,
          last: state.pagination.last,
        },
      } as IState;
    }
    case ActionTypes.ON_ERROR: {
      return state;
    }
    default:
      break;
  }

  return state;
}
