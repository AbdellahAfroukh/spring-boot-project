package com.master.java.carrental.car;


import com.master.java.carrental.rental.Rental;
import com.master.java.carrental.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "cars")
public class Car {
    @Id
    @SequenceGenerator(
            name = "car_id_sequence",
            sequenceName = "car_id_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "car_id_sequence"
    )
    private Integer id;
    private String brand;
    private String model;
    private String color;
    private String plate_number;
    @Column(nullable = false)
    private Double price_per_day;
    private Double addons_per_km;
    private Double km_limit_for_addons;
    private Double distance_driven;
    @Enumerated(EnumType.STRING)
    private CarStatus status;
    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;
    @OneToMany(mappedBy = "car", cascade = CascadeType.ALL, orphanRemoval = true)
private List<Rental> rentalHistory;
}
