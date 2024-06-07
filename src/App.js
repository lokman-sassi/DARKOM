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
  const [selectedSurface, setSelectedSurface] = useState({ min: '', max: '' });
  const [selectedPrice, setSelectedPrice] = useState({ min: '', max: '' });
  const [, setFiltersReset] = useState(false);
  const [favorites, setFavorites] = useState([]);


const resetFilters = () => {
  setSelectedSaleType(null);
  setSelectedLocation(null);
  setSelectedFloor('');
  setSelectedRooms('');
  setSelectedCategory('');
  setSelectedSurface({ min: '', max: '' });
  setSelectedPrice({ min: '', max: '' });
  setFiltersReset(true);
};

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
        if (selectedSurface.min) {
          url += `&minSurface=${selectedSurface.min}`;
        }
        if (selectedSurface.max) {
          url += `&maxSurface=${selectedSurface.max}`;
        }
        if (selectedPrice.min) {
          url += `&minPrice=${selectedPrice.min}`;
        }
        if (selectedPrice.max) {
          url += `&maxPrice=${selectedPrice.max}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setListings(data.listings || []); // Ensure listings is always an array
        setTotalPages(data.totalPages || 0); // Ensure totalPages is always a number
        setLoading(false);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setListings([]); // Set listings to an empty array on error
        setTotalPages(0); // Set totalPages to 0 on error
        setLoading(false);
      }
    };

    fetchListings();
  }, [currentPage, selectedSaleType, selectedLocation, selectedFloor, selectedRooms, selectedCategory, selectedSurface, selectedPrice]);


  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/favorites', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
        const data = await response.json();
        setFavorites(data.favorites || []);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []);



  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSaleTypeChange = (saleType, location) => {
    setSelectedSaleType(saleType);
    setSelectedLocation(location);
    setCurrentPage(1); // Reset to the first page when changing sale type or location
  };

  const handleFloorChange = (floor) => {
    setSelectedFloor(floor);
    setCurrentPage(1); // Reset to the first page when changing floor
  };

  const handleRoomsChange = (rooms) => {
    setSelectedRooms(rooms);
    setCurrentPage(1); // Reset to the first page when changing rooms
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to the first page when changing category
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    setCurrentPage(1); // Reset to the first page when changing location
  };

  const handleSurfaceChange = (surface) => {
    setSelectedSurface(surface);
    setCurrentPage(1); // Reset to the first page when changing surface
  };

  const handlePriceChange = (price) => {
    setSelectedPrice(price);
    setCurrentPage(1); // Reset to the first page when changing price
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
                onSurfaceChange={handleSurfaceChange}
                onPriceChange={handlePriceChange}
                resetFilters={resetFilters}
              />
              {loading ? (
                <Center mt="20">
                  <Spinner size="xl" />
                </Center>
              ) : (
                <>
                  {listings.length > 0 ? (
                    listings.map((listing, index) => (
                      <CardItem key={index} listing={listing} favorites={favorites}/>
                    ))
                  ) : (
                    <Center mt="20">
                      <Box>No listings found</Box>
                    </Center>
                  )}
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
