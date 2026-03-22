package com.backend.Models.Study;

import jakarta.persistence.*;

@Entity
@Table(name = "range_actions")
public class RangeAction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "range_id")
    private Long rangeId;

    @Column(name = "hand_id")
    private Long handId;

    private String action;
    private Double frequency;

    public RangeAction() {
    }

    public Long getId() {
        return id;
    }

    public Long getRangeId() {
        return rangeId;
    }

    public void setRangeId(Long rangeId) {
        this.rangeId = rangeId;
    }

    public Long getHandId() {
        return handId;
    }

    public void setHandId(Long handId) {
        this.handId = handId;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public Double getFrequency() {
        return frequency;
    }

    public void setFrequency(Double frequency) {
        this.frequency = frequency;
    }
}