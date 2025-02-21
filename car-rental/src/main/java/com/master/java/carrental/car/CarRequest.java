package com.master.java.carrental.car;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CarRequest {
    private Integer id;
    @Builder.Default
    private String brand="Not Specified";
    @Builder.Default
    private String model="Not Specified";
    @Builder.Default
    private String color="Not Specified";
    @Builder.Default
    private String plate_number="Not Specified";
    @Builder.Default
    private Double distance_driven=0.0;
    private Double price_per_day;
    @Builder.Default
    private Double addons_per_km=0.0;
    @Builder.Default
    private Double km_limit_for_addons=0.0;
}
