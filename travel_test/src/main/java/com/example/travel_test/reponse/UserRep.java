package com.example.travel_test.reponse;

import com.example.travel_test.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRep extends JpaRepository<User, Long> {
    User findByUsername(String username);

    List<User> findByRoleIsNull();
}
