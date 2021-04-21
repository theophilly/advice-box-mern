import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Box } from '@chakra-ui/react';

export default function Layout(props) {
  return (
    <Box minH="100vh" d="flex" flexDirection="column">
      <Header></Header>
      <Box flex="1">{props.children}</Box>
      <Footer></Footer>
    </Box>
  );
}
