package com.objetivisa.api.entity;

import jakarta.persistence.*;

@Entity @Table(name = "policy_option_translations",
    uniqueConstraints = @UniqueConstraint(columnNames = {"option_id", "locale"}))
public class PolicyOptionTranslation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    private String optionId;
    private String locale;
    private String name;
    @Column(columnDefinition = "TEXT") private String description;

    public PolicyOptionTranslation() {}
    public PolicyOptionTranslation(String optionId, String locale, String name, String description) {
        this.optionId = optionId; this.locale = locale;
        this.name = name; this.description = description;
    }

    public String getOptionId() { return optionId; }
    public String getLocale() { return locale; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public void setName(String v) { this.name = v; }
    public void setDescription(String v) { this.description = v; }
}
