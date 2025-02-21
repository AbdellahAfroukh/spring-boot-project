package com.master.java.carrental.rental;


import com.master.java.carrental.auth.AuthService;
import com.master.java.carrental.car.Car;
import com.master.java.carrental.car.CarRequest;
import com.master.java.carrental.car.CarService;
import com.master.java.carrental.car.CarStatus;
import com.master.java.carrental.config.JsonResponse;
import com.master.java.carrental.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RentalService {
    private final RentalRepo rentalRepo;
    private final AuthService authService;
    private final CarService carService;


    public JsonResponse requestRent(RentRequest rentRequest,String authToken) {
        String token = authToken.substring(7);
        User user = authService.getUserbytoken(token);
        Car car = carService.getCar(rentRequest.getCar_id());
        if(user==null){
            return JsonResponse.builder().message("User not found").build();
        }
        else if (car==null){
            return JsonResponse.builder().message("Car not found").build();
        }
        else if(car.getStatus().equals(CarStatus.RENTED)){
            return JsonResponse.builder().message("Car is already rented").build();
        }
else if (rentalRepo.findByCarAndStatus(car, RentalStatus.PENDING) != null && rentalRepo.findByCarAndStatus(car, RentalStatus.PENDING).getRenter().getId().equals(user.getId())) {
    return JsonResponse.builder().message("You have already requested to rent this car").build();
}
        else if(car.getOwner().getId().equals(user.getId())){
            return JsonResponse.builder().message("You can't rent your own car").build();
        }
        else{
            try {
                Rental rental = Rental.builder()
                        .renter(user)
                        .car(car)
                        .owner(car.getOwner())
                        .status(RentalStatus.PENDING)
                        .build();
                rentalRepo.save(rental);
                return JsonResponse.builder().message("Rental requested").build();
            }
            catch (Exception e){
                return JsonResponse.builder().message(e.getMessage()).build();
            }

        }
    }

    public List<RequestedRent> getPendingRentals(String authHeader) {
        String token = authHeader.substring(7);
        User user = authService.getUserbytoken(token);
        if(user==null){
            return List.of();
        }
        else{
            return rentalRepo.findAllByOwner(user).stream()
                    .filter(rental -> rental.getStatus().equals(RentalStatus.PENDING))
                    .map(rental -> RequestedRent.builder()
                            .car_id(rental.getCar().getId())
                            .rental_id(rental.getId())
                            .brand(rental.getCar().getBrand())
                            .model(rental.getCar().getModel())
                            .requested_by_first_name(rental.getRenter().getFirst_name())
                            .requested_by_last_name(rental.getRenter().getLast_name())
                            .build())
                    .collect(Collectors.toList());
        }
    }

    public List<RequestedRent> getRentals(String authHeader) {
        String token = authHeader.substring(7);
        User user = authService.getUserbytoken(token);
        if(user==null){
            return List.of();
        }
        else{
            return rentalRepo.findAllByOwner(user).stream()
                    .filter(rental -> rental.getStatus().equals(RentalStatus.ACCEPTED))
                    .map(rental -> RequestedRent.builder()
                            .car_id(rental.getCar().getId())
                            .rental_id(rental.getId())
                            .brand(rental.getCar().getBrand())
                            .model(rental.getCar().getModel())
                            .requested_by_first_name(rental.getRenter().getFirst_name())
                            .requested_by_last_name(rental.getRenter().getLast_name())
                            .build())
                    .collect(Collectors.toList());
        }
    }
    public List<RequestedRent> getRequestedRentals(String authHeader) {
        String token = authHeader.substring(7);
        User user = authService.getUserbytoken(token);
        if(user==null){
            return List.of();
        }
        else{
            return rentalRepo.findAllByRenter(user).stream()
                    .filter(rental -> rental.getStatus().equals(RentalStatus.PENDING))
                    .map(rental -> RequestedRent.builder()
                            .car_id(rental.getCar().getId())
                            .rental_id(rental.getId())
                            .brand(rental.getCar().getBrand())
                            .model(rental.getCar().getModel())
                            .requested_by_first_name(rental.getOwner().getFirst_name())
                            .requested_by_last_name(rental.getOwner().getLast_name())
                            .build())
                    .collect(Collectors.toList());
        }
    }
    public List<RequestedRent> getAcceptedRentals(String authHeader) {
        String token = authHeader.substring(7);
        User user = authService.getUserbytoken(token);
        if(user==null){
            return List.of();
        }
        else{
            return rentalRepo.findAllByRenter(user).stream()
                    .filter(rental -> rental.getStatus().equals(RentalStatus.ACCEPTED))
                    .map(rental -> RequestedRent.builder()
                            .car_id(rental.getCar().getId())
                            .rental_id(rental.getId())
                            .brand(rental.getCar().getBrand())
                            .model(rental.getCar().getModel())
                            .requested_by_first_name(rental.getOwner().getFirst_name())
                            .requested_by_last_name(rental.getOwner().getLast_name())
                            .build())
                    .collect(Collectors.toList());
        }
    }

public JsonResponse acceptRental(RentRequest request, String authHeader) {
            String token = authHeader.substring(7);
            User user = authService.getUserbytoken(token);
            Rental rental = rentalRepo.findById(request.getCar_id()).orElse(null);
            if(user==null){
                return JsonResponse.builder().message("User not found").build();
            }
            else if (rental==null){
                return JsonResponse.builder().message("Rental not found").build();
            }
            else if(!rental.getCar().getOwner().getId().equals(user.getId())){
                return JsonResponse.builder().message("You can't accept rental for this car").build();
            }
            else{
                if(rental.getStatus().equals(RentalStatus.ACCEPTED)){
                    return JsonResponse.builder().message("Rental already accepted").build();
                }
                else if(rental.getStatus().equals(RentalStatus.REJECTED)){
                    return JsonResponse.builder().message("Rental already rejected").build();
                }
                else{
                    rental.setStatus(RentalStatus.ACCEPTED);
                    rental.setStart_date(LocalDate.now());
                    rental.setStart_km(rental.getCar().getDistance_driven());
                    rentalRepo.save(rental);
                    carService.rentCar(rental.getCar());

                    List<Rental> pendingRentals = rentalRepo.findAllByCarAndStatus(rental.getCar(), RentalStatus.PENDING);
                    for (Rental pendingRental : pendingRentals) {
                        pendingRental.setStatus(RentalStatus.REJECTED);
                        rentalRepo.save(pendingRental);
                    }
                    return JsonResponse.builder().message("Rental accepted").build();
                }
            }
        }

    public JsonResponse rejectRental(RentRequest request, String authHeader) {
        String token = authHeader.substring(7);
        User user = authService.getUserbytoken(token);
        Rental rental = rentalRepo.findById(request.getCar_id()).orElse(null);
        if(user==null){
            return JsonResponse.builder().message("User not found").build();
        }
        else if (rental==null){
            return JsonResponse.builder().message("Rental not found").build();
        }
        else if(!rental.getCar().getOwner().getId().equals(user.getId())){
            return JsonResponse.builder().message("You can't accept rental for this car").build();
        }
        else{
            if(rental.getStatus().equals(RentalStatus.ACCEPTED)){
                return JsonResponse.builder().message("Rental already accepted").build();
            }
            else if(rental.getStatus().equals(RentalStatus.REJECTED)){
                return JsonResponse.builder().message("Rental already rejected").build();
            }
            else{
                rental.setStatus(RentalStatus.REJECTED);
                rentalRepo.save(rental);
                return JsonResponse.builder().message("Rental rejected").build();
            }
        }
    }

    public JsonResponse terminateRequest(RentRequest request, String authHeader) {
        String token = authHeader.substring(7);
        User user = authService.getUserbytoken(token);
        Rental rental = rentalRepo.findById(request.getCar_id()).orElse(null);
        if(user==null){
            return JsonResponse.builder().message("User not found").build();
        }
        else if (rental==null){
            return JsonResponse.builder().message("Rental not found").build();
        }
        else if(!rental.getRenter().getId().equals(user.getId())){
            return JsonResponse.builder().message("You can't accept rental for this car").build();
        }
        else{
            if(rental.getStatus().equals(RentalStatus.ACCEPTED)){
                return JsonResponse.builder().message("Rental already accepted").build();
            }
            else if(rental.getStatus().equals(RentalStatus.REJECTED)){
                return JsonResponse.builder().message("Rental already rejected").build();
            }
            else{
                rental.setStatus(RentalStatus.REJECTED);
                rentalRepo.save(rental);
                return JsonResponse.builder().message("Rental Request terminated").build();
            }
        }
    }

public JsonResponse terminateRental(RequestedRent request, String authHeader) {
                String token = authHeader.substring(7);
                User user = authService.getUserbytoken(token);
                Rental rental = rentalRepo.findById(request.getCar_id()).orElse(null);
                if(user == null){
                    return JsonResponse.builder().message("User not found").build();
                }
                else if (rental == null){
                    return JsonResponse.builder().message("Rental not found").build();
                }
                else if(!rental.getRenter().getId().equals(user.getId())){
                    return JsonResponse.builder().message("You can't terminate rental for this car").build();
                }
                else if(!rental.getStatus().equals(RentalStatus.ACCEPTED)){
                    return JsonResponse.builder().message("Rental already finished").build();
                }
                else{
                    Car car = rental.getCar();
                    double addons = 0.0;
                    Double startKm = rental.getStart_km();
                    if(startKm==null){
                        startKm = 0.0;
                    }
                    Double total_distance = car.getDistance_driven() - startKm;
                    long daysBetween = ChronoUnit.DAYS.between(rental.getStart_date(), LocalDate.now()) + 1;
                    if(total_distance > car.getKm_limit_for_addons()){
                        addons = (total_distance - car.getKm_limit_for_addons()) * car.getAddons_per_km();
                    }
                    rental.setTotal_price((daysBetween * car.getPrice_per_day()) + addons);
                    rental.setStatus(RentalStatus.FINISHED);
                    rental.setEnd_km(car.getDistance_driven());
                    rental.setEnd_date(LocalDate.now());
                    rentalRepo.save(rental);
                    carService.terminateRental(car);
                    return JsonResponse.builder().message("Rental terminated, the price is: " + rental.getTotal_price() + " DH").build();
                }
            }


    public List<Facture> getFactures(String authHeader) {
        String token = authHeader.substring(7);
        User user = authService.getUserbytoken(token);
        if(user==null){
            return List.of();
        }
        else{
            return rentalRepo.findAllByRenter(user).stream()
                    .filter(rental -> rental.getStatus().equals(RentalStatus.FINISHED))
                    .map(rental -> Facture.builder()
                            .car_id(rental.getCar().getId())
                            .rental_id(rental.getId())
                            .brand(rental.getCar().getBrand())
                            .model(rental.getCar().getModel())
                            .price(rental.getTotal_price())
                            .km_driven(rental.getEnd_km() - rental.getStart_km())
                            .start_date(rental.getStart_date())
                            .end_date(rental.getEnd_date())
                            .owner_first_name(rental.getOwner().getFirst_name())
                            .owner_last_name(rental.getOwner().getLast_name())
                            .build())
                    .collect(Collectors.toList());
        }
    }
}
