package com.backend.Controllers.Train;

import com.backend.Models.Train.Position;
import com.backend.Repositories.Train.PositionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/train")
public class TrainController {

    @Autowired
    private PositionRepository positionRepository;

    @GetMapping("/positions")
    public List<Position> getPositions() {
        return positionRepository.findAllByOrderByOrderAsc();
    }

    @GetMapping
    public String loadTrainData() {
        return "{\"status\": \"Ready to train\"}";
    }
}
