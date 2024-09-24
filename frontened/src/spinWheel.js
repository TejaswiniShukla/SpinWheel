import React, { useState } from "react";
import "./spinWheel.css";
import { Wheel } from "react-custom-roulette";
import { setTargetNumber } from "./services/apiServices";

function SpinWheel({ targetNumber }) {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const data = Array.from({ length: 60 }, (_, i) => ({ option: `${i + 1}` }));

  const handleSpinClick = async() => {
    if (!isValid) {
      alert("Please enter a valid number between 1 and 60");
      return;
    }
    const newPrizeNumber = parseInt(userInput) - 1;
    await setTargetNumber(newPrizeNumber);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);

  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      setErrorMessage("Only numeric values are allowed");
      setIsValid(false);
      setUserInput(value);
      return;
    }
    setUserInput(value);
    const number = parseInt(value);
    if (number >= 1 && number <= 60) {
      setIsValid(true);
      setErrorMessage(""); 
    } else {
      setIsValid(false);
      setErrorMessage("Please enter a number between 1 and 60");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div style={{ marginBottom: "2rem" }}>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={() => {
            setMustSpin(false);
          }}
          backgroundColors={["#ff8f43", "#70bbe0", "#0b3351", "#f9dd50"]}
          textColors={["#ffffff"]}
          outerBorderColor="#eeeeee"
          outerBorderWidth={10}
          innerRadius={0}
          innerBorderColor="#30261a"
          innerBorderWidth={0}
          radiusLineColor="#eeeeee"
          radiusLineWidth={1}
          fontSize={12}
          perpendicularText={true}
          spinDuration={3}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <input
          type="text"
          min="1"
          max="60"
          value={userInput}
          onChange={handleChange}
          placeholder="Enter a number (1-60)"
          style={{
            width: "200px",
            padding: "0.5rem",
            fontSize: "1rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        {errorMessage && (
          <div style={{ color: "red", fontSize: "0.9rem" }}>{errorMessage}</div>
        )}
        <button
          onClick={handleSpinClick}
          disabled={!isValid || mustSpin}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            backgroundColor: !isValid || mustSpin ? "#cccccc" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: !isValid || mustSpin ? "not-allowed" : "pointer",
          }}
        >
          {mustSpin ? "Spinning..." : "SPIN"}
        </button>
      </div>
    </div>
  );
}

export default SpinWheel;



// function SpinWheel({ targetNumber }) {
//   const [mustSpin, setMustSpin] = useState(false);
//   const [prizeNumber, setPrizeNumber] = useState(0);
//   const [userInput, setUserInput] = useState("");
//   const [isValid, setIsValid] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const data = Array.from({ length: 60 }, (_, i) => ({ option: `${i + 1}` }));

//   const fetchTarget = async () => {
//     try {
//       const data = await getTargetNumber();
//       setPrizeNumber(data.target);
//     } catch (error) {
//       console.error("Error fetching target:", error);
//     }
//   };


//   const handleSpinClick = async () => {
//     if (!isValid) {
//       alert("Please enter a valid number between 1 and 60");
//       return;
//     }
//     const newPrizeNumber = parseInt(userInput) - 1;
//     setMustSpin(true);
//     const res=await setTargetNumber(newPrizeNumber);
//     console.log(res);
//     if(res?.success){
//       fetchTarget();
//     }
//   };

//   const handleChange = (e) => {
//     const value = e.target.value;
//     if (!/^\d*$/.test(value)) {
//       setErrorMessage("Only numeric values are allowed");
//       setIsValid(false);
//       setUserInput(value);
//       return;
//     }
//     setUserInput(value);
//     const number = parseInt(value);
//     if (number >= 1 && number <= 60) {
//       setIsValid(true);
//       setErrorMessage("");
//     } else {
//       setIsValid(false);
//       setErrorMessage("Please enter a number between 1 and 60");
//     }
//   };


