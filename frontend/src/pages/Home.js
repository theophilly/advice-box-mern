import 'intersection-observer';
import React, { useEffect } from 'react';
import { ScrollView } from '@cantonjs/react-scroll-view';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Flex,
  Divider,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../components/layout';

import Board from '../components/Board';
import { Card } from '../components/Card';
import { getAllAdvice } from '../store/actions/postActions';

export default function Home() {
  const { posts } = useSelector((state) => state.postReducer);
  const postdata = [
    {
      image: 'https://bit.ly/prosper-baba',
      username: 'Admin',
      name: 'Admin',
      title: 'Search for the keywords to learn more ab',
      content:
        ' To ignore, add // eslint-disable-next-line to the line before.nt-disable-next-line to theline before.',
    },

    {
      image: 'https://bit.ly/tioluwani-kolawole',
      username: 'Olamide',
      name: 'Olamide',
      title: ' Search for the keywords to learn more about each warning. ',
      content:
        '   Search for the keywords to learn more about each warning. To ignore, add// esbbbbbbbbbbbbbbbbbbbbbbb',
    },

    {
      image: 'https://bit.ly/kent-c-dodds',
      username: 'Akin',
      name: 'Akin',
      title: 'Search for the keywords to learn more about dd dd',
      content:
        '   Search for the keywords to learn more about each warning. To ignore, add// eslint-disable-next-line to the line1231 before. Search for the keyword come ',
    },

    {
      image: 'https://bit.ly/sage-adebayo',
      username: 'Melvin',
      name: 'Melvin',
      title:
        ' Okay let me quickly do tis eywords to learn more about each warning. ',
      content:
        '   Search for the keywords to learn more about each warning. To ignore, add// eslint-disable-next-line to the line before. ',
    },

    {
      image: 'https://bit.ly/prosper-baba',
      username: 'Ikechujwu',
      name: 'Ikechujwu',
      title: ' Search for the keywords to learn more about each warning. ',
      content:
        '   Search for the keywords to learn more about each warning. To ignore, add// eslint-disable-next-line to the line before. ',
    },

    {
      image: 'https://bit.ly/dan-abramov',
      username: 'Basit',
      name: 'Basit',
      title: ' Search for the keywords to learn more about each warning. ',
      content:
        '   Search for the keywords to learn more about each warning. To ignore, add// eslint-disable-next-line to the line before. ',
    },

    {
      image: 'https://bit.ly/ryan-florence',
      username: 'Daramola',
      name: 'Daramola',
      title: ' Search for the keywords to learn more about each warning. ',
      content:
        '   Search for the keywords to learn more about each warning. To ignore, add// eslint-disable-next-line to the line before. ',
    },

    {
      image: 'https://bit.ly/code-beast',
      username: 'Sleassa',
      name: 'Sleassa',
      title: ' Search for the keywords to learn more about each warning. ',
      content:
        '   Search for the keywords to learn more about each warning. To ignore, add// eslint-disable-next-line to the line before. Search for the keyword to learn more about each warning. To ignore, add // esli ',
    },

    {
      image: 'https://bit.ly/kent-c-dodds',
      username: 'Nonomari',
      name: 'Nonomari',
      title: ' Search for the keywords to learn more about each warning. ',
      content:
        '   Search for the keywords to learn more about each warning. To ignore, add// eslint-disable-next-line to the line before. ',
    },

    {
      image: 'https://bit.ly/prosper-baba',
      username: 'Quadri',
      name: 'Quadri',
      title: ' Search for the keywords to learn more about each warning. ',
      content:
        '   Search for the keywords to learn more about each warning. To ignore, add// eslint-disable-next-line to the line before. ',
    },

    {
      image: 'https://bit.ly/tioluwani-kolawole',
      username: 'Emmanuel',
      name: 'Emmanuel',
      title: ' Search for the keywords to learn more about each warning. ',
      content:
        '   Search for the keywords to learn more about each warning. To ignore, add// eslint-disable-next-line to the line before. ',
    },

    {
      image: 'https://bit.ly/sage-adebayo',
      username: 'Akolade',
      name: 'Akolade',
      title: ' Search for the keywords to learn more about each warning. ',
      content:
        '   Search for the keywords to learn more about each warning. To ignore, add// eslint-disable-next-line to the line before. ',
    },

    {
      image: 'https://bit.ly/code-beast',
      username: 'Dandada',
      name: 'Dandada',
      title: ' Search for the keywords to learn more about each warning. ',
      content:
        '   Search for the keywords to learn more about each warning. To ignore, add// eslint-disable-next-line to the line before. ',
    },
  ];

  return (
    <Layout>
      <Board></Board>
      <Tabs minH="70vh" variant="soft-rounded" colorScheme="blue">
        <ScrollView isHorizontal>
          <TabList ml={{ base: '5px', xl: '70px' }} py="5px">
            <Tab>All</Tab>
            <Tab>Programming</Tab>
            <Tab>Education</Tab>
            <Tab>Finance</Tab>
            <Tab>Relationships</Tab>
            <Tab>Life</Tab>
          </TabList>
        </ScrollView>

        <TabPanels>
          <TabPanel>
            <Flex justifyContent="center" wrap="wrap">
              {posts[0]
                ? posts.map((item) => <Card {...item}></Card>)
                : Array(13)
                    .fill('')
                    .map(() => <Card></Card>)}
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex justifyContent="center" wrap="wrap">
              {posts[0]
                ? posts
                    .filter((item) => item.category === 'Programming')
                    .map((item) => <Card {...item}></Card>)
                : Array(13)
                    .fill('')
                    .map(() => <Card></Card>)}
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex justifyContent="center" wrap="wrap">
              {posts[0]
                ? posts
                    .filter((item) => item.category === 'Education')
                    .map((item) => <Card {...item}></Card>)
                : Array(13)
                    .fill('')
                    .map(() => <Card></Card>)}
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex justifyContent="center" wrap="wrap">
              {posts[0]
                ? posts
                    .filter((item) => item.category === 'Finance')
                    .map((item) => <Card {...item}></Card>)
                : Array(13)
                    .fill('')
                    .map(() => <Card></Card>)}
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex justifyContent="center" wrap="wrap">
              {posts[0]
                ? posts
                    .filter((item) => item.category === 'Relationships')
                    .map((item) => <Card {...item}></Card>)
                : Array(13)
                    .fill('')
                    .map(() => <Card></Card>)}
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex justifyContent="center" wrap="wrap">
              {posts[0]
                ? posts
                    .filter((item) => item.category === 'Life')
                    .map((item) => <Card {...item}></Card>)
                : Array(13)
                    .fill('')
                    .map(() => <Card></Card>)}
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
}
