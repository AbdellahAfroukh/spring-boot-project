package com.master.java.carrental.rental;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.master.java.carrental.car.Car;
import com.master.java.carrental.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "rentals")
public class Rental {
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
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate start_date;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate end_date;
    private Double total_price;
    private Double start_km;
    private Double end_km;
    @Enumerated(EnumType.STRING)
    private RentalStatus status;

    @ManyToOne
    @JoinColumn(name = "car_id", nullable = false)
    private Car car;

    @ManyToOne
    @JoinColumn(name = "renter_id", nullable = false)
    private User renter;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

}
