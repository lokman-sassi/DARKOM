// SearchForm.js
import { useState } from 'react';
import { Flex, Button, useToast, Select, Box, useColorModeValue, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input } from "@chakra-ui/react";

function SearchForm({ onFloorChange, onRoomsChange, onLocationChange, onCategoryChange, onSurfaceChange, onPriceChange  }) {
  const toast = useToast();
  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedRooms, setSelectedRooms] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [enteredLocation, setEnteredLocation] = useState('');
  const [surfaceModalOpen, setSurfaceModalOpen] = useState(false);
  const [enteredMinSurface, setEnteredMinSurface] = useState('');
  const [enteredMaxSurface, setEnteredMaxSurface] = useState('');
  const [priceModalOpen, setPriceModalOpen] = useState(false);
  const [enteredMinPrice, setEnteredMinPrice] = useState('');
  const [enteredMaxPrice, setEnteredMaxPrice] = useState('');

  const resetFilters = () => {
    document.getElementById("Form").reset();
    setSelectedFloor('');
    setSelectedRooms('');
    setEnteredLocation('');
    setSelectedCategory('');
    setEnteredMinSurface('');
    setEnteredMaxSurface('');
    setEnteredMinPrice('');
    setEnteredMaxPrice('');
    onFloorChange('');
    onRoomsChange('');
    onLocationChange('');
    onCategoryChange('');
    onSurfaceChange({ min: '', max: '' });
    onPriceChange({ min: '', max: '' });
    toast({
      title: "Filters reset",
      description: "All filters have been reset to default.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  const handleFloorChange = (event) => {
    setSelectedFloor(event.target.value);
    onFloorChange(event.target.value);
  };

  const handleRoomsChange = (event) => {
    setSelectedRooms(event.target.value);
    onRoomsChange(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    onCategoryChange(event.target.value);
  };

  const handleLocationChange = () => {
    onLocationChange(enteredLocation);
    setLocationModalOpen(false);
  };

  const handleSurfaceChange = () => {
    onSurfaceChange({ min: enteredMinSurface, max: enteredMaxSurface });
    setSurfaceModalOpen(false);
  };

  const handlePriceChange = () => {
    onPriceChange({ min: enteredMinPrice, max: enteredMaxPrice });
    setPriceModalOpen(false);
  };

  return (
    <Box
      position="fixed"
      top="66px"
      width="100%"
      zIndex="2"
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow="lg"
      py={4}
      px={8}
      borderRadius="md"
      bgGradient={useColorModeValue(
        'linear(to-r, teal.300, blue.500)',
        'linear(to-r, teal.800, blue.900)'
      )}
    >
      <Flex
        id="Form"
        as="form"
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        mx="auto"
        maxWidth="1200px"
        gap={4}
      >
        <Select
          placeholder="Category"
          flex="1"
          variant="filled"
          _hover={{ boxShadow: "lg" }}
          borderRadius="md"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="Appartement">Appartement</option>
          <option value="Niveau de Villa">Niveau de Villa</option>
          <option value="Villa">Villa</option>
          <option value="Duplex">Duplex</option>
          <option value="Triplex">Triplex</option>
        </Select>
        <Button
          colorScheme="teal"
          onClick={() => setLocationModalOpen(true)}
          variant="solid"
          _hover={{
            bgGradient: 'linear(to-r, teal.500, green.500)',
            boxShadow: 'xl',
          }}
          borderRadius="md"
        >
          Location
        </Button>
        <Modal isOpen={locationModalOpen} onClose={() => setLocationModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Enter a city</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input placeholder="City name" value={enteredLocation} onChange={(event) => setEnteredLocation(event.target.value)} />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleLocationChange}>
                Apply
              </Button>
              <Button variant="ghost" onClick={() => setLocationModalOpen(false)}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Select
          placeholder="Floor"
          flex="1"
          variant="filled"
          _hover={{ boxShadow: "lg" }}
          borderRadius="md"
          value={selectedFloor}
          onChange={handleFloorChange}
        >
          <option value="">All</option>
          {Array.from({ length: 15 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
          {Array.from({ length: 7 }, (_, i) => (
            <option key={`rdc+${i}`} value={`rdc+${i}`}>
              rdc+{i}
            </option>
          ))}
        </Select>
        <Select
          placeholder="Rooms"
          flex="1"
          variant="filled"
          _hover={{ boxShadow: "lg" }}
          borderRadius="md"
          value={selectedRooms}
          onChange={handleRoomsChange}
        >
          <option value="">All</option>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </Select>
        <Button
          colorScheme="teal"
          onClick={() => setSurfaceModalOpen(true)}
          variant="solid"
          _hover={{
            bgGradient: 'linear(to-r, teal.500, green.500)',
            boxShadow: 'xl',
          }}
          borderRadius="md"
        >
          Surface
        </Button>
        <Modal isOpen={surfaceModalOpen} onClose={() => setSurfaceModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Enter a surface range</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input placeholder="Min surface" value={enteredMinSurface} onChange={(event) => setEnteredMinSurface(event.target.value)} />
              <Input placeholder="Max surface" value={enteredMaxSurface} onChange={(event) => setEnteredMaxSurface(event.target.value)} />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSurfaceChange}>
                Apply
              </Button>
              <Button variant="ghost" onClick={() => setSurfaceModalOpen(false)}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Button
          colorScheme="teal"
          onClick={() => setPriceModalOpen(true)}
          variant="solid"
          _hover={{
            bgGradient: 'linear(to-r, teal.500, green.500)',
            boxShadow: 'xl',
          }}
          borderRadius="md"
        >
          Price
        </Button>
        <Modal isOpen={priceModalOpen} onClose={() => setPriceModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Enter a price range</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input placeholder="Min price" value={enteredMinPrice} onChange={(event) => setEnteredMinPrice(event.target.value)} />
              <Input placeholder="Max price" value={enteredMaxPrice} onChange={(event) => setEnteredMaxPrice(event.target.value)} />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handlePriceChange}>
                Apply
              </Button>
              <Button variant="ghost" onClick={() => setPriceModalOpen(false)}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Button
          colorScheme="teal"
          onClick={resetFilters}
          variant="solid"
          _hover={{
            bgGradient: 'linear(to-r, teal.500, green.500)',
            boxShadow: 'xl',
          }}
          borderRadius="md"
        >
          Reset
        </Button>
      </Flex>
    </Box>
  );
}

export default SearchForm;
