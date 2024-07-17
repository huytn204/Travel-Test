package com.example.travel_test.controller;

import com.example.travel_test.entity.User;
import com.example.travel_test.reponse.AuthResponse;
import com.example.travel_test.reponse.UserRep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserRep userRep;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        if (userRep.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.badRequest().body("Username is already taken!");
        }
        userRep.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        User existingUser = userRep.findByUsername(user.getUsername());
        if (existingUser == null || !existingUser.getPassword().equals(user.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid username or password!");
        }

        // Trả về thông tin về vai trò của người dùng cùng với thông báo đăng nhập thành công
        AuthResponse authResponse = new AuthResponse("Login successful!", existingUser.getRole());
        return ResponseEntity.ok(authResponse);
    }
    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsersWithNullRole() {
        List<User> usersWithNullRole = userRep.findByRoleIsNull();
        return ResponseEntity.ok(usersWithNullRole);
    }
    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        Optional<User> optionalUser = userRep.findById(id);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User userToDelete = optionalUser.get();
        userRep.delete(userToDelete);
        return ResponseEntity.ok("User deleted successfully!");
    }


}
