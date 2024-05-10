// App.js
import React from 'react';
import Nav from "./Navbar.js";
import SmallWithSocial from "./BottomNav.js";
import SearchForm from "./SearchForm.js";
import { useState } from 'react';
import Pagination from './Pagination.js';
import Cards from './Card.js';
import { Box } from '@chakra-ui/react';

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Box pb="220px"> {/* Adjust the padding as needed */}
      <Nav/>
      <SearchForm></SearchForm>
      <Cards></Cards>
      <Cards></Cards>
      <Cards></Cards>
      <Cards></Cards>
      <Cards></Cards>
      <Cards></Cards>
      <Cards></Cards>
      <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
      <SmallWithSocial/>
    </Box>
  );
}

export default App;
