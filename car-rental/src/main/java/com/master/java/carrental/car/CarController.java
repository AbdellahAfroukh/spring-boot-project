package com.master.java.carrental.car;


import com.master.java.carrental.config.JsonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cars")
@RequiredArgsConstructor
public class CarController {
    private final CarService carService;

    @PostMapping("/add")
    public ResponseEntity <JsonResponse> addCar(
            @RequestBody CarRequest request,
            @RequestHeader("Authorization") String authHeader
    ){
        return ResponseEntity.ok(carService.addCar(request,authHeader));
    }
    @DeleteMapping("/delete")
    public ResponseEntity <JsonResponse> deleteCar(
            @RequestBody Integer carId,
            @RequestHeader("Authorization") String authHeader
    ){
        return ResponseEntity.ok(carService.deleteCar(carId,authHeader));
    }
    @GetMapping("/my-rented-cars")
    public ResponseEntity <List<Integer>> getMyRentedCars(
            @RequestHeader("Authorization") String authHeader
    ){
        return ResponseEntity.ok(carService.getRentedCars(authHeader));
    }
    @GetMapping("/my-available-cars")
    public ResponseEntity <List<CarRequest>> getMyAvailableCars(
            @RequestHeader("Authorization") String authHeader
    ){
        return ResponseEntity.ok(carService.getMyAvailableCars(authHeader));
    }
    @GetMapping("/available-cars")
    public ResponseEntity <List<CarRequest>> getAvailableCars(
            @RequestHeader("Authorization") String authHeader
    ){
        return ResponseEntity.ok(carService.getAvailableCars(authHeader));
    }

    @PostMapping("/drive")
    public ResponseEntity <JsonResponse> driveCar(
            @RequestBody DriveRequest request,
            @RequestHeader("Authorization") String authHeader
    ){
        return ResponseEntity.ok(carService.drive(request));
    }

}
