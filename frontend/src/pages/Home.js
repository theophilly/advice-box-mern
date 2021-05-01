import 'intersection-observer';
import React, { useState, useRef } from 'react';
import { ScrollView } from '@cantonjs/react-scroll-view';
import NewPagination from 'react-responsive-pagination';

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
import Pagination from '../components/Pagination';
import paginate from '../helpers/paginate';

export default function Home() {
  const { posts } = useSelector((state) => state.postReducer);
  const myRef = useRef(null);
  const [currentA, setCurrentA] = useState(1);
  const [currentP, setCurrentP] = useState(1);
  const [currentE, setCurrentE] = useState(1);
  const [currentF, setCurrentF] = useState(1);
  const [currentR, setCurrentR] = useState(1);
  const [currentL, setCurrentL] = useState(1);

  const executeScroll = () => {
    myRef.current.scrollIntoView();
  };

  return (
    <Layout>
      <Board></Board>
      <Tabs minH="70vh" variant="soft-rounded" colorScheme="blue">
        <ScrollView isHorizontal>
          <TabList ref={myRef} ml={{ base: '5px', xl: '70px' }} py="5px">
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
                ? paginate(posts, currentA, 9).map((item) => (
                    <Card {...item}></Card>
                  ))
                : Array(13)
                    .fill('')
                    .map(() => <Card></Card>)}
            </Flex>
            {Object.keys(posts.map((item) => item)).length > 9 && (
              <Box mt="20px" onClick={executeScroll}>
                <NewPagination
                  total={
                    posts[0]
                      ? Math.ceil(
                          Object.keys(posts.map((item) => item)).length / 9
                        )
                      : 0
                  }
                  current={currentA}
                  onPageChange={setCurrentA}
                ></NewPagination>
              </Box>
            )}
          </TabPanel>
          <TabPanel>
            <Flex justifyContent="center" wrap="wrap">
              {posts[0]
                ? paginate(
                    posts.filter((item) => item.category === 'Programming'),
                    currentP,
                    9
                  ).map((item) => <Card {...item}></Card>)
                : Array(13)
                    .fill('')
                    .map(() => <Card></Card>)}
            </Flex>
            {Object.keys(
              posts.filter((item) => item.category === 'Programming')
            ).length > 9 && (
              <Box mt="20px" onClick={executeScroll}>
                <NewPagination
                  total={
                    posts[0]
                      ? Math.ceil(
                          Object.keys(
                            posts.filter(
                              (item) => item.category === 'Programming'
                            )
                          ).length / 9
                        )
                      : 0
                  }
                  current={currentP}
                  onPageChange={setCurrentP}
                ></NewPagination>
              </Box>
            )}
          </TabPanel>
          <TabPanel>
            <Flex justifyContent="center" wrap="wrap">
              {posts[0]
                ? paginate(
                    posts.filter((item) => item.category === 'Education'),
                    currentE,
                    9
                  ).map((item) => <Card {...item}></Card>)
                : Array(13)
                    .fill('')
                    .map(() => <Card></Card>)}
            </Flex>
            {Object.keys(posts.filter((item) => item.category === 'Education'))
              .length > 9 && (
              <Box mt="20px" onClick={executeScroll}>
                <NewPagination
                  total={
                    posts[0]
                      ? Math.ceil(
                          Object.keys(
                            posts.filter(
                              (item) => item.category === 'Education'
                            )
                          ).length / 9
                        )
                      : 0
                  }
                  current={currentE}
                  onPageChange={setCurrentE}
                ></NewPagination>
              </Box>
            )}
          </TabPanel>
          <TabPanel>
            <Flex justifyContent="center" wrap="wrap">
              {posts[0]
                ? paginate(
                    posts.filter((item) => item.category === 'Finance'),
                    currentF,
                    9
                  ).map((item) => <Card {...item}></Card>)
                : Array(13)
                    .fill('')
                    .map(() => <Card></Card>)}
            </Flex>
            {Object.keys(posts.filter((item) => item.category === 'Finance'))
              .length > 9 && (
              <Box mt="20px" onClick={executeScroll}>
                <NewPagination
                  total={
                    posts[0]
                      ? Math.ceil(
                          Object.keys(
                            posts.filter((item) => item.category === 'Finance')
                          ).length / 9
                        )
                      : 0
                  }
                  current={currentF}
                  onPageChange={setCurrentF}
                ></NewPagination>
              </Box>
            )}
          </TabPanel>
          <TabPanel>
            <Flex justifyContent="center" wrap="wrap">
              {posts[0]
                ? paginate(
                    posts.filter((item) => item.category === 'Relationships'),
                    currentR,
                    9
                  ).map((item) => <Card {...item}></Card>)
                : Array(13)
                    .fill('')
                    .map(() => <Card></Card>)}
            </Flex>
            {Object.keys(
              posts.filter((item) => item.category === 'Relationships')
            ).length > 9 && (
              <Box mt="20px" onClick={executeScroll}>
                <NewPagination
                  total={
                    posts[0]
                      ? Math.ceil(
                          Object.keys(
                            posts.filter(
                              (item) => item.category === 'Relationships'
                            )
                          ).length / 9
                        )
                      : 0
                  }
                  current={currentR}
                  onPageChange={setCurrentR}
                ></NewPagination>
              </Box>
            )}
          </TabPanel>
          <TabPanel>
            <Flex justifyContent="center" wrap="wrap">
              {posts[0]
                ? paginate(
                    posts.filter((item) => item.category === 'Life'),
                    currentL,
                    9
                  ).map((item) => <Card {...item}></Card>)
                : Array(13)
                    .fill('')
                    .map(() => <Card></Card>)}
            </Flex>
            {Object.keys(posts.filter((item) => item.category === 'Life'))
              .length > 9 && (
              <Box mt="20px" onClick={executeScroll}>
                <NewPagination
                  total={
                    posts[0]
                      ? Math.ceil(
                          Object.keys(
                            posts.filter((item) => item.category === 'Life')
                          ).length / 9
                        )
                      : 0
                  }
                  current={currentL}
                  onPageChange={setCurrentL}
                ></NewPagination>
              </Box>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
}
