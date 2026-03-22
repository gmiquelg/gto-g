package com.backend.Repositories.Study;

import com.backend.Models.Study.RangeAction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RangeActionRepository extends JpaRepository<RangeAction, Long> {
    List<RangeAction> findByRangeId(Long rangeId);

    void deleteByRangeIdAndHandId(Long rangeId, Long handId);
}