import React from 'react';

import { v4 } from 'uuid';

import { useInfiniteScroll } from '@hooks/useInfiniteScroll';
import { useLoadItems } from '@hooks/useLoadItems';

import { Container, Item } from './styles';

const Home: React.FC = () => {
  const { isLoading, data, hasPrevPage, hasNextPage, error, loadMore } =
    useLoadItems();

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
      <Container>
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
