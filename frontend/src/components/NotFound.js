import React from 'react';
import {
  Image,
  Flex,
  Box,
  Text,
  Icon,
  Tag,
  Button,
  useDisclosure,
  useToast,
  FormErrorMessage,
  FormControl,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Textarea,
  Spacer,
} from '@chakra-ui/react';
import Lottie from 'react-lottie';
import { AiOutlineReload } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import notfound from '../components/notfound.json';

export default function NotFound() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: notfound,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Box
      d="flex"
      flexDirection="column"
      alignItems="center"
      h={{ base: '200px', sm: '300px', md: '300px' }}
      w={{ base: '250px', sm: '400px', md: '400px' }}
    >
      <Lottie options={defaultOptions} />

      <Box mt="4">
        <Link to="/home">
          <Button size="sm" rightIcon={<AiOutlineReload />} colorScheme="blue">
            Go Home
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
