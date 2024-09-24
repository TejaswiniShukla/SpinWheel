import { Box } from "@mui/material";
import React, {  } from "react";
import SpinWheel from "./spinWheel";


export default function App() {

  return (
    <>
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          background: "linear-gradient(#fff, #5B7CE7FF)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <SpinWheel/>
          
        </Box>
      </Box>
    </>
  );
}

