package com.objetivisa.api.entity;

import jakarta.persistence.*;

@Entity @Table(name = "policy_groups")
public class PolicyGroupEntity {
    @Id private String id;
    private String categoryId;
    private String icon;
    private String currentOptionId;
    private int displayOrder;

    public PolicyGroupEntity() {}
    public PolicyGroupEntity(String id, String categoryId, String icon, String currentOptionId, int displayOrder) {
        this.id = id; this.categoryId = categoryId; this.icon = icon;
        this.currentOptionId = currentOptionId; this.displayOrder = displayOrder;
    }

    public String getId() { return id; }
    public String getCategoryId() { return categoryId; }
    public String getIcon() { return icon; }
    public String getCurrentOptionId() { return currentOptionId; }
    public int getDisplayOrder() { return displayOrder; }
    public void setCurrentOptionId(String v) { this.currentOptionId = v; }
}
