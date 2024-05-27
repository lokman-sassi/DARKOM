// Navbar.js
import { Box, Flex, Image, Button, useColorMode, useColorModeValue, Text } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      px={4}
      position="fixed"
      zIndex="3"
      width="100%"
      top="0"
      boxShadow="lg"
    >
      <Flex h={66} alignItems={'center'} justifyContent={'space-between'}>
        {/* Left-aligned items */}
        <Flex align="center" justify="flex-start" flex="1" flexWrap="wrap">
          <NavItem label="Vente" />
          <NavItem label="Location" />
          <NavItem label="Location Vacances" />
          <NavItem label="Echange" />
        </Flex>

        {/* Center-aligned item */}
        <Flex justify="center" align="center" flex="1">
          <Image src="./darkom1-removebg.png" alt="DARKOM logo" h='66px' w='100px'/>
        </Flex>

        {/* Right-aligned items */}
        <Flex align="center" justify="flex-end" flex="1">
          <NavItem label="My Account" to="/account" />
          <NavItem label="My Favorites" />
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

function NavItem({ label, to }) {
  return (
    <Link to={to || '#'}>
      <Text
        mx={2}
        p={2}
        fontSize="sm"
        cursor="pointer"
        position="relative"
        _hover={{
          color: "teal.500",
          _before: {
            content: '""',
            position: "absolute",
            width: "100%",
            height: "2px",
            bottom: "0",
            left: "0",
            backgroundColor: "teal.500",
            visibility: "visible",
            transform: "scaleX(1)",
            transition: "all 0.3s ease-in-out",
          },
          _after: {
            content: '""',
            position: "absolute",
            width: "100%",
            height: "100%",
            top: "0",
            left: "0",
            backgroundColor: "rgba(0, 128, 128, 0.1)",
            borderRadius: "8px",
            transition: "all 0.3s ease-in-out",
          },
        }}
        _before={{
          content: '""',
          position: "absolute",
          width: "100%",
          height: "2px",
          bottom: "0",
          left: "0",
          backgroundColor: "teal.500",
          visibility: "hidden",
          transform: "scaleX(0)",
          transition: "all 0.3s ease-in-out",
        }}
        _after={{
          content: '""',
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "0",
          left: "0",
          backgroundColor: "transparent",
          borderRadius: "8px",
          transition: "all 0.3s ease-in-out",
        }}
      >
        {label}
      </Text>
    </Link>
  );
}
