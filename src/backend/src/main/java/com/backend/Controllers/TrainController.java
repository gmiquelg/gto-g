package com.backend.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/train")
public class TrainController {

    @GetMapping
    public String loadTrainData() {
        // Return JSON details/state matching the train view requirements instead of an
        // HTML view
        return "{\"status\": \"Ready to train\", \"playerRoles\": [\"UTG\", \"HJ\", \"CO\", \"BTN\", \"SB\", \"BB\"]}";
    }
}
