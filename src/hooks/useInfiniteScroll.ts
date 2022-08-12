import { useEffect } from 'react';

import {
  IntersectionObserverHookArgs,
  IntersectionObserverHookRefCallback as UseInfiniteScrollHookRefCallback,
  IntersectionObserverHookRootRefCallback as UseInfiniteScrollHookRootRefCallback,
} from './useIntersectionObserver';
import { useTrackVisibility } from './useTrackVisibility';

const DEFAULT_DELAY_IN_MS = 100;

export type {
  UseInfiniteScrollHookRefCallback,
  UseInfiniteScrollHookRootRefCallback,
};

export type UseInfiniteScrollHookResult = [
  UseInfiniteScrollHookRefCallback,
  { rootRef: UseInfiniteScrollHookRootRefCallback },
];

export type UseInfiniteScrollHookArgs = Pick<
  IntersectionObserverHookArgs,
  'rootMargin'
> & {
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: VoidFunction;
  disabled?: boolean;
  delayInMs?: number;
};

function useInfiniteScroll({
  isLoading,
  hasMore,
  onLoadMore,
  rootMargin,
  disabled,
  delayInMs = DEFAULT_DELAY_IN_MS,
}: UseInfiniteScrollHookArgs): UseInfiniteScrollHookResult {
  const [ref, { rootRef, isVisible }] = useTrackVisibility({ rootMargin });

  const shouldLoadMore = !disabled && !isLoading && isVisible && hasMore;

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (shouldLoadMore) {
      const timer = setTimeout(() => {
        onLoadMore();
      }, delayInMs);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [onLoadMore, shouldLoadMore, delayInMs]);

  return [ref, { rootRef }];
}

export { useInfiniteScroll };
