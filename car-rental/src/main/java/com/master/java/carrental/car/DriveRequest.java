package com.master.java.carrental.car;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DriveRequest {
    private Integer car_id;
    private Integer km_driven;
}
