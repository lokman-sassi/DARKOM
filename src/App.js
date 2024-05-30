// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from "./Navbar.js";
import BottomNav from "./BottomNav.js";
import SearchForm from "./SearchForm.js";
import Pagination from './Pagination.js';
import CardItem from './Card.js';
import { Box, Spinner, Center } from '@chakra-ui/react';
import Auth from './Auth.js';
function App() {
  const [listings, setListings] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/api/listings?page=${currentPage}`); //localhost  before for local test, device IP address for local network test
        const data = await response.json();
        setListings(data.listings);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Router>
      <Box pt="232px">
        <Nav />
        <Routes>
          <Route path="/" element={
            <>
              <SearchForm />
              {loading ? (
                <Center mt="20">
                  <Spinner size="xl" />
                </Center>
              ) : (
                <>
                  {listings.map((listing, index) => (
                    <CardItem key={index} listing={listing} />
                  ))}
                  <Box mb="20px">
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                  </Box>
                </>
              )}
            </>
          } />
          <Route path="/account" element={<Auth />} />
        </Routes>
        <BottomNav />
      </Box>
    </Router>
  );
}

export default App;