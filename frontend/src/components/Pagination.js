import React from 'react';
import _ from 'lodash';
import { Button, ButtonGroup } from '@chakra-ui/react';

export default function Pagination({
  pageSize,
  itemsCount,
  currentPage,
  onPageChange,
  scroll,
}) {
  const pages = _.range(1, itemsCount / pageSize + 1);

  const handleClick = (page) => {
    onPageChange(page);
    scroll();
  };

  if (Math.ceil(itemsCount / pageSize) === 1) return null;
  return (
    <ButtonGroup
      mt="20px"
      pl={{ sm: '30px', md: '130px' }}
      size="md"
      isAttached
    >
      {pages.map((page) => (
        <Button
          onClick={() => handleClick(page)}
          colorScheme={page === currentPage ? 'blue' : 'gray'}
          mr="-px"
          _focus={{
            border: 'none',
          }}
        >
          {page}
        </Button>
      ))}
    </ButtonGroup>
  );
}
