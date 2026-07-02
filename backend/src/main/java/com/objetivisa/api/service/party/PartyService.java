package com.objetivisa.api.service.party;

import com.objetivisa.api.entity.party.*;
import com.objetivisa.api.model.party.*;
import com.objetivisa.api.repository.party.*;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class PartyService {

    private static final String EN = "en";

    private final PartyRepository partyRepo;
    private final PartyTranslationRepository partyTrRepo;
    private final AgendaPriorityRepository agendaRepo;
    private final PartyPositionRepository positionRepo;
    private final PartyPositionTranslationRepository positionTrRepo;
    private final PartyPersonRepository personRepo;
    private final PartyPersonTranslationRepository personTrRepo;
    private final PartyHistoryEventRepository historyRepo;
    private final PartyHistoryEventTranslationRepository historyTrRepo;

    public PartyService(PartyRepository partyRepo,
                        PartyTranslationRepository partyTrRepo,
                        AgendaPriorityRepository agendaRepo,
                        PartyPositionRepository positionRepo,
                        PartyPositionTranslationRepository positionTrRepo,
                        PartyPersonRepository personRepo,
                        PartyPersonTranslationRepository personTrRepo,
                        PartyHistoryEventRepository historyRepo,
                        PartyHistoryEventTranslationRepository historyTrRepo) {
        this.partyRepo = partyRepo;
        this.partyTrRepo = partyTrRepo;
        this.agendaRepo = agendaRepo;
        this.positionRepo = positionRepo;
        this.positionTrRepo = positionTrRepo;
        this.personRepo = personRepo;
        this.personTrRepo = personTrRepo;
        this.historyRepo = historyRepo;
        this.historyTrRepo = historyTrRepo;
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

    /** Returns the party's positions, people and history in the requested locale, or null if unknown. */
    public PartyDetail getPartyDetail(String partyId, String lang) {
        if (!partyRepo.existsById(partyId)) return null;

        List<PartyPosition> positions = positions(partyId, lang);
        List<PartyPerson> people = people(partyId, lang);
        List<PartyHistoryEvent> history = history(partyId, lang);
        return new PartyDetail(partyId, positions, people, history);
    }

    private List<PartyPosition> positions(String partyId, String lang) {
        List<PartyPositionEntity> rows = positionRepo.findByPartyIdOrderByDisplayOrder(partyId);
        List<Long> ids = rows.stream().map(PartyPositionEntity::getId).toList();
        List<PartyPositionTranslation> trs = positionTrRepo.findByPositionIdInAndLocaleIn(ids, List.of(EN, lang));
        Map<Long, String> topics = resolve(trs, PartyPositionTranslation::getPositionId,
            PartyPositionTranslation::getLocale, PartyPositionTranslation::getTopic, lang);
        Map<Long, String> summaries = resolve(trs, PartyPositionTranslation::getPositionId,
            PartyPositionTranslation::getLocale, PartyPositionTranslation::getSummary, lang);
        return rows.stream()
            .map(r -> new PartyPosition(topics.getOrDefault(r.getId(), ""), summaries.getOrDefault(r.getId(), "")))
            .toList();
    }

    private List<PartyPerson> people(String partyId, String lang) {
        List<PartyPersonEntity> rows = personRepo.findByPartyIdOrderByDisplayOrder(partyId);
        List<Long> ids = rows.stream().map(PartyPersonEntity::getId).toList();
        List<PartyPersonTranslation> trs = personTrRepo.findByPersonIdInAndLocaleIn(ids, List.of(EN, lang));
        Map<Long, String> names = resolve(trs, PartyPersonTranslation::getPersonId,
            PartyPersonTranslation::getLocale, PartyPersonTranslation::getName, lang);
        Map<Long, String> roles = resolve(trs, PartyPersonTranslation::getPersonId,
            PartyPersonTranslation::getLocale, PartyPersonTranslation::getRole, lang);
        return rows.stream()
            .map(r -> new PartyPerson(names.getOrDefault(r.getId(), ""), roles.getOrDefault(r.getId(), ""), r.getImageUrl()))
            .toList();
    }

    private List<PartyHistoryEvent> history(String partyId, String lang) {
        List<PartyHistoryEventEntity> rows = historyRepo.findByPartyIdOrderByDisplayOrder(partyId);
        List<Long> ids = rows.stream().map(PartyHistoryEventEntity::getId).toList();
        List<PartyHistoryEventTranslation> trs = historyTrRepo.findByEventIdInAndLocaleIn(ids, List.of(EN, lang));
        Map<Long, String> titles = resolve(trs, PartyHistoryEventTranslation::getEventId,
            PartyHistoryEventTranslation::getLocale, PartyHistoryEventTranslation::getTitle, lang);
        Map<Long, String> descriptions = resolve(trs, PartyHistoryEventTranslation::getEventId,
            PartyHistoryEventTranslation::getLocale, PartyHistoryEventTranslation::getDescription, lang);
        return rows.stream()
            .map(r -> new PartyHistoryEvent(r.getYear(), titles.getOrDefault(r.getId(), ""),
                descriptions.getOrDefault(r.getId(), "")))
            .toList();
    }

    /**
     * Builds an id → value map preferring the requested locale, falling back to English.
     * English is applied first as the base, then the requested locale overrides it.
     */
    private <K, T> Map<K, String> resolve(List<T> translations,
                                          Function<T, K> idFn,
                                          Function<T, String> localeFn,
                                          Function<T, String> valueFn,
                                          String lang) {
        Map<K, String> map = new HashMap<>();
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
