// SearchForm.js
import { useEffect, useState } from 'react';
import { Flex, Button, Select, useToast, Box, useColorModeValue, Modal, ModalCloseButton, ModalHeader, ModalOverlay, ModalFooter, ModalBody, ModalContent, Input } from "@chakra-ui/react";

function SearchForm({ onFloorChange, onRoomsChange, onLocationChange  }) {
  const toast = useToast();
  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedRooms, setSelectedRooms] = useState('');
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [enteredLocation, setEnteredLocation] = useState('');


  const resetFilters = () => {
    document.getElementById("Form").reset();
    setSelectedFloor('');
    setSelectedRooms('');
    setEnteredLocation('');
    toast({
      title: "Filters reset",
      description: "All filters have been reset to default.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  useEffect(() => {
    console.log('SearchForm rendered');
  }, []);
  const handleFloorChange = (event) => {
    setSelectedFloor(event.target.value);
    onFloorChange(event.target.value); // Trigger the fetch operation when the floor changes
  };

  const handleRoomsChange = (event) => {
    setSelectedRooms(event.target.value);
    onRoomsChange(event.target.value); // Trigger the fetch operation when the rooms change
  };
  const handleLocationChange = () => {
    onLocationChange(enteredLocation);
    setLocationModalOpen(false);
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
        <Select placeholder="Category" flex="1" variant="filled" _hover={{ boxShadow: "lg" }} borderRadius="md">
          <option>Maison</option>
          <option>Appartement</option>
          <option>Villa</option>
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
        <Select placeholder="Floor" flex="1" variant="filled" _hover={{ boxShadow: "lg" }} borderRadius="md" value={selectedFloor}
  onChange={handleFloorChange}>
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
        <Select placeholder="Price" flex="1" variant="filled" _hover={{ boxShadow: "lg" }} borderRadius="md">
          {/* Add options here */}
        </Select>
        <Select placeholder="Surface" flex="1" variant="filled" _hover={{ boxShadow: "lg" }} borderRadius="md">
          <option>200 m2</option>
        </Select>
        <Select placeholder="Rooms" flex="1" variant="filled" _hover={{ boxShadow: "lg" }} borderRadius="md" value={selectedRooms}
  onChange={handleRoomsChange}>
          <option value="">All</option>
  {Array.from({ length: 10 }, (_, i) => (
    <option key={i + 1} value={i + 1}>
      {i + 1}
    </option>
  ))}
        </Select>
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
