package com.objetivisa.api.entity.concept;

import jakarta.persistence.*;

/**
 * A glossary "concept" (e.g. sales_tax). Concepts have per-locale translations and can be
 * referenced from any description via [[concept_id]] / [[concept_id|display]] markup.
 */
@Entity @Table(name = "concepts")
public class ConceptEntity {
    @Id private String id;

    public ConceptEntity() {}
    public ConceptEntity(String id) { this.id = id; }

    public String getId() { return id; }
}
