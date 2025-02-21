import { useEffect, useState } from "react";
import { CarRequest } from "../types/carRequest";
import { fetchMyAvailableCars, deleteCar } from "../api/carService";

function MyAvailableCarsList() {
  const [cars, setCars] = useState<CarRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(function () {
    async function fetchData() {
      try {
        const availableCars = await fetchMyAvailableCars();
        setCars(availableCars);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(String(error));
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  const handleDeleteCar = async (carId: number) => {
    try {
      await deleteCar(carId);
      setCars((prevCars) => prevCars.filter((car) => car.id !== carId));
      alert("Car deleted successfully!");
    } catch (error) {
      console.error("Error deleting car:", error);
      alert("Failed to delete car. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-5">Error: {error}</div>;
  }

  return (
    <div className="container-fluid p-4">
      <h1 className="mb-4 text-center">My Available Cars</h1>
      <div className="table-responsive">
        <table className="table table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th scope="col" className="text-center">
                Brand
              </th>
              <th scope="col" className="text-center">
                Model
              </th>
              <th scope="col" className="text-center">
                Color
              </th>
              <th scope="col" className="text-center">
                Price per day
              </th>
              <th scope="col" className="text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cars.map(function (car) {
              return (
                <tr key={car.id} style={{ cursor: "pointer" }}>
                  <td className="text-center">{car.brand}</td>
                  <td className="text-center">{car.model}</td>
                  <td className="text-center">{car.color}</td>
                  <td className="text-center">{car.price_per_day}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCar(car.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyAvailableCarsList;
