package com.objetivisa.api.entity.party;

import jakarta.persistence.*;

@Entity @Table(name = "party_people")
public class PartyPersonEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    private String partyId;
    private String imageUrl;
    private int displayOrder;

    public PartyPersonEntity() {}
    public PartyPersonEntity(String partyId, String imageUrl, int displayOrder) {
        this.partyId = partyId; this.imageUrl = imageUrl; this.displayOrder = displayOrder;
    }

    public Long getId() { return id; }
    public String getPartyId() { return partyId; }
    public String getImageUrl() { return imageUrl; }
    public int getDisplayOrder() { return displayOrder; }
}
