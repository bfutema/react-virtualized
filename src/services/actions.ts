import { IData } from '@utils/generateData';

import { ActionTypes } from './reducer';

export function onLoading() {
  return { type: ActionTypes.ON_LOADING, payload: {} };
}

export function onData({
  direction,
  newData,
}: {
  direction: number;
  newData: IData[];
}) {
  return { type: ActionTypes.ON_DATA, payload: { direction, newData } };
}

export function onError() {
  return { type: ActionTypes.ON_ERROR, payload: {} };
}
