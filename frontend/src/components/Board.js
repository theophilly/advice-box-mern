import React from "react";
import { Flex, Box, Spacer } from "@chakra-ui/react";

export default function Board() {
  return (
    <div>
      <Flex
        border="1px solid red"
        sx={{ padding: "0px calc((100vw - 1200px) / 2)" }}
      >
        <Box>this is the first section</Box>
        <Spacer />
        <Box> this is the second section</Box>
      </Flex>
    </div>
  );
}
