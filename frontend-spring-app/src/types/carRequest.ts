export interface CarRequest {
    id: number;
    brand: string;
    model: string;
    color: string;
    plate_number: string;
    distance_driven: number;
    price_per_day: number;
    addons_per_km: number;
    km_limit_for_addons: number;
}