import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CarRequest } from "../types/carRequest";

const AddCar = () => {
  const [formData, setFormData] = useState<CarRequest>({
    id: 0,
    brand: "",
    model: "",
    color: "",
    plate_number: "",
    distance_driven: 0,
    price_per_day: 0,
    addons_per_km: 0,
    km_limit_for_addons: 0,
  });

  const [brandSuggestions, setBrandSuggestions] = useState<string[]>([]);
  const [modelSuggestions, setModelSuggestions] = useState<string[]>([]);
  const [colorSuggestions, setColorSuggestions] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "brand") {
      fetchBrandSuggestions(value);
      fetchModelSuggestions("", value);
    } else if (name === "model" && formData.brand) {
      fetchModelSuggestions(value, formData.brand);
    } else if (name === "color") {
      fetchColorSuggestions(value);
    }
  };

  const fetchBrandSuggestions = async (query: string) => {
    if (query.length > 2) {
      try {
        const response = await axios.get(
          `https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json`
        );
        const brands = response.data.Results.map((make: any) => make.Make_Name);
        const filteredBrands = brands.filter((brand: string) =>
          brand.toLowerCase().includes(query.toLowerCase())
        );
        setBrandSuggestions(filteredBrands);
      } catch (error) {
        console.error("Error fetching brand suggestions:", error);
      }
    } else {
      setBrandSuggestions([]);
    }
  };

  const fetchModelSuggestions = async (query: string, brand: string) => {
    if (brand) {
      try {
        const response = await axios.get(
          `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${brand}?format=json`
        );
        const models = response.data.Results.map(
          (model: any) => model.Model_Name
        );
        const filteredModels = query
          ? models.filter((model: string) =>
              model.toLowerCase().includes(query.toLowerCase())
            )
          : models;
        setModelSuggestions(filteredModels);
      } catch (error) {
        console.error("Error fetching model suggestions:", error);
      }
    } else {
      setModelSuggestions([]);
    }
  };

  const fetchColorSuggestions = async (query: string) => {
    if (query.length > 2) {
      try {
        const response = await axios.get(
          `https://api.color.pizza/v1/?name=${query}`
        );
        if (response.data && response.data.colors) {
          const colors = response.data.colors.map((color: any) => color.name);
          setColorSuggestions(colors);
        } else {
          setColorSuggestions([]);
        }
      } catch (error) {
        setColorSuggestions([]);
      }
    } else {
      setColorSuggestions([]);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("api/cars/add", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Car added successfully!");
      navigate("/my-cars");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Adding car failed:",
          error.response?.data || error.message
        );
      } else {
        console.error("Adding car failed:", error);
      }
      alert("Adding car failed. Please try again.");
    }
  };

  return (
    <div className="container mt-4 d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow-lg w-100" style={{ maxWidth: "800px" }}>
        <h2 className="card-title text-center mb-4">Add Car</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Brand</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
                className="form-control form-control-lg"
                placeholder="Enter car brand"
                list="brand-suggestions"
              />
              <datalist id="brand-suggestions">
                {brandSuggestions.map((brand, index) => (
                  <option key={index} value={brand} />
                ))}
              </datalist>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Model</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
                className="form-control form-control-lg"
                placeholder="Enter car model"
                list="model-suggestions"
              />
              <datalist id="model-suggestions">
                {modelSuggestions.map((model, index) => (
                  <option key={index} value={model} />
                ))}
              </datalist>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Color</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                required
                className="form-control form-control-lg"
                placeholder="Enter car color"
                list="color-suggestions"
              />
              <datalist id="color-suggestions">
                {colorSuggestions.map((color, index) => (
                  <option key={index} value={color} />
                ))}
              </datalist>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Plate Number</label>
              <input
                type="text"
                name="plate_number"
                value={formData.plate_number}
                onChange={handleChange}
                required
                className="form-control form-control-lg"
                placeholder="Enter plate number"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Distance Driven (km)</label>
              <input
                type="number"
                name="distance_driven"
                value={formData.distance_driven}
                onChange={handleChange}
                required
                defaultValue={0}
                className="form-control form-control-lg"
                placeholder="Enter distance driven"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Price Per Day (MAD)</label>
              <input
                type="number"
                name="price_per_day"
                value={formData.price_per_day}
                onChange={handleChange}
                required
                defaultValue={300}
                className="form-control form-control-lg"
                placeholder="Enter price per day"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Addons Per Km (MAD)</label>
              <input
                type="number"
                name="addons_per_km"
                value={formData.addons_per_km}
                onChange={handleChange}
                required
                defaultValue={0}
                className="form-control form-control-lg"
                placeholder="Enter addons per km"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Km Limit For Addons</label>
              <input
                type="number"
                name="km_limit_for_addons"
                value={formData.km_limit_for_addons}
                onChange={handleChange}
                required
                defaultValue={1000}
                className="form-control form-control-lg"
                placeholder="Enter km limit for addons"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-lg w-100 mt-4">
            <i className="fas fa-car me-2"></i> Add Car
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
