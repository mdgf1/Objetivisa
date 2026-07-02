package com.objetivisa.api.repository.concept;

import com.objetivisa.api.entity.concept.ConceptEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConceptRepository extends JpaRepository<ConceptEntity, String> {
}
