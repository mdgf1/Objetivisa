package com.objetivisa.api.entity.party;

import jakarta.persistence.*;

@Entity @Table(name = "agenda_priorities",
    uniqueConstraints = @UniqueConstraint(columnNames = {"party_id", "category_id"}))
public class AgendaPriorityEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    private String partyId;
    private String categoryId;
    private int priority;

    public AgendaPriorityEntity() {}
    public AgendaPriorityEntity(String partyId, String categoryId, int priority) {
        this.partyId = partyId; this.categoryId = categoryId; this.priority = priority;
    }

    public String getPartyId() { return partyId; }
    public String getCategoryId() { return categoryId; }
    public int getPriority() { return priority; }
}
