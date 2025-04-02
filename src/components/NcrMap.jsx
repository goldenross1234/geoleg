// components/NcrMap.jsx
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Dialog, DialogTitle, DialogContent, Tabs, Tab, Box, Typography } from "@mui/material";

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
  },
  "Caloocan": {
    historyTabs: [
      { label: "Beginnings", content: "Originally a barrio of Tondo, later a municipality in 1815." },
      { label: "Cityhood", content: "Became a city in 1962." },
      { label: "Modern Era", content: "One of the most populous cities in NCR." }
    ],
    representatives: ["Rep. Luis Matias (19th Congress)"],
    laws: ["Republic Act No. 8794"]
  },
  "Las Piñas": {
    historyTabs: [
      { label: "Origins", content: "Founded as a fishing village during the Spanish era." },
      { label: "Cityhood", content: "Became a city in 1997." },
      { label: "Today", content: "Known for the Bamboo Organ and rapid urbanization." }
    ],
    representatives: ["Rep. Camille Villar (19th Congress)"],
    laws: ["Republic Act No. 8251"]
  },
  "Makati": {
    historyTabs: [
      { label: "Spanish Period", content: "Part of the province of Manila until it became a town." },
      { label: "Development", content: "Transformed into the financial capital of the Philippines." },
      { label: "Cityhood", content: "Achieved city status in 1995." }
    ],
    representatives: ["Rep. Luis Campos Jr. (19th Congress)"],
    laws: ["Republic Act No. 7854"]
  },
  "Malabon": {
    historyTabs: [
      { label: "Early History", content: "Originally part of Tondo province." },
      { label: "Cityhood", content: "Became a city in 2001." },
      { label: "Known For", content: "Heritage houses and pancit Malabon." }
    ],
    representatives: ["Rep. Jaye Lacson-Noel (19th Congress)"],
    laws: ["Republic Act No. 9019"]
  },
  "Mandaluyong": {
    historyTabs: [
      { label: "Origins", content: "Known as the Tiger City of Metro Manila." },
      { label: "Cityhood", content: "Converted into a city in 1994." },
      { label: "Commerce", content: "Hosts many national and international firms." }
    ],
    representatives: ["Rep. Neptali Gonzales II (19th Congress)"],
    laws: ["Republic Act No. 7675"]
  },
  "Marikina": {
    historyTabs: [
      { label: "Spanish Era", content: "Founded in 1630." },
      { label: "Shoe Capital", content: "Known for its shoe industry." },
      { label: "Cityhood", content: "Became a city in 1996." }
    ],
    representatives: ["Rep. Stella Quimbo (19th Congress)"],
    laws: ["Republic Act No. 8223"]
  },
  "Muntinlupa": {
    historyTabs: [
      { label: "Spanish Times", content: "Once a farming and fishing area." },
      { label: "Rapid Growth", content: "Developed into a highly urbanized city." },
      { label: "Cityhood", content: "Became a city in 1995." }
    ],
    representatives: ["Rep. Ruffy Biazon (19th Congress)"],
    laws: ["Republic Act No. 7926"]
  },
  "Navotas": {
    historyTabs: [
      { label: "Establishment", content: "Founded as a town in 1859." },
      { label: "Fishing Industry", content: "Known for its fisheries and port facilities." },
      { label: "Cityhood", content: "Became a city in 2007." }
    ],
    representatives: ["Rep. Toby Tiangco (19th Congress)"],
    laws: ["Republic Act No. 9387"]
  },
  "Parañaque": {
    historyTabs: [
      { label: "Spanish Origins", content: "Established in the 16th century." },
      { label: "Cityhood", content: "Converted into a city in 1998." },
      { label: "Modern Development", content: "Includes the Entertainment City complex." }
    ],
    representatives: ["Rep. Gus Tambunting (19th Congress)"],
    laws: ["Republic Act No. 8507"]
  },
  "Pasay": {
    historyTabs: [
      { label: "Early Settlement", content: "Inhabited before the arrival of the Spanish." },
      { label: "Chartered City", content: "Became a city in 1947." },
      { label: "Today", content: "Home to major airports and convention centers." }
    ],
    representatives: ["Rep. Antonino Calixto (19th Congress)"],
    laws: ["Republic Act No. 8220"]
  },
  "Pasig": {
    historyTabs: [
      { label: "Pre-Colonial Roots", content: "An old settlement along the Pasig River." },
      { label: "Cityhood", content: "Became a city in 1994." },
      { label: "Economic Hub", content: "Ortigas Center is a major business district." }
    ],
    representatives: ["Rep. Roman Romulo (19th Congress)"],
    laws: ["Republic Act No. 7829"]
  },
  "San Juan": {
    historyTabs: [
      { label: "Historical Town", content: "Site of the first battle of the Philippine Revolution." },
      { label: "Cityhood", content: "Became a city in 2007." },
      { label: "Modern Area", content: "Now a commercial and residential center." }
    ],
    representatives: ["Rep. Ysabel Maria Zamora (19th Congress)"],
    laws: ["Republic Act No. 9388"]
  },
  "Taguig": {
    historyTabs: [
      { label: "Fishing Community", content: "Historically home to fishermen and farmers." },
      { label: "Growth", content: "Underwent massive development in recent decades." },
      { label: "BGC Rise", content: "Bonifacio Global City has become a premier business district." }
    ],
    representatives: ["Rep. Ricardo Cruz Jr. (19th Congress)"],
    laws: ["Republic Act No. 8487"]
  },
  "Valenzuela": {
    historyTabs: [
      { label: "Spanish Period", content: "Formerly Polo, part of Bulacan." },
      { label: "Cityhood", content: "Became a city in 1998." },
      { label: "Industrial Hub", content: "Known for its factories and trade centers." }
    ],
    representatives: ["Rep. Wes Gatchalian (19th Congress)"],
    laws: ["Republic Act No. 8526"]
  },
  "Pateros": {
    historyTabs: [
      { label: "Smallest LGU", content: "Only municipality in NCR." },
      { label: "Cultural Identity", content: "Famous for balut production and native crafts." },
      { label: "Resilience", content: "Retains its identity amidst urban surroundings." }
    ],
    representatives: ["Rep. Miguel Ponce III (19th Congress)"],
    laws: ["Local Ordinance 2022-01"]
  }
};

const NcrMap = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch("/ncr_geo.json")
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error("Failed to load GeoJSON:", err));
  }, []);

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
        {geoData && <GeoJSON data={geoData} onEachFeature={onEachFeature} />}
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
