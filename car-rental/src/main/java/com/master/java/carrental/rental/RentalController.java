package com.master.java.carrental.rental;


import com.master.java.carrental.car.CarRequest;
import com.master.java.carrental.config.JsonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rentals")
@RequiredArgsConstructor
public class RentalController {
    private final RentalService rentalService;

    @PostMapping("/rent")
    public ResponseEntity<JsonResponse> rentCar(
            @RequestBody RentRequest request,
            @RequestHeader("Authorization") String authHeader
    ){
        return ResponseEntity.ok(rentalService.requestRent(request,authHeader));
    }

    @GetMapping("/my-pending-rentals")
    public ResponseEntity <List<RequestedRent>> getMyPendingRentals(
            @RequestHeader("Authorization") String authHeader
    ){
        return ResponseEntity.ok(rentalService.getPendingRentals(authHeader));
    }

    @GetMapping("/my-rentals")
    public ResponseEntity <List<RequestedRent>> getMyRentals(
            @RequestHeader("Authorization") String authHeader
    ){
        return ResponseEntity.ok(rentalService.getRentals(authHeader));
    }

    @GetMapping("/my-requested-rentals")
    public ResponseEntity <List<RequestedRent>> getMyRequestedRentals(
            @RequestHeader("Authorization") String authHeader
    ){
        return ResponseEntity.ok(rentalService.getRequestedRentals(authHeader));
    }

    @GetMapping("/my-accepted-rentals")
    public ResponseEntity <List<RequestedRent>> getMyAcceptedRentals(
            @RequestHeader("Authorization") String authHeader
    ){
        return ResponseEntity.ok(rentalService.getAcceptedRentals(authHeader));
    }

    @PostMapping("/accept-rental")
    public ResponseEntity<JsonResponse> acceptRental(
            @RequestBody RentRequest request,
            @RequestHeader("Authorization") String authHeader
    ){
        return ResponseEntity.ok(rentalService.acceptRental(request,authHeader));
    }

    @PostMapping("/reject-rental")
    public ResponseEntity<JsonResponse> rejectRental(
            @RequestBody RentRequest request,
            @RequestHeader("Authorization") String authHeader
    ){
        return ResponseEntity.ok(rentalService.rejectRental(request,authHeader));
    }

    @PostMapping("/terminate-rental-request")
    public ResponseEntity<JsonResponse> terminateRequest(
            @RequestBody RentRequest request,
            @RequestHeader("Authorization") String authHeader
    ){
        return ResponseEntity.ok(rentalService.terminateRequest(request,authHeader));
    }

    @PostMapping("/return-car")
    public ResponseEntity<JsonResponse> returnCar(
            @RequestBody RequestedRent request,
            @RequestHeader("Authorization") String authHeader
    ){
        return ResponseEntity.ok(rentalService.terminateRental(request,authHeader));
    }

    @GetMapping("factures")
    public ResponseEntity<List<Facture>> getFactures(
            @RequestHeader("Authorization") String authHeader
    ){
        return ResponseEntity.ok(rentalService.getFactures(authHeader));
    }
}
