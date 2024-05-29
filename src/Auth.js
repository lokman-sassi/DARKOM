import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
  Heading,
  Text,
  Container,
  SimpleGrid,
} from '@chakra-ui/react';

function Auth() {
  const [isLogin, setIsLogin] = useState(false); // Default to Signup form
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast({
        title: 'Error',
        description: "Passwords don't match.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    const url = isLogin ? 'http://localhost:8000/api/login' : 'http://localhost:8000/api/signup';
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.status) {
        // Handle successful authentication
        toast({
          title: 'Success',
          description: data.message,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        localStorage.setItem('token', data.token); // Save the token
        // Redirect to profile or dashboard page
      } else {
        // Handle errors
        toast({
          title: 'Authentication Error',
          description: data.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Request Error',
        description: error.toString(),
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        <Stack spacing="6" align="start">
          <Heading>{isLogin ? 'Log in to your account' : 'Create a new account'}</Heading>
          <Text fontSize="md" color="gray.600">
            {isLogin ? 'Welcome back! Please enter your details.' : 'Join us today! Please enter your details to create an account.'}
          </Text>
        </Stack>
        <Box as="form" w="full" onSubmit={handleSubmit}>
          {!isLogin && (
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FormControl id="firstName" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input name="first_name" type="text" onChange={handleChange} />
              </FormControl>
              <FormControl id="lastName" isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input name="last_name" type="text" onChange={handleChange} />
              </FormControl>
            </SimpleGrid>
          )}
          <FormControl id="email" isRequired mt={6}>
            <FormLabel>Email Address</FormLabel>
            <Input name="email" type="email" onChange={handleChange} />
          </FormControl>
          <FormControl id="password" isRequired mt={6}>
            <FormLabel>Password</FormLabel>
            <Input name="password" type="password" onChange={handleChange} />
          </FormControl>
          {!isLogin && (
            <FormControl id="confirmPassword" isRequired mt={6}>
              <FormLabel>Confirm Password</FormLabel>
              <Input name="confirmPassword" type="password" onChange={handleChange} />
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
      </Stack>
    </Container>
  );
}

export default Auth;
