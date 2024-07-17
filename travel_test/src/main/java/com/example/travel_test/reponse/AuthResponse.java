package com.example.travel_test.reponse;

public class AuthResponse {
    private String message;
    private String role;

    public AuthResponse(String message, String role) {
        this.message = message;
        this.role = role;
    }

    // Các getter và setter
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
