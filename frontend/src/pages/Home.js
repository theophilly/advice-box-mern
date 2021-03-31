import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Layout from "../components/layout";
import Draw from "../components/Draw";
import Board from "../components/Board";

export default function Home() {
  return (
    <Layout>
      {/* <Tabs variant="soft-rounded" colorScheme="green">
        <TabList>
          <Tab>All</Tab>
          <Tab>Programming</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Draw></Draw> */}

      <Board></Board>
    </Layout>
  );
}
