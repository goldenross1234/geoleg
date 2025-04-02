// App.js (root)
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NcrMap from "./components/NcrMap";
import { Box, Button, Typography, Container } from "@mui/material";

const LandingPage = () => (
  <Container maxWidth="md" sx={{ mt: 12, textAlign: "center" }}>
    <Typography variant="h3" gutterBottom>
      Welcome to G Oleg PH
    </Typography>
    <Typography variant="subtitle1" gutterBottom>
      Explore the legislative history of NCR cities and provinces
    </Typography>
    <Button variant="contained" color="primary" size="large" component={Link} to="/map">
      View NCR Map
    </Button>
  </Container>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/map" element={<NcrMap />} />
      </Routes>
    </Router>
  );
}

export default App;