package com.objetivisa.api.entity.party;

import jakarta.persistence.*;

@Entity @Table(name = "party_history_event_translations",
    uniqueConstraints = @UniqueConstraint(columnNames = {"event_id", "locale"}))
public class PartyHistoryEventTranslation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    private Long eventId;
    private String locale;
    private String title;
    @Column(length = 1000) private String description;

    public PartyHistoryEventTranslation() {}
    public PartyHistoryEventTranslation(Long eventId, String locale, String title, String description) {
        this.eventId = eventId; this.locale = locale; this.title = title; this.description = description;
    }

    public Long getEventId() { return eventId; }
    public String getLocale() { return locale; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
}
