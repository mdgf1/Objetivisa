package com.objetivisa.api.entity.party;

import jakarta.persistence.*;

@Entity @Table(name = "party_person_translations",
    uniqueConstraints = @UniqueConstraint(columnNames = {"person_id", "locale"}))
public class PartyPersonTranslation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    private Long personId;
    private String locale;
    private String name;
    private String role;

    public PartyPersonTranslation() {}
    public PartyPersonTranslation(Long personId, String locale, String name, String role) {
        this.personId = personId; this.locale = locale; this.name = name; this.role = role;
    }

    public Long getPersonId() { return personId; }
    public String getLocale() { return locale; }
    public String getName() { return name; }
    public String getRole() { return role; }
}
