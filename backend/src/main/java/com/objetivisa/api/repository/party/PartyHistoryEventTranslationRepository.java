package com.objetivisa.api.repository.party;

import com.objetivisa.api.entity.party.PartyHistoryEventTranslation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PartyHistoryEventTranslationRepository extends JpaRepository<PartyHistoryEventTranslation, Long> {
    List<PartyHistoryEventTranslation> findByEventIdInAndLocaleIn(List<Long> eventIds, List<String> locales);
}
