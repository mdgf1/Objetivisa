package com.objetivisa.api.repository.concept;

import com.objetivisa.api.entity.concept.ConceptTranslation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ConceptTranslationRepository extends JpaRepository<ConceptTranslation, Long> {
    List<ConceptTranslation> findByLocaleIn(List<String> locales);
    Optional<ConceptTranslation> findByConceptIdAndLocale(String conceptId, String locale);
}
