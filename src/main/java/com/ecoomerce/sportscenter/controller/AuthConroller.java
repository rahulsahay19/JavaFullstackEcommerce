package com.ecoomerce.sportscenter.controller;

import com.ecoomerce.sportscenter.model.JwtRequest;
import com.ecoomerce.sportscenter.model.JwtResponse;
import com.ecoomerce.sportscenter.security.JwtHelper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthConroller {
    private final UserDetailsService userDetailsService;
    private final AuthenticationManager manager;
    private final JwtHelper jwtHelper;
    public AuthConroller(UserDetailsService userDetailsService, AuthenticationManager manager, JwtHelper jwtHelper) {
        this.userDetailsService = userDetailsService;
        this.manager = manager;
        this.jwtHelper = jwtHelper;
    }
    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request){
        this.authenticate(request.getUsername(), request.getPassword());
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        String token = this.jwtHelper.generateToken(userDetails);
        JwtResponse response = JwtResponse.builder()
                .username(userDetails.getUsername())
                .token(token)
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<UserDetails> getUserDetails(@RequestHeader("Authorization") String tokenHeader) {
        String token = extractTokenFromHeader(tokenHeader);
        if (token != null) {
            String username = jwtHelper.getUserNameFromToken(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            return new ResponseEntity<>(userDetails, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    private String extractTokenFromHeader(String tokenHeader) {
        if (tokenHeader != null && tokenHeader.startsWith("Bearer ")) {
            return tokenHeader.substring(7); // Remove "Bearer " prefix
        }
        return null;
    }

    private void authenticate(String username, String password) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
        try{
            manager.authenticate(authenticationToken);
        }catch(BadCredentialsException e){
            throw new BadCredentialsException("Invalid Username or Password");
        }

    }
}
