package com.example.travel_test.reponse;

import com.example.travel_test.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRep extends JpaRepository<Comment, Long> {
}
