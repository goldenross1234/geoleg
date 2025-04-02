// components/NcrMap.jsx
import React, { useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Dialog, DialogTitle, DialogContent, Tabs, Tab, Box, Typography } from "@mui/material";
import ncrGeoJson from "../data/ncr_geo.json";

const mockCityData = {
  "Manila": {
    historyTabs: [
      { label: "Origins", content: "Founded in 1571 by Spanish conquistadors." },
      { label: "Cityhood", content: "Chartered as a city in 1901 under American rule." },
      { label: "Modern Era", content: "Now a highly urbanized city and capital of the Philippines." }
    ],
    representatives: ["Rep. Juan Dela Cruz (19th Congress)", "Rep. Maria Santos (18th Congress)"],
    laws: ["Ordinance No. 123", "Republic Act No. 9001"]
  },
  "Quezon City": {
    historyTabs: [
      { label: "Establishment", content: "Founded in 1939 and named after President Manuel L. Quezon." },
      { label: "Capital Era", content: "Served as the national capital from 1948 to 1976." },
      { label: "Current Status", content: "Largest city in Metro Manila in terms of population." }
    ],
    representatives: ["Rep. Ana Rivera (19th Congress)", "Rep. Carlos Reyes (18th Congress)"],
    laws: ["City Ordinance No. 2021-45", "Republic Act No. 11234"]
  }
};

const NcrMap = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: () => {
        const cityName = feature.properties.name;
        setSelectedCity({
          name: cityName,
          ...mockCityData[cityName]
        });
        setTabIndex(0);
        setModalOpen(true);
      }
    });
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <>
      <MapContainer center={[14.6, 121.0]} zoom={12} style={{ height: "100vh", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON data={ncrGeoJson} onEachFeature={onEachFeature} />
      </MapContainer>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{selectedCity?.name}</DialogTitle>
        <DialogContent>
          <Tabs value={tabIndex} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
            <Tab label="Legislative History" />
            <Tab label="Representatives" />
            <Tab label="Laws" />
          </Tabs>

          <Box sx={{ mt: 2 }}>
            {tabIndex === 0 && (
              <Box>
                {selectedCity?.historyTabs?.map((item, i) => (
                  <Box key={i} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1">{item.label}</Typography>
                    <Typography variant="body2">{item.content}</Typography>
                  </Box>
                ))}
              </Box>
            )}
            {tabIndex === 1 && (
              <Box>
                <Typography variant="subtitle1">Representatives</Typography>
                <ul>
                  {selectedCity?.representatives?.map((rep, i) => (
                    <li key={i}>{rep}</li>
                  ))}
                </ul>
              </Box>
            )}
            {tabIndex === 2 && (
              <Box>
                <Typography variant="subtitle1">Laws</Typography>
                <ul>
                  {selectedCity?.laws?.map((law, i) => (
                    <li key={i}>{law}</li>
                  ))}
                </ul>
              </Box>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NcrMap;
