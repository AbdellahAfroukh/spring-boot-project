import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/LoginPage";
import Dashboard from "./pages/Dashborad";
import ProtectedRoute from "./pages/ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AvailableCarsList from "./components/AvailableCarsList";
import AddCar from "./components/AddCarComponent";
import MyAvailableCarsList from "./components/MyAvailableCarsList";
import MyPendingCarsList from "./components/MyPendingRentals";
import MyRentedCarsList from "./components/MyRentedCarsList";
import CarsIrentedList from "./components/CarsIrentedList";
import CarsIrequestedList from "./components/CarsIrequestedList";
import MyFactures from "./components/MyFactures";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />}>
            <Route path="/home" element={<AvailableCarsList />} />
            <Route path="/my-cars" element={<MyAvailableCarsList />} />
            <Route path="/add-car" element={<AddCar />} />
            <Route path="/my-pending-rentals" element={<MyPendingCarsList />} />
            <Route path="/my-rented-cars" element={<MyRentedCarsList />} />
            <Route path="/my-accepted-rentals" element={<CarsIrentedList />} />
            <Route
              path="/my-requested-rentals"
              element={<CarsIrequestedList />}
            />
            <Route path="/my-factures" element={<MyFactures />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
