package com.objetivisa.api.entity.policy;

import jakarta.persistence.*;

@Entity @Table(name = "category_translations",
    uniqueConstraints = @UniqueConstraint(columnNames = {"category_id", "locale"}))
public class CategoryTranslation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    private String categoryId;
    private String locale;
    private String name;

    public CategoryTranslation() {}
    public CategoryTranslation(String categoryId, String locale, String name) {
        this.categoryId = categoryId; this.locale = locale; this.name = name;
    }

    public String getCategoryId() { return categoryId; }
    public String getLocale() { return locale; }
    public String getName() { return name; }
}
