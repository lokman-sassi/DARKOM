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
import Favorites from './Favorites.js';

function App() {
  const [listings, setListings] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedSaleType, setSelectedSaleType] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        let url = `http://localhost:8000/api/listings?page=${currentPage}`;
        if (selectedSaleType) {
          url += `&SaleType=${selectedSaleType}`;
        }
        if (selectedLocation) {
          url += `&Location=${encodeURIComponent(selectedLocation)}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setListings(data.listings);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };
    

    fetchListings();
  }, [currentPage, selectedSaleType, selectedLocation]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSaleTypeChange = (saleType, location) => {
    setSelectedSaleType(saleType);
    setSelectedLocation(location);
    setCurrentPage(1); // Reset to the first page when changing sale type or location
  };
  

  // const filteredListings = selectedSaleType
  // ? listings.filter((listing) => listing['SALE TYPE'] && listing['SALE TYPE'].some((type) => type === selectedSaleType))
  // : listings;

  return (
    <Router>
      <Box pt="232px">
        <Nav onSaleTypeChange={handleSaleTypeChange} />
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
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
        <BottomNav />
      </Box>
    </Router>
  );
}

export default App;
