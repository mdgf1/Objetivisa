package com.objetivisa.api.service;

import com.objetivisa.api.entity.*;
import com.objetivisa.api.repository.*;
import org.springframework.stereotype.Service;

@Service
public class EditorService {

    private final PolicyGroupRepository groupRepo;
    private final PolicyGroupTranslationRepository groupTrRepo;
    private final PolicyOptionTranslationRepository optionTrRepo;
    private final PartyStanceRepository stanceRepo;

    public EditorService(PolicyGroupRepository groupRepo,
                         PolicyGroupTranslationRepository groupTrRepo,
                         PolicyOptionTranslationRepository optionTrRepo,
                         PartyStanceRepository stanceRepo) {
        this.groupRepo = groupRepo;
        this.groupTrRepo = groupTrRepo;
        this.optionTrRepo = optionTrRepo;
        this.stanceRepo = stanceRepo;
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
