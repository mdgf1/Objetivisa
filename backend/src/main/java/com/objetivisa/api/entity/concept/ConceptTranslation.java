package com.objetivisa.api.entity.concept;

import jakarta.persistence.*;

@Entity @Table(name = "concept_translations",
    uniqueConstraints = @UniqueConstraint(columnNames = {"concept_id", "locale"}))
public class ConceptTranslation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    private String conceptId;
    private String locale;
    private String name;
    @Column(columnDefinition = "TEXT") private String description;
    // in-depth "card" body shown in the side panel (may itself reference other concepts)
    @Column(columnDefinition = "TEXT") private String card;

    public ConceptTranslation() {}
    public ConceptTranslation(String conceptId, String locale, String name, String description) {
        this.conceptId = conceptId; this.locale = locale;
        this.name = name; this.description = description;
    }

    public String getConceptId() { return conceptId; }
    public String getLocale() { return locale; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public String getCard() { return card; }
    public void setName(String v) { this.name = v; }
    public void setDescription(String v) { this.description = v; }
    public void setCard(String v) { this.card = v; }
}
