package com.objetivisa.api.entity.policy;

import jakarta.persistence.*;

@Entity @Table(name = "policy_group_translations",
    uniqueConstraints = @UniqueConstraint(columnNames = {"group_id", "locale"}))
public class PolicyGroupTranslation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    private String groupId;
    private String locale;
    private String name;
    @Column(columnDefinition = "TEXT") private String classificationReason;

    public PolicyGroupTranslation() {}
    public PolicyGroupTranslation(String groupId, String locale, String name, String classificationReason) {
        this.groupId = groupId; this.locale = locale;
        this.name = name; this.classificationReason = classificationReason;
    }

    public String getGroupId() { return groupId; }
    public String getLocale() { return locale; }
    public String getName() { return name; }
    public String getClassificationReason() { return classificationReason; }
    public void setName(String v) { this.name = v; }
    public void setClassificationReason(String v) { this.classificationReason = v; }
}
