package com.master.java.carrental.auth;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class UserResponse {
    private Integer id;
    private String first_name;
    private String last_name;
    private String email;
    private List ownedCars;
}
