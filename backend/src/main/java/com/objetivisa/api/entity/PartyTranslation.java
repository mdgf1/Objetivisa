package com.objetivisa.api.entity;

import jakarta.persistence.*;

@Entity @Table(name = "party_translations",
    uniqueConstraints = @UniqueConstraint(columnNames = {"party_id", "locale"}))
public class PartyTranslation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    private String partyId;
    private String locale;
    private String name;

    public PartyTranslation() {}
    public PartyTranslation(String partyId, String locale, String name) {
        this.partyId = partyId; this.locale = locale; this.name = name;
    }

    public String getPartyId() { return partyId; }
    public String getLocale() { return locale; }
    public String getName() { return name; }
}
