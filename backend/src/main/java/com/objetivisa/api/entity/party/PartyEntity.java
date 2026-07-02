package com.objetivisa.api.entity.party;

import jakarta.persistence.*;

@Entity @Table(name = "parties")
public class PartyEntity {
    @Id private String id;
    private String color;

    public PartyEntity() {}
    public PartyEntity(String id, String color) { this.id = id; this.color = color; }

    public String getId() { return id; }
    public String getColor() { return color; }
}
