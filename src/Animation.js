import React from "react";
import { Box } from "@chakra-ui/react";

function Animation({ children }) {
  return (
    <Box className="animation-container">
      {children}
    </Box>
  );
}

export default Animation;
