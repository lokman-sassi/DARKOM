import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Text, useToast, VStack, Heading, Container, SimpleGrid, useColorModeValue } from '@chakra-ui/react';

function Auth() {
  const [isLogin, setIsLogin] = useState(false); // Default to Signup form
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const toast = useToast();

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically send the form data to your server
    // For now, we'll just display a success message
    toast({
      title: "Success!",
      description: `You are now ${isLogin ? 'logged in' : 'signed up'}!`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleForgotPassword = () => {
    if (!formData.email) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      // Here you would typically handle sending a password reset email
      // For now, we'll just display a success message
      toast({
        title: "Password reset link sent!",
        description: "Check your email for the password reset link.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const bg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Box
        bg={bg}
        color={textColor}
        boxShadow={{ base: 'none', md: 'xl' }}
        p={{ base: '6', sm: '8' }}
        borderRadius={{ base: 'none', md: 'xl' }}
      >
        <VStack spacing="8">
          <VStack spacing="6" align="start">
            <Heading>{isLogin ? 'Log in to your account' : 'Create a new account'}</Heading>
            <Text fontSize="md" color="gray.600">
              {isLogin ? 'Welcome back! Please enter your details.' : 'Join us today! Please enter your details to create an account.'}
            </Text>
          </VStack>
          <Box as="form" w="full" onSubmit={handleSubmit}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {!isLogin && (
                <>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input name="firstName" type="text" onChange={handleInputChange} />
                  </FormControl>
                  <FormControl id="lastName" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input name="lastName" type="text" onChange={handleInputChange} />
                  </FormControl>
                </>
              )}
            </SimpleGrid>
            <FormControl id="email" isRequired mt={6}>
              <FormLabel>Email Address</FormLabel>
              <Input name="email" type="email" onChange={handleInputChange} />
            </FormControl>
            <FormControl id="password" isRequired mt={6}>
              <FormLabel>Password</FormLabel>
              <Input name="password" type="password" onChange={handleInputChange} />
            </FormControl>
            {isLogin && (
              <Text mt={2} color="teal.500" cursor="pointer" onClick={handleForgotPassword}>
                Forgot your password?
              </Text>
            )}
            {!isLogin && (
              <FormControl id="confirmPassword" isRequired mt={6}>
                <FormLabel>Confirm Password</FormLabel>
                <Input name="confirmPassword" type="password" onChange={handleInputChange} />
              </FormControl>
            )}
            <Button colorScheme="teal" mt={6} w="full" type="submit">
              {isLogin ? 'Log in' : 'Sign up'}
            </Button>
          </Box>
          <Text mt={4}>
            {isLogin ? 'Need an account?' : 'Already have an account?'}
            <Button variant="link" colorScheme="teal" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign up' : 'Log in'}
            </Button>
          </Text>
        </VStack>
      </Box>
    </Container>
  );
}

export default Auth;
