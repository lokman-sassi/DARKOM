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
  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedRooms, setSelectedRooms] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

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
        if (selectedFloor) {
          url += `&FLOOR=${selectedFloor}`;
        }
        if (selectedRooms) {
          url += `&ROOMS=${selectedRooms}`;
        }
        if (selectedCategory) {
          url += `&CATEGORY=${selectedCategory}`;
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
  }, [currentPage, selectedSaleType, selectedLocation, selectedFloor, selectedRooms, selectedCategory]);

  const handleFloorChange = (floor) => {
    setSelectedFloor(floor);
    setCurrentPage(1); // Reset to the first page when changing floor
  };

  const handleRoomsChange = (rooms) => {
    setSelectedRooms(rooms);
    setCurrentPage(1); // Reset to the first page when changing rooms
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSaleTypeChange = (saleType, location) => {
    setSelectedSaleType(saleType);
    setSelectedLocation(location);
    setCurrentPage(1); // Reset to the first page when changing sale type or location
  };
  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    setCurrentPage(1); // Reset to the first page when changing location
  };
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to the first page when changing category
  };

  return (
    <Router>
      <Box pt="232px">
        <Nav onSaleTypeChange={handleSaleTypeChange} />
        <Routes>
          <Route path="/" element={
            <>
              <SearchForm
                onFloorChange={handleFloorChange}
                onRoomsChange={handleRoomsChange}
                onLocationChange={handleLocationChange}
                onCategoryChange={handleCategoryChange}
              />
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
