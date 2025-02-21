import { Facture } from "../types/factures";
import { RequestedRent } from "../types/requestedCars";

export async function fetchMyPendingCars(): Promise<RequestedRent[]> {
    const url = "api/rentals/my-pending-rentals";
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

        const data: RequestedRent[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching pending cars:", error);
        throw error;
    }
}

export async function fetchMyRentedCars(): Promise<RequestedRent[]> {
    const url = "api/rentals/my-rentals";
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

        const data: RequestedRent[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching rented cars:", error);
        throw error;
    }
}

export async function fetchCarsIRented(): Promise<RequestedRent[]> {
  const url = "api/rentals/my-accepted-rentals";
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

      const data: RequestedRent[] = await response.json();
      return data;
  } catch (error) {
      console.error("Error fetching rented cars:", error);
      throw error;
  }
}

export async function fetchCarsIRequested(): Promise<RequestedRent[]> {
  const url = "api/rentals/my-requested-rentals";
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

      const data: RequestedRent[] = await response.json();
      return data;
  } catch (error) {
      console.error("Error fetching requested cars:", error);
      throw error;
  }
}

export async function acceptRent(carId: number): Promise<void> {
    const url = "api/rentals/accept-rental";
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
        throw new Error(`HTTP error! status: ${response}`);
      }
  
      console.log("Car requested successfully");
    } catch (error) {
      console.error("Error requesting car:", error);
      throw error;
    }
  }

  export async function rejectRent(carId: number): Promise<void> {
    const url = "api/rentals/reject-rental";
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

  export async function terminateRent(carId: number): Promise<void> {
    const url = "api/rentals/return-car";
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

    } catch (error) {
      console.error("Error requesting car:", error);
      throw error;
    }
  }

  export async function terminateRequest(carId: number): Promise<void> {
    const url = "api/rentals/terminate-rental-request";
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

    } catch (error) {
      console.error("Error requesting car:", error);
      throw error;
    }
  }

  export async function fetchfactures(): Promise<Facture[]> {
    const url = "api/rentals/factures";
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
  
        const data: Facture[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching factures", error);
        throw error;
    }
  }