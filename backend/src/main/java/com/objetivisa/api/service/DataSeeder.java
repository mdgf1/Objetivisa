package com.objetivisa.api.service;

import com.objetivisa.api.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

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

    public DataSeeder(CategoryRepository categoryRepo, CategoryTranslationRepository categoryTrRepo,
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

    @Override
    public void run(String... args) {
        // Data is managed via db/seed.sql (scripts/dump.sh / scripts/restore.sh)
    }
}
