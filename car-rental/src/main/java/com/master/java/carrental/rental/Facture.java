package com.master.java.carrental.rental;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Facture {
    private Integer car_id;
    private String brand;
    private String model;
    private String owner_first_name;
    private String owner_last_name;
    private Integer rental_id;
    private Double km_driven;
    private LocalDate start_date;
    private LocalDate end_date;
    private Double price;

}
