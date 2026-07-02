package com.objetivisa.api.service.concept;

import com.objetivisa.api.entity.concept.ConceptTranslation;
import com.objetivisa.api.model.concept.Concept;
import com.objetivisa.api.repository.concept.ConceptRepository;
import com.objetivisa.api.repository.concept.ConceptTranslationRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ConceptService {

    private static final String EN = "en";

    private final ConceptRepository conceptRepo;
    private final ConceptTranslationRepository conceptTrRepo;

    public ConceptService(ConceptRepository conceptRepo, ConceptTranslationRepository conceptTrRepo) {
        this.conceptRepo = conceptRepo;
        this.conceptTrRepo = conceptTrRepo;
    }

    public List<Concept> getConcepts(String lang) {
        List<ConceptTranslation> trs = conceptTrRepo.findByLocaleIn(List.of(EN, lang));
        Map<String, String> names = resolve(trs, ConceptTranslation::getName, lang);
        Map<String, String> descriptions = resolve(trs, ConceptTranslation::getDescription, lang);
        Map<String, String> cards = resolve(trs, ConceptTranslation::getCard, lang);

        return conceptRepo.findAll().stream()
            .map(c -> new Concept(
                c.getId(),
                names.getOrDefault(c.getId(), c.getId()),
                descriptions.getOrDefault(c.getId(), ""),
                cards.get(c.getId())
            ))
            .toList();
    }

    /** Builds conceptId → value preferring the requested locale, falling back to English. */
    private Map<String, String> resolve(List<ConceptTranslation> trs,
                                        java.util.function.Function<ConceptTranslation, String> valueFn,
                                        String lang) {
        Map<String, String> map = new HashMap<>();
        for (ConceptTranslation t : trs)
            if (EN.equals(t.getLocale())) map.put(t.getConceptId(), valueFn.apply(t));
        for (ConceptTranslation t : trs)
            if (lang.equals(t.getLocale())) {
                String v = valueFn.apply(t);
                if (v != null) map.put(t.getConceptId(), v);
            }
        return map;
    }
}
