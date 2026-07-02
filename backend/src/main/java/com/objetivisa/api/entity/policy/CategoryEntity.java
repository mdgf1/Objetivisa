package com.objetivisa.api.entity.policy;

import jakarta.persistence.*;

@Entity @Table(name = "categories")
public class CategoryEntity {
    @Id private String id;
    private int displayOrder;

    public CategoryEntity() {}
    public CategoryEntity(String id, int displayOrder) { this.id = id; this.displayOrder = displayOrder; }

    public String getId() { return id; }
    public int getDisplayOrder() { return displayOrder; }
}
