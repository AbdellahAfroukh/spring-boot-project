import { useEffect, useState } from "react";
import { RequestedRent } from "../types/requestedCars";
import { fetchMyRentedCars } from "../api/rentalService";

function MyRentedCarsList() {
  const [cars, setCars] = useState<RequestedRent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(function () {
    async function fetchData() {
      try {
        const pendingCars = await fetchMyRentedCars();
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

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-5">Error: {error}</div>;
  }

  return (
    <div className="container-fluid p-4">
      <h1 className="mb-4 text-center">My Rented Cars</h1>
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
                Renter first name
              </th>
              <th scope="col" className="text-center">
                Renter last name
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyRentedCarsList;
