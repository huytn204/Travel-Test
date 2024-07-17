package com.example.travel_test.controller;

import com.example.travel_test.entity.Comment;
import com.example.travel_test.entity.Place;
import com.example.travel_test.entity.User;
import com.example.travel_test.reponse.CommentRep;
import com.example.travel_test.reponse.PlaceRep;
import com.example.travel_test.reponse.UserRep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin

@RequestMapping("/traveller")
public class TravellerController {
    @Autowired
    private PlaceRep placeRep;

    @Autowired
    private UserRep userRep;

    @Autowired
    private CommentRep commentRep;

    @GetMapping("/search")
    public List<Place> searchPlaces(@RequestParam String keyword) {
        return placeRep.findByNameContaining(keyword);
    }

    @PostMapping("/rate")
    public String ratePlace(Long placeId, Long userId, int score) {
        Optional<Place> placeOpt = placeRep.findById(placeId);
        Optional<User> userOpt = userRep.findById(userId);

        if (placeOpt.isPresent() && userOpt.isPresent()) {
            Comment rating = new Comment();
            rating.setPlace(placeOpt.get());
            rating.setUser(userOpt.get());
            rating.setRating(score);
            commentRep.save(rating);
            return "Place rated successfully";
        }
        return "Place or user not found";
    }

    @PostMapping("/comment")
    public String commentPlace(Long placeId, Long userId, String content) {
        Optional<Place> placeOpt = placeRep.findById(placeId);
        Optional<User> userOpt = userRep.findById(userId);

        if (placeOpt.isPresent() && userOpt.isPresent()) {
            Comment comment = new Comment();
            comment.setPlace(placeOpt.get());
            comment.setUser(userOpt.get());
            comment.setContent(content);
            commentRep.save(comment);
            return "Comment added successfully";
        }
        return "Place or user not found";
    }

}
