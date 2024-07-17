package com.example.travel_test.reponse;

import com.example.travel_test.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlaceRep extends JpaRepository<Place, Long> {
    List<Place> findByNameContaining(String keyword);
}
