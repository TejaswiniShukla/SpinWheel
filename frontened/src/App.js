import { Box, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SpinWheel from "./spinWheel";
import { getTargetNumber, setTargetNumber } from "./services/apiServices";


export default function App() {
  const [randomNumber, setRandomNumber] = useState(""); 
  const [targetNumber, setTargetNumberState] = useState(null); 

  useEffect(() => {
    const fetchTarget = async () => {
      try {
        const data = await getTargetNumber();
        setTargetNumberState(data.target);
      } catch (error) {
        console.error('Error fetching target:', error);
      }
    };
    
    fetchTarget();
  }, []);

  const handleInputChange = async (e) => {
    const number = parseInt(e.target.value, 10);
    setRandomNumber(e.target.value); 
    if (!isNaN(number) && number >= 1 && number <= 60) {
      setTargetNumberState(number); 
      await setTargetNumber(number); 
    }
  };

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
          <SpinWheel length={60} targetNumber={targetNumber} />
          <Box
            sx={{
              width: "300px",
              backgroundColor: "#fff",
              borderRadius: "20px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 600, textAlign: "center" }}
                >
                  Random Number Wheel
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Random Number"
                  placeholder="Enter a number"
                  name="randomNumber"
                  value={randomNumber}
                  onChange={handleInputChange} 
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}
