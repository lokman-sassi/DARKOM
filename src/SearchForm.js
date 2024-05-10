import { Flex, Button, Select, useToast, Box } from "@chakra-ui/react";

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

  return (
    <Box borderBottom="1px solid #E2E8F0">
    <Flex id="Form" as="form" direction="row" justify="space-between" p={4} align="center" mx="auto" maxWidth="800px">
      <Select placeholder="Sale type" mr={4} width="auto">
        <option>Rent</option>
        <option>Sell</option>
      </Select>
      <Select placeholder="Location" mr={4} width="auto">
        <option>Constantine</option>
        <option>Alger</option>
        <option>Oran</option>
      </Select>
      <Select placeholder="Price" mr={4} width="auto">
        
      </Select>
      <Select placeholder="Surface" mr={4} width="auto">
        <option>200 m2</option>
      </Select>
      <Select placeholder="Rooms" mr={4} width="auto">
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </Select>
      <Button colorScheme="red" onClick={resetFilters} variant="outline">Reset</Button>
    </Flex>
    </Box>
  );
}

export default SearchForm;
