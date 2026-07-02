package com.objetivisa.api.entity.party;

import jakarta.persistence.*;

@Entity @Table(name = "party_position_translations",
    uniqueConstraints = @UniqueConstraint(columnNames = {"position_id", "locale"}))
public class PartyPositionTranslation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    private Long positionId;
    private String locale;
    private String topic;
    @Column(length = 1000) private String summary;

    public PartyPositionTranslation() {}
    public PartyPositionTranslation(Long positionId, String locale, String topic, String summary) {
        this.positionId = positionId; this.locale = locale; this.topic = topic; this.summary = summary;
    }

    public Long getPositionId() { return positionId; }
    public String getLocale() { return locale; }
    public String getTopic() { return topic; }
    public String getSummary() { return summary; }
}
