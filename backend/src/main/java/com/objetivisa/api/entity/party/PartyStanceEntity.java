package com.objetivisa.api.entity.party;

import jakarta.persistence.*;

@Entity @Table(name = "party_stances",
    uniqueConstraints = @UniqueConstraint(columnNames = {"option_id", "party_id"}))
public class PartyStanceEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    private String optionId;
    private String partyId;
    private String stance;

    public PartyStanceEntity() {}
    public PartyStanceEntity(String optionId, String partyId, String stance) {
        this.optionId = optionId; this.partyId = partyId; this.stance = stance;
    }

    public String getOptionId() { return optionId; }
    public String getPartyId() { return partyId; }
    public String getStance() { return stance; }
    public void setStance(String v) { this.stance = v; }
}
