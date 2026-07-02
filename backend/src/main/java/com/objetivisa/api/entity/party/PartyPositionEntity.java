package com.objetivisa.api.entity.party;

import jakarta.persistence.*;

@Entity @Table(name = "party_positions")
public class PartyPositionEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    private String partyId;
    private int displayOrder;

    public PartyPositionEntity() {}
    public PartyPositionEntity(String partyId, int displayOrder) {
        this.partyId = partyId; this.displayOrder = displayOrder;
    }

    public Long getId() { return id; }
    public String getPartyId() { return partyId; }
    public int getDisplayOrder() { return displayOrder; }
}
