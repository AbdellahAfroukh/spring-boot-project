package com.master.java.carrental.rental;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RequestedRent {
    private Integer car_id;
    private String brand;
    private String model;
    private String requested_by_first_name;
    private String requested_by_last_name;
    private Integer rental_id;
}
