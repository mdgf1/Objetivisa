package com.objetivisa.api.service.editor;

import com.objetivisa.api.entity.concept.*;
import com.objetivisa.api.entity.party.*;
import com.objetivisa.api.entity.policy.*;
import com.objetivisa.api.repository.concept.*;
import com.objetivisa.api.repository.party.*;
import com.objetivisa.api.repository.policy.*;
import org.springframework.stereotype.Service;

@Service
public class EditorService {

    private final PolicyGroupRepository groupRepo;
    private final PolicyGroupTranslationRepository groupTrRepo;
    private final PolicyOptionTranslationRepository optionTrRepo;
    private final PartyStanceRepository stanceRepo;
    private final ConceptRepository conceptRepo;
    private final ConceptTranslationRepository conceptTrRepo;

    public EditorService(PolicyGroupRepository groupRepo,
                         PolicyGroupTranslationRepository groupTrRepo,
                         PolicyOptionTranslationRepository optionTrRepo,
                         PartyStanceRepository stanceRepo,
                         ConceptRepository conceptRepo,
                         ConceptTranslationRepository conceptTrRepo) {
        this.groupRepo = groupRepo;
        this.groupTrRepo = groupTrRepo;
        this.optionTrRepo = optionTrRepo;
        this.stanceRepo = stanceRepo;
        this.conceptRepo = conceptRepo;
        this.conceptTrRepo = conceptTrRepo;
    }

    /** Creates a concept (if new) and upserts its translation for the given locale. */
    public void createConcept(String id, String lang, String name, String description) {
        if (!conceptRepo.existsById(id)) conceptRepo.save(new ConceptEntity(id));
        ConceptTranslation tr = conceptTrRepo.findByConceptIdAndLocale(id, lang)
            .orElse(new ConceptTranslation(id, lang, null, null));
        tr.setName(name);
        tr.setDescription(description);
        conceptTrRepo.save(tr);
    }

    /** Sets the in-depth card body for a concept in the given locale. */
    public void saveConceptCard(String id, String lang, String card) {
        ConceptTranslation tr = conceptTrRepo.findByConceptIdAndLocale(id, lang)
            .orElse(new ConceptTranslation(id, lang, null, null));
        tr.setCard(card);
        conceptTrRepo.save(tr);
    }

    public void updateGroup(String id, String lang, String name, String currentOptionId, String classificationReason) {
        groupRepo.findById(id).ifPresent(g -> {
            g.setCurrentOptionId(currentOptionId);
            groupRepo.save(g);
        });
        PolicyGroupTranslation tr = groupTrRepo.findByGroupIdAndLocale(id, lang)
            .orElse(new PolicyGroupTranslation(id, lang, null, null));
        tr.setName(name);
        tr.setClassificationReason(classificationReason);
        groupTrRepo.save(tr);
    }

    public void updateOption(String id, String lang, String name, String description) {
        PolicyOptionTranslation tr = optionTrRepo.findByOptionIdAndLocale(id, lang)
            .orElse(new PolicyOptionTranslation(id, lang, null, null));
        tr.setName(name);
        tr.setDescription(description);
        optionTrRepo.save(tr);
    }

    public void updateStance(String optionId, String partyId, String stance) {
        PartyStanceEntity s = stanceRepo.findByOptionIdAndPartyId(optionId, partyId)
            .orElse(new PartyStanceEntity(optionId, partyId, stance));
        s.setStance(stance);
        stanceRepo.save(s);
    }
}
