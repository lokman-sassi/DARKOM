// Pagination.js
import React from 'react';
import { Flex, Button } from '@chakra-ui/react';

function Pagination({ currentPage, onPageChange }) {
  const totalPages = 150; // Total number of pages
  const pageLimit = 3; // Limit of pages to show before and after the current page

  // Handle click on page number button
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  // Handle click on next button
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Handle click on previous button
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Handle click on last page button
  const handleLastPage = () => {
    onPageChange(totalPages);
  };

  // Handle click on first page button
  const handleFirstPage = () => {
    onPageChange(1);
  };

  // Determine range of pages to show
  const startPage = Math.max(1, currentPage - pageLimit);
  const endPage = Math.min(totalPages, currentPage + pageLimit);
  const pages = [...Array(endPage - startPage + 1)].map((_, index) => startPage + index);

  return (
    <Flex justify="center" mt={4} zIndex="2000">
      {currentPage > pageLimit && (
        <Button onClick={handleFirstPage} mr={2} disabled={currentPage === 1}>
          First
        </Button>
      )}
      {currentPage > 1 && (
        <Button onClick={handlePrevPage} mr={2} disabled={currentPage === 1}>
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
        <Button onClick={handleNextPage} ml={2} disabled={currentPage === totalPages}>
          Next
        </Button>
      )}
      {currentPage < totalPages - pageLimit && (
        <Button onClick={handleLastPage} ml={2} disabled={currentPage === totalPages}>
          Last
        </Button>
      )}
    </Flex>
  );
}

export default Pagination;
