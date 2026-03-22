package com.backend.Controllers.Study;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.Models.Study.RangeAction;
import com.backend.Models.Study.Ranges;
import com.backend.Models.Train.Position;
import com.backend.Repositories.Study.RangeActionRepository;
import com.backend.Repositories.Study.RangesRepository;
import com.backend.Repositories.Train.PositionRepository;

@RestController
@RequestMapping("/api/study")
public class StudyController {

    @Autowired
    private RangesRepository rangesRepository;

    @Autowired
    private PositionRepository positionRepository;

    @Autowired
    private RangeActionRepository rangeActionRepository;

    @GetMapping("/positions")
    public List<Position> getPositions() {
        return positionRepository.findAllByOrderByOrderAsc();
    }

    @GetMapping("/ranges")
    public List<Ranges> getRanges() {
        return rangesRepository.findAll();
    }

    @GetMapping("/ranges/{positionId}")
    public List<Ranges> getRangesByPosition(@PathVariable Long positionId) {
        return rangesRepository.findByHeroPositionId(positionId);
    }

    @GetMapping("/range-actions/{rangeId}")
    public List<RangeAction> getRangeActions(@PathVariable Long rangeId) {
        return rangeActionRepository.findByRangeId(rangeId);
    }

    @PutMapping("/range-actions/save/{rangeId}/{handId}")
    public List<RangeAction> updateHandActions(
            @PathVariable Long rangeId,
            @PathVariable Long handId,
            @RequestBody List<RangeAction> incoming) {
        // Delete existing actions for this hand+range
        rangeActionRepository.deleteByRangeIdAndHandId(rangeId, handId);
        // Save new ones
        incoming.forEach(a -> {
            a.setRangeId(rangeId);
            a.setHandId(handId);
        });
        return rangeActionRepository.saveAll(incoming);
    }
}