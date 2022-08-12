import React, { useRef } from 'react';

import { v4 } from 'uuid';

import { useInfiniteScroll } from '@hooks/useInfiniteScroll';
import { useLoadItems } from '@services/useLoadItems';

import { Container, Item } from './styles';

const Home: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { isLoading, data, hasPrevPage, hasNextPage, error, loadMore } =
    useLoadItems({ scrollRef });

  const [infinitePrevRef] = useInfiniteScroll({
    isLoading,
    hasMore: hasPrevPage,
    onLoadMore: () => loadMore(-1),
    disabled: !!error,
  });

  const [infiniteNextRef] = useInfiniteScroll({
    isLoading,
    hasMore: hasNextPage,
    onLoadMore: () => loadMore(1),
    disabled: !!error,
  });

  return (
    <div>
      <Container ref={scrollRef}>
        {hasPrevPage && <Item ref={infinitePrevRef}>Carregando</Item>}

        {data.map(item => {
          return (
            <Item key={v4()}>
              {item.title} - {item.color} - {item.info}
            </Item>
          );
        })}

        {hasNextPage && <Item ref={infiniteNextRef}>Carregando</Item>}
      </Container>
    </div>
  );
};

export { Home };
