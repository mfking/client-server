import React from "react";
import Box from "@mui/material/Box";
import { TextInput } from "./components/TextInput";
import { CurrentTime } from "./components/CurrentTime";
import "./App.css";

function App() {
  return (
    <Box className="App">
      <CurrentTime />
      <TextInput />
    </Box>
  );
}

export default App;
