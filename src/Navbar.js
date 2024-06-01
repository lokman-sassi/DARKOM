// Navbar.js
import { Box, Flex, Image, Button, useColorMode, useColorModeValue, Text } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };

    // Check token in local storage on mount and whenever local storage changes
    checkToken();
    window.addEventListener('storage', checkToken);

    // Clean up event listener
    return () => {
      window.removeEventListener('storage', checkToken);
    };
  }, []);

  const logout = () => {
    console.log('Logout function called'); // Add this line
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/'); // Redirect to home page
    window.location.reload(); // Force a refresh of the page
  };

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
          <Link to="/">
            <Image src="./darkom1-removebg.png" alt="DARKOM logo" h='66px' w='100px'/>
          </Link>
        </Flex>

        {/* Right-aligned items */}
        <Flex align="center" justify="flex-end" flex="1">
          {isAuthenticated && (
            <>
              <NavItem label="Logout" to="/" onClick={logout} />
              <NavItem label="My Favorites" to="/favorites" />
            </>
          )}
          {!isAuthenticated && (
            <>
              <NavItem label="Connect" to="/account" />
            </>
          )}
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

function NavItem({ label, to, onClick }) {
  return (
    <Link to={to || '#'} onClick={onClick}>
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
