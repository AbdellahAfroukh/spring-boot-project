import { useEffect, useState } from "react";
import { RequestedRent } from "../types/requestedCars";
import { fetchCarsIRented, terminateRent } from "../api/rentalService";

function CarsIrentedList() {
  const [cars, setCars] = useState<RequestedRent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(function () {
    async function fetchData() {
      try {
        const pendingCars = await fetchCarsIRented();
        setCars(pendingCars);
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
  const handleTerminateRent = async (carId: number) => {
    try {
      await terminateRent(carId);
      setCars((prevCars) => prevCars.filter((car) => car.rental_id !== carId));
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
      <h1 className="mb-4 text-center">Cars I'm Renting</h1>
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
                Owner first name
              </th>
              <th scope="col" className="text-center">
                Owner last name
              </th>
              <th scope="col" className="text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cars.map(function (car) {
              return (
                <tr key={car.rental_id} style={{ cursor: "pointer" }}>
                  <td className="text-center">{car.brand}</td>
                  <td className="text-center">{car.model}</td>
                  <td className="text-center">{car.requested_by_first_name}</td>
                  <td className="text-center">{car.requested_by_last_name}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTerminateRent(car.rental_id);
                      }}
                    >
                      Return Car
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

export default CarsIrentedList;
