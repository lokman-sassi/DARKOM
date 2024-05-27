// Pagination.js
import React from 'react';
import { Flex, Button } from '@chakra-ui/react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageLimit = 3; // Limit of pages to show before and after the current page

  // Handle click on page number button
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  // Determine range of pages to show
  const startPage = Math.max(1, currentPage - pageLimit);
  const endPage = Math.min(totalPages, currentPage + pageLimit);
  const pages = [...Array(endPage - startPage + 1)].map((_, index) => startPage + index);

  return (
    <Flex justify="center" mt={4} zIndex="2000" pb="100px" pt="100">
      {currentPage > pageLimit && (
        <Button onClick={() => onPageChange(1)} mr={2} disabled={currentPage === 1}>
          First
        </Button>
      )}
      {currentPage > 1 && (
        <Button onClick={() => onPageChange(currentPage - 1)} mr={2} disabled={currentPage === 1}>
          Prev
        </Button>
      )}
      {pages.map((page, index) => (
        <Button
          key={index}
          onClick={() => handlePageChange(page)}
          mx={2}
          colorScheme={currentPage === page ? 'blue' : 'gray'}
          variant="outline"
        >
          {page}
        </Button>
      ))}
      {currentPage < totalPages && (
        <Button onClick={() => onPageChange(currentPage + 1)} ml={2} disabled={currentPage === totalPages}>
          Next
        </Button>
      )}
      {currentPage < totalPages - pageLimit && (
        <Button onClick={() => onPageChange(totalPages)} ml={2} disabled={currentPage === totalPages}>
          Last
        </Button>
      )}
    </Flex>
  );
}

export default Pagination;
