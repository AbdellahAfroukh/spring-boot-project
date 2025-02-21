package com.master.java.carrental.auth;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthentificationResponse> register(
            @RequestBody RegisterRequest request
    ){
        return ResponseEntity.ok(authService.register(request));
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthentificationResponse> authenticate(
            @RequestBody AuthentificationRequest request
    ){
        return ResponseEntity.ok(authService.authenticate(request));
    }
    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.substring(7);
        UserResponse userResponse = authService.getUser(token);
        return ResponseEntity.ok(userResponse);
    }

}
