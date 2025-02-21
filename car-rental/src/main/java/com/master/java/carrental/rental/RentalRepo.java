package com.master.java.carrental.rental;

import com.master.java.carrental.car.Car;
import com.master.java.carrental.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Arrays;
import java.util.List;

public interface RentalRepo extends JpaRepository<Rental, Integer> {

    List<Rental> findAllByOwner(User user);

    Rental findByCar(Car car);

    List<Rental> findAllByRenter(User user);

    Rental findByCarAndRenter(Car car, User user);

    Rental findByCarAndStatus(Car car, RentalStatus rentalStatus);

    Rental findByCarAndRenterAndStatus(Car car, User user, RentalStatus rentalStatus);

    List<Rental> findAllByCarAndStatus(Car car, RentalStatus rentalStatus);
}
