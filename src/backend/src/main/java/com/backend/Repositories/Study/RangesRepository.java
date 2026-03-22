package com.backend.Repositories.Study;

import com.backend.Models.Study.Ranges;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RangesRepository extends JpaRepository<Ranges, Long> {

    @Query("SELECT r FROM Ranges r WHERE r.heroPositionId = :positionId ORDER BY r.order ASC")
    List<Ranges> findByHeroPositionId(@Param("positionId") Long positionId);
}