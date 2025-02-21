package com.master.java.carrental.auth;


import com.master.java.carrental.car.Car;
import com.master.java.carrental.config.JwtService;
import com.master.java.carrental.user.Role;
import com.master.java.carrental.user.User;
import com.master.java.carrental.user.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthentificationResponse register(RegisterRequest request) {
        var user = User.builder()
                .first_name(request.getFirst_name())
                .last_name(request.getLast_name())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        userRepo.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthentificationResponse
                .builder()
                .token(jwtToken)
                .build();
    }

    public AuthentificationResponse authenticate(AuthentificationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepo.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);

        return AuthentificationResponse
                .builder()
                .token(jwtToken)
                .build();
    }
    public UserResponse getUser(String token){
        String userEmail = jwtService.extractUsername(token);
        User user = userRepo.findByEmail(userEmail)
                .orElseThrow(()->new UsernameNotFoundException("user not found"));
        return UserResponse.builder()
                .id(user.getId())
                .first_name(user.getFirst_name())
                .last_name(user.getLast_name())
                .email(user.getEmail())
                .ownedCars(user.getOwnedCars().stream()
                        .map(Car::getId).collect(Collectors.toList()))
                .build();
    }
    public User getUserbytoken(String token){
        String userEmail = jwtService.extractUsername(token);
        return userRepo.findByEmail(userEmail)
                .orElseThrow(()->new UsernameNotFoundException("user not found"));
    }

    public User getUserById(Integer id){
        return userRepo.findById(id)
                .orElseThrow(()->new UsernameNotFoundException("user not found"));
    }


}
