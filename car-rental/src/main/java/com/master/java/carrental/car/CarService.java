package com.master.java.carrental.car;


import com.master.java.carrental.auth.AuthService;
import com.master.java.carrental.config.JsonResponse;
import com.master.java.carrental.rental.RentalRepo;
import com.master.java.carrental.rental.RentalStatus;
import com.master.java.carrental.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@RequiredArgsConstructor
public class CarService {
    private final CarRepo carRepo;
    private final AuthService authService;
    private final RentalRepo rentalRepo;

    public JsonResponse addCar(CarRequest request, String authToken) {
        String token = authToken.substring(7);
        User user = authService.getUserbytoken(token);
        if(user==null){
            return JsonResponse.builder().message("User not found").build();
        }
        else{
            try {
                Car car = Car.builder()
                        .brand(request.getBrand())
                        .model(request.getModel())
                        .color(request.getColor())
                        .plate_number(request.getPlate_number())
                        .distance_driven(request.getDistance_driven())
                        .price_per_day(request.getPrice_per_day())
                        .addons_per_km(request.getAddons_per_km())
                        .km_limit_for_addons(request.getKm_limit_for_addons())
                        .status(CarStatus.AVAILABLE)
                        .owner(user)
                        .build();
                carRepo.save(car);
                return JsonResponse.builder().message("Car with id " + car.getId() + " added").build();}
            catch (Exception e){
                return JsonResponse.builder().message(e.getMessage()).build();
            }
        }
    }

    public JsonResponse deleteCar(Integer carId, String authToken){
        String token = authToken.substring(7);
        User user = authService.getUserbytoken(token);
        if(user==null){
            return JsonResponse.builder().message("User not found").build();
        }
        else{
            Car car = carRepo.findById(carId).orElse(null);
            if(car==null){
                return JsonResponse.builder().message("car not found").build();
            }
            else if(!Objects.equals(car.getOwner().getId(), user.getId())){
                return JsonResponse.builder().message("not the owner").build();
            }
            else if(car.getStatus()==CarStatus.RENTED){
                return JsonResponse.builder().message("this car is rented").build();
            }
            else{
                carRepo.delete(car);
                return JsonResponse.builder().message("Car with id " + carId + " deleted").build();
            }
        }
    }

    public List<Integer> getRentedCars(String authToken){
        String token = authToken.substring(7);
        User user = authService.getUserbytoken(token);
        return user.getOwnedCars().stream()
                .filter(car -> car.getStatus() == CarStatus.RENTED)
                .map(Car::getId)
                .collect(Collectors.toList());
    }

    public List<CarRequest> getMyAvailableCars(String authToken){
        String token = authToken.substring(7);
        User user = authService.getUserbytoken(token);
        return user.getOwnedCars().stream()
                .filter(car -> car.getStatus() == CarStatus.AVAILABLE)
                .map(car -> CarRequest.builder()
                        .id(car.getId())
                        .brand(car.getBrand())
                        .model(car.getModel())
                        .color(car.getColor())
                        .plate_number(car.getPlate_number())
                        .distance_driven(car.getDistance_driven())
                        .price_per_day(car.getPrice_per_day())
                        .addons_per_km(car.getAddons_per_km())
                        .km_limit_for_addons(car.getKm_limit_for_addons())
                        .build())
                .collect(Collectors.toList());
    }

    public Car getCar(Integer carId){
        return carRepo.findById(carId).orElseThrow(()->new ResponseStatusException(NOT_FOUND,"car not found"));
    }

    public void rentCar(Car car){
        if(car==null){
            throw new ResponseStatusException(NOT_FOUND,"car not found");
        }
        else if(car.getStatus()!=CarStatus.AVAILABLE){
            throw new ResponseStatusException(NOT_FOUND,"car is not available");
        }
        else{
            car.setStatus(CarStatus.RENTED);
            carRepo.save(car);
        }
    }

    public void terminateRental(Car car) {
        if(car==null){
            throw new ResponseStatusException(NOT_FOUND,"car not found");
        }
        else if(car.getStatus()!=CarStatus.RENTED){
            throw new ResponseStatusException(NOT_FOUND,"car is not rented");
        }
        else{
            car.setStatus(CarStatus.AVAILABLE);
            carRepo.save(car);
        }
    }
    public List<CarRequest> getAvailableCars(String authToken){
        String token = authToken.substring(7);
        User user = authService.getUserbytoken(token);
        return carRepo.findAll().stream()
                .filter(car -> car.getStatus() == CarStatus.AVAILABLE)
                .filter(car -> !Objects.equals(car.getOwner().getId(), user.getId()))
                .filter(car -> rentalRepo.findByCarAndRenterAndStatus(car, user, RentalStatus.PENDING) == null)
                .map(car -> CarRequest.builder()
                        .id(car.getId())
                        .brand(car.getBrand())
                        .model(car.getModel())
                        .color(car.getColor())
                        .plate_number(car.getPlate_number())
                        .distance_driven(car.getDistance_driven())
                        .price_per_day(car.getPrice_per_day())
                        .addons_per_km(car.getAddons_per_km())
                        .km_limit_for_addons(car.getKm_limit_for_addons())
                        .build())
                .collect(Collectors.toList());
    }

    public JsonResponse drive (DriveRequest request){ {
        Car car = carRepo.findById(request.getCar_id())
                .orElseThrow(()->new ResponseStatusException(NOT_FOUND,"car not found"));
        if(car.getDistance_driven()==null){
            car.setDistance_driven(0.0);
        }
        car.setDistance_driven(car.getDistance_driven()+request.getKm_driven());
        carRepo.save(car);
        return JsonResponse.builder().message("distance driven updated").build();
    }
}
}
