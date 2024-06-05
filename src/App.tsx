import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { ConfigProvider } from "antd";
import Login from "./pages/Login";
import Map from "./pages/Map";
import StoreOffers from "./components/StoreOffers";

function App() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            siderBg: "#023047",
          },
        },
      }}
    >
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/map" element={<Map/>} />
        <Route path="/store" element={<StoreOffers/>} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
