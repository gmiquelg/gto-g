package com.backend.Models.Study;

import jakarta.persistence.*;

@Entity
@Table(name = "ranges")
public class Ranges {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "hero_position_id")
    private Long heroPositionId;

    @Column(name = "villian_position_id")
    private Long villianPositionId;

    @Column(name = "situation_type")
    private String situationType;

    private String description;

    @Column(name = "`order`")
    private Integer order;

    public Ranges() {
    }

    public Long getId() {
        return id;
    }

    public Long getHeroPositionId() {
        return heroPositionId;
    }

    public void setHeroPositionId(Long heroPositionId) {
        this.heroPositionId = heroPositionId;
    }

    public Long getVillianPositionId() {
        return villianPositionId;
    }

    public void setVillianPositionId(Long villianPositionId) {
        this.villianPositionId = villianPositionId;
    }

    public String getSituationType() {
        return situationType;
    }

    public void setSituationType(String situationType) {
        this.situationType = situationType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }
}