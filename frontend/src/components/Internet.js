import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import Lottie from 'react-lottie';
import { AiOutlineReload } from 'react-icons/ai';

import internet from '../components/internet.json';

export default function Internet({ tryAgain, times }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: internet,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Box
      d="flex"
      flexDirection="column"
      alignItems="center"
      h={{ base: '170px', sm: '230px', md: '230px' }}
      w={{ base: '250px', sm: '400px', md: '400px' }}
    >
      <Lottie options={defaultOptions} />

      <Box mt="4">
        <Button
          onClick={() => tryAgain(times + 1)}
          size="sm"
          rightIcon={<AiOutlineReload />}
          colorScheme="blue"
        >
          Try again
        </Button>
      </Box>
    </Box>
  );
}
