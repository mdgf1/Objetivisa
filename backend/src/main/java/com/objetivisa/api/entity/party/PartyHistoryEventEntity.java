package com.objetivisa.api.entity.party;

import jakarta.persistence.*;

@Entity @Table(name = "party_history_events")
public class PartyHistoryEventEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    private String partyId;
    private int year;
    private int displayOrder;

    public PartyHistoryEventEntity() {}
    public PartyHistoryEventEntity(String partyId, int year, int displayOrder) {
        this.partyId = partyId; this.year = year; this.displayOrder = displayOrder;
    }

    public Long getId() { return id; }
    public String getPartyId() { return partyId; }
    public int getYear() { return year; }
    public int getDisplayOrder() { return displayOrder; }
}
