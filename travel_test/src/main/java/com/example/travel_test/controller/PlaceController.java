package com.example.travel_test.controller;

import com.example.travel_test.entity.Place;
import com.example.travel_test.reponse.PlaceRep;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/places")
public class PlaceController {

    @Autowired
    private PlaceRep placeRep;


    private final PlaceRep placeRepository;

    public PlaceController(PlaceRep placeRepository) {
        this.placeRepository = placeRepository;
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/")
    public ResponseEntity<Place> createPlace(@Valid @RequestBody com.example.travel_test.entity.Place place) {
        com.example.travel_test.entity.Place savedPlace = placeRepository.save(place);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(savedPlace.getId()).toUri();

        return ResponseEntity.created(location).body(savedPlace);
    }

    @GetMapping("/")
    public ResponseEntity<Page<Place>> getAllPlaces(Pageable pageable) {
        return ResponseEntity.ok(placeRep.findAll(pageable));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Place> updatePlace(@PathVariable Long id, @Valid @RequestBody Place updatedPlace) {
        Optional<Place> optionalPlace = placeRep.findById(id);
        if (!optionalPlace.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        updatedPlace.setId(id); // Ensure ID is set correctly
        placeRep.save(updatedPlace);
        return ResponseEntity.ok(updatedPlace);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlace(@PathVariable Long id) {
        Optional<Place> optionalPlace = placeRep.findById(id);
        if (!optionalPlace.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        placeRep.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
