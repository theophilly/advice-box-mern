import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Text, Box } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box
      d="flex"
      bgImage="url(https://websitedemos.net/childcare-blog-02/wp-content/uploads/sites/760/2021/01/child-care-template-yellow-blob-shape.svg)"
      mt="40px"
      bgPos="right"
      objectFit="right right"
      bgRepeat="no-repeat"
      fontFamily="Poppins, sans-serif"
      padding={{ base: '10px', xl: '20px calc((100vw - 1100px) / 2)' }}
      sx={{
        '@media only screen and (max-width: 759px) ': {
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      <Box flex="0.6">
        <Box
          d="flex"
          alignItems="center"
          justifyContent={{ 'base': 'center', 'md': 'flex-start' }}
          className="logo"
        >
          <i className="fab fa-asymmetrik"></i> <span>Advice</span> Box
        </Box>
        <Text mt="20px" width={{ 'sm': '100%', 'md': '70%' }}>
          Thank you for taking time to check this app. I do hope you are having
          fun accessing it
        </Text>
      </Box>
      <Box>
        <Text
          fontFamily="Poppins, sans-serif"
          fontSize="1.3rem"
          fontWeight="500"
          mt={{ base: '20px', md: '0px' }}
        >
          Links
        </Text>
        <Link to="/">
          <Text
            fontWeight={{ base: 'normal', sm: 'normal' }}
            mt={{ base: '10px', md: '20px' }}
            _hover={{ color: '#3182CE' }}
          >
            Home
          </Text>
        </Link>
        <Link to="/about">
          <Text
            _hover={{ color: '#3182CE' }}
            fontWeight={{ base: 'normal', sm: 'normal' }}
          >
            About
          </Text>
        </Link>
      </Box>
    </Box>
  );
}
