import React from "react";
import { Link, Outlet } from "react-router-dom";

const DashboardComponent: React.FC = () => {
  return (
    <div className="vh-100 d-flex flex-column">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100 shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#">
            Dashboard
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  to="/login"
                  className="btn btn-outline-light btn-sm"
                  onClick={() => {
                    localStorage.removeItem("token");
                  }}
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex">
        {/* Sidebar */}
        <div className="bg-dark text-white p-4" style={{ width: "250px" }}>
          <h4 className="mb-4 fw-bold">Menu</h4>
          <ul className="nav flex-column">
            <li className="nav-item mb-3">
              <Link
                className="nav-link text-white d-flex align-items-center"
                to="/home"
              >
                <i className="fas fa-car me-2"></i>
                Available Cars
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link
                className="nav-link text-white d-flex align-items-center"
                to="/add-car"
              >
                <i className="fas fa-plus-circle me-2"></i>
                Add Car
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link
                className="nav-link text-white d-flex align-items-center"
                to="/my-cars"
              >
                <i className="fas fa-car-side me-2"></i>
                My Cars
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link
                className="nav-link text-white d-flex align-items-center"
                to="/my-pending-rentals"
              >
                <i className="fas fa-clock me-2"></i>
                My Pending Rentals
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link
                className="nav-link text-white d-flex align-items-center"
                to="/my-rented-cars"
              >
                <i className="fas fa-calendar-alt me-2"></i>
                My Rented Cars
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link
                className="nav-link text-white d-flex align-items-center"
                to="/my-accepted-rentals"
              >
                <i className="fas fa-check-circle me-2"></i>
                Cars I'm Renting
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link
                className="nav-link text-white d-flex align-items-center"
                to="/my-requested-rentals"
              >
                <i className="fas fa-hourglass-half me-2"></i>
                Cars I Requested
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link
                className="nav-link text-white d-flex align-items-center"
                to="/my-factures"
              >
                <i className="fas fa-file-invoice-dollar me-2"></i>
                My Invoices
              </Link>
            </li>
          </ul>
        </div>

        {/* Content Area */}
        <div className="flex-grow-1 p-4 bg-light">
          <Outlet /> {/* Render the dynamic content here */}
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
