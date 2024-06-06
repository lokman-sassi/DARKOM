import React, { useState } from 'react';
import { Image, Icon, Stack, Heading, Text, Button, Flex, IconButton, CardBody, CardFooter, Card, useColorModeValue } from '@chakra-ui/react';
//import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaBed, FaMapMarkerAlt, FaDollarSign, FaRegCalendarAlt, FaRulerCombined, FaTag, FaLink } from 'react-icons/fa'; 
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';




function CardItem({ listing }) {
  const [isFavorite, setIsFavorite] = useState(false); // Local state to manage favorite status
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();


  // Function to handle the favorite toggle
  const handleFavoriteToggle = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/account'); // Redirect to login page if not authenticated
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8000/api/favorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ listingId: listing._id }),
      });
  
      if (response.ok) {
        setIsFavorite(!isFavorite);
      } else {
        console.error('Failed to toggle favorite');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  // Function to handle missing data about the price
  const formatPrice = (price) => {
    const unspecifiedPrices = ["Demandez le prix au vendeur                  ", "Gratuit                  ", "FREE", null];
    return unspecifiedPrices.includes(price) ? "Not mentioned" : price;
  };

  // Function to go to the next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === listing.Images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to go to the previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? listing.Images.length - 1 : prevIndex - 1
    );
  };

  const formatDate = (date) => {
    if (date && date.includes('T')) {
      return date.split('T')[0];
    }
    return date || "Not mentioned";
  };

  return (
    <Flex justify="center" align="center" minHeight="50vh" p={4}>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        boxShadow='2xl'
        overflow='hidden'
        variant='outline'
        minH="300px"
        w="800px"
        h="400px"
        position="relative"
        bg={useColorModeValue('white', 'gray.900')}
        borderRadius="lg"
        transition="transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
        _hover={{
          transform: 'scale(1.05)',
          boxShadow: '4xl',
        }}
      >
        {/* Carousel container */}
        <Flex position="relative">
          {listing.Images[0] !== "No images were found" ? (
            <>
              <IconButton
                aria-label="Previous image"
                icon={<FaChevronLeft />}
                position="absolute"
                left="2"
                top="50%"
                transform="translateY(-50%)"
                onClick={prevImage}
                zIndex="1"
                size="lg"
                variant="ghost"
                color="white"
                _hover={{ bg: 'rgba(0, 0, 0, 0.4)' }}
                transition="background-color 0.2s"
              />
              <Image
                objectFit='cover'
                boxSize="400px"
                src={listing.Images[currentImageIndex]}
                alt={`Listing Image ${currentImageIndex + 1}`}
              />
              <IconButton
                aria-label="Next image"
                icon={<FaChevronRight />}
                position="absolute"
                right="2"
                top="50%"
                transform="translateY(-50%)"
                onClick={nextImage}
                zIndex="1"
                size="lg"
                variant="ghost"
                color="white"
                _hover={{ bg: 'rgba(0, 0, 0, 0.4)' }}
                transition="background-color 0.2s"
              />
            </>
          ) : (
            <Image
              objectFit='cover'
              boxSize="400px"
              src="./no-image.jpg"
              alt='No Image Available'
            />
          )}
        </Flex>
        {/* Card content */}
        <Stack>
          <CardBody>
            <Heading size='md'>{listing.Title}</Heading>
            <Flex direction="column" mt={4}>
              <Flex align="center" mb={2}>
                <FaTag />
                <Text ml={2}>{listing.CATEGORY.length > 0 ? listing.CATEGORY.join(', ') : "Not mentioned"}</Text>
              </Flex>
              <Flex align="center" mb={2}>
                <FaDollarSign />
                <Text ml={2}>{formatPrice(listing.Price)}</Text>
              </Flex>
              <Flex align="center" mb={2}>
                <FaMapMarkerAlt />
                <Text ml={2}>{listing.Location || listing.LOCATION}</Text>
              </Flex>
              <Flex align="center" mb={2}>
                <FaBed />
                <Text ml={2}>{listing.ROOMS.length > 0 ? listing.ROOMS.join(', ') : "Not mentioned"}</Text>
              </Flex>
              <Flex align="center" mb={2}>
                <FaLink />
                <Text ml={2}>{formatPrice(listing.Source)}</Text>
              </Flex>
              <Flex align="center" mb={2}>
                <FaRegCalendarAlt />
                <Text ml={2}>{formatDate(listing.Date)}</Text>
              </Flex>
              <Flex align="center">
                <FaRulerCombined />
                <Text ml={2}>{listing.Surface === "0" && listing.SURFACE.length > 0 ? `${listing.SURFACE.join(', ')} m²` : (listing.Surface ? `${listing.Surface}` : "Not mentioned")}</Text>
              </Flex>
            </Flex>
          </CardBody>

          <CardFooter>
            <a href={listing.Link} target='_blank' rel="noopener noreferrer">
              <Button type="button" variant='outline' colorScheme='green'>Details</Button>
            </a>
            <IconButton
              aria-label="Add to favorites"
              icon={<Icon viewBox="0 0 24 24">
                <path
                  fill={isFavorite ? "red" : "none"}
                  stroke="red"
                  strokeWidth="2"
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </Icon>}
              colorScheme={isFavorite ? 'red' : 'none'}
              _hover={{ bg: "gray.100" }}
              onClick={handleFavoriteToggle}
              variant="ghost"
              ml={4}
            />
          </CardFooter>
        </Stack>
      </Card>
    </Flex>
  );
}

export default CardItem;
