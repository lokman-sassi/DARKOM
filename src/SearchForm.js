// SearchForm.js
import { useEffect } from 'react';
import { Flex, Button, Select, useToast, Box, useColorModeValue } from "@chakra-ui/react";

function SearchForm() {
  const toast = useToast();

  const resetFilters = () => {
    document.getElementById("Form").reset();
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
        <Select placeholder="Location" flex="1" variant="filled" _hover={{ boxShadow: "lg" }} borderRadius="md">
          {/* Add options here */}
        </Select>
        <Select placeholder="Floor" flex="1" variant="filled" _hover={{ boxShadow: "lg" }} borderRadius="md">
          {/* Add options here */}
        </Select>
        <Select placeholder="Price" flex="1" variant="filled" _hover={{ boxShadow: "lg" }} borderRadius="md">
          {/* Add options here */}
        </Select>
        <Select placeholder="Surface" flex="1" variant="filled" _hover={{ boxShadow: "lg" }} borderRadius="md">
          <option>200 m2</option>
        </Select>
        <Select placeholder="Rooms" flex="1" variant="filled" _hover={{ boxShadow: "lg" }} borderRadius="md">
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
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
