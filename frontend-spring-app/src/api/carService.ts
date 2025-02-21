import { CarRequest } from '../types/carRequest';

export async function fetchAvailableCars(): Promise<CarRequest[]> {
    const url = "/api/cars/available-cars";
    const authToken = localStorage.getItem("token");
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Content-Type": "application/json",
            },
        });
        console.log("Response:", response);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: CarRequest[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching available cars:", error);
        throw error;
    }
}

export async function fetchMyAvailableCars(): Promise<CarRequest[]> {
    const url = "/api/cars/my-available-cars";
    const authToken = localStorage.getItem("token");
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Content-Type": "application/json",
            },
        });
        console.log("Response:", response);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: CarRequest[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching available cars:", error);
        throw error;
    }
}

export async function deleteCar(carId: number): Promise<void> {
    const url = "api/cars/delete";
    const authToken = localStorage.getItem("token");
  
    try {
      const response = await fetch(url, {
        method: "DELETE",
        body: carId.toString(),
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      console.log("Car deleted successfully");
    } catch (error) {
      console.error("Error deleting car:", error);
      throw error;
    }
  }

  export async function requestCar(carId: number): Promise<void> {
    const url = "api/rentals/rent";
    const authToken = localStorage.getItem("token");
  
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ "car_id": carId }),
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      console.log("Car requested successfully");
    } catch (error) {
      console.error("Error requesting car:", error);
      throw error;
    }
  }

  