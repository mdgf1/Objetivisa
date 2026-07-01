package com.objetivisa.api.service;

import com.objetivisa.api.entity.*;
import com.objetivisa.api.model.*;
import com.objetivisa.api.repository.*;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class PolicyService {

    private static final String EN = "en";

    private final CategoryRepository categoryRepo;
    private final CategoryTranslationRepository categoryTrRepo;
    private final PolicyGroupRepository groupRepo;
    private final PolicyGroupTranslationRepository groupTrRepo;
    private final PolicyOptionRepository optionRepo;
    private final PolicyOptionTranslationRepository optionTrRepo;
    private final PartyRepository partyRepo;
    private final PartyTranslationRepository partyTrRepo;
    private final PartyStanceRepository stanceRepo;
    private final AgendaPriorityRepository agendaRepo;

    public PolicyService(CategoryRepository categoryRepo, CategoryTranslationRepository categoryTrRepo,
                         PolicyGroupRepository groupRepo, PolicyGroupTranslationRepository groupTrRepo,
                         PolicyOptionRepository optionRepo, PolicyOptionTranslationRepository optionTrRepo,
                         PartyRepository partyRepo, PartyTranslationRepository partyTrRepo,
                         PartyStanceRepository stanceRepo, AgendaPriorityRepository agendaRepo) {
        this.categoryRepo = categoryRepo;
        this.categoryTrRepo = categoryTrRepo;
        this.groupRepo = groupRepo;
        this.groupTrRepo = groupTrRepo;
        this.optionRepo = optionRepo;
        this.optionTrRepo = optionTrRepo;
        this.partyRepo = partyRepo;
        this.partyTrRepo = partyTrRepo;
        this.stanceRepo = stanceRepo;
        this.agendaRepo = agendaRepo;
    }

    public List<Party> getParties(String lang) {
        // partyId → name, preferring requested locale, falling back to English
        Map<String, String> names = resolve(partyTrRepo.findByLocaleIn(List.of(EN, lang)),
            PartyTranslation::getPartyId, PartyTranslation::getLocale, PartyTranslation::getName, lang);

        // partyId → list of agenda priorities
        Map<String, List<AgendaPriority>> agenda = agendaRepo.findAll().stream()
            .collect(Collectors.groupingBy(AgendaPriorityEntity::getPartyId,
                Collectors.mapping(a -> new AgendaPriority(a.getCategoryId(), a.getPriority()), Collectors.toList())));

        return partyRepo.findAll().stream()
            .map(p -> new Party(p.getId(), names.getOrDefault(p.getId(), p.getId()), p.getColor(),
                agenda.getOrDefault(p.getId(), List.of())))
            .toList();
    }

    public List<PolicyCategory> getCategories(String lang) {
        Map<String, String> categoryNames = resolve(categoryTrRepo.findByLocaleIn(List.of(EN, lang)),
            CategoryTranslation::getCategoryId, CategoryTranslation::getLocale, CategoryTranslation::getName, lang);

        // group translations: groupId → (name, reason)
        List<PolicyGroupTranslation> groupTrs = groupTrRepo.findByLocaleIn(List.of(EN, lang));
        Map<String, String> groupNames = resolve(groupTrs,
            PolicyGroupTranslation::getGroupId, PolicyGroupTranslation::getLocale, PolicyGroupTranslation::getName, lang);
        Map<String, String> groupReasons = resolve(groupTrs,
            PolicyGroupTranslation::getGroupId, PolicyGroupTranslation::getLocale,
            PolicyGroupTranslation::getClassificationReason, lang);

        // option translations: optionId → (name, description)
        List<PolicyOptionTranslation> optionTrs = optionTrRepo.findByLocaleIn(List.of(EN, lang));
        Map<String, String> optionNames = resolve(optionTrs,
            PolicyOptionTranslation::getOptionId, PolicyOptionTranslation::getLocale,
            PolicyOptionTranslation::getName, lang);
        Map<String, String> optionDescriptions = resolve(optionTrs,
            PolicyOptionTranslation::getOptionId, PolicyOptionTranslation::getLocale,
            PolicyOptionTranslation::getDescription, lang);

        // stances: optionId → list
        Map<String, List<PartyStance>> stancesByOption = stanceRepo.findAll().stream()
            .collect(Collectors.groupingBy(PartyStanceEntity::getOptionId,
                Collectors.mapping(s -> new PartyStance(s.getPartyId(), s.getStance()), Collectors.toList())));

        // options grouped by group, ordered
        Map<String, List<PolicyOption>> optionsByGroup = optionRepo.findAll().stream()
            .sorted(Comparator.comparingInt(PolicyOptionEntity::getDisplayOrder))
            .collect(Collectors.groupingBy(PolicyOptionEntity::getGroupId, LinkedHashMap::new,
                Collectors.mapping(o -> new PolicyOption(
                    o.getId(),
                    optionNames.getOrDefault(o.getId(), o.getId()),
                    optionDescriptions.getOrDefault(o.getId(), ""),
                    o.getIconUrl(),
                    stancesByOption.getOrDefault(o.getId(), List.of())
                ), Collectors.toList())));

        // groups grouped by category, ordered
        Map<String, List<PolicyGroup>> groupsByCategory = groupRepo.findAll().stream()
            .sorted(Comparator.comparingInt(PolicyGroupEntity::getDisplayOrder))
            .collect(Collectors.groupingBy(PolicyGroupEntity::getCategoryId, LinkedHashMap::new,
                Collectors.mapping(g -> new PolicyGroup(
                    g.getId(),
                    groupNames.getOrDefault(g.getId(), g.getId()),
                    g.getIcon(),
                    g.getCurrentOptionId(),
                    groupReasons.getOrDefault(g.getId(), ""),
                    optionsByGroup.getOrDefault(g.getId(), List.of())
                ), Collectors.toList())));

        return categoryRepo.findAll().stream()
            .sorted(Comparator.comparingInt(CategoryEntity::getDisplayOrder))
            .map(c -> new PolicyCategory(
                c.getId(),
                categoryNames.getOrDefault(c.getId(), c.getId()),
                groupsByCategory.getOrDefault(c.getId(), List.of())
            ))
            .toList();
    }

    /**
     * Builds an id → value map preferring the requested locale, falling back to English.
     * English is applied first as the base, then the requested locale overrides it.
     */
    private <T> Map<String, String> resolve(List<T> translations,
                                            java.util.function.Function<T, String> idFn,
                                            java.util.function.Function<T, String> localeFn,
                                            java.util.function.Function<T, String> valueFn,
                                            String lang) {
        Map<String, String> map = new HashMap<>();
        for (T t : translations)
            if (EN.equals(localeFn.apply(t))) map.put(idFn.apply(t), valueFn.apply(t));
        for (T t : translations)
            if (lang.equals(localeFn.apply(t))) {
                String v = valueFn.apply(t);
                if (v != null) map.put(idFn.apply(t), v);
            }
        return map;
    }
}
