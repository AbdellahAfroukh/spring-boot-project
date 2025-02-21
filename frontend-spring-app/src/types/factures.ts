export interface Facture {
    car_id: number;
    rental_id: number;
    brand: string;
    model: string;
    owner_first_name: string;
    owner_last_name: string;
    km_driven: number;
    start_date: string;
    end_date: string;
    price: number;
}