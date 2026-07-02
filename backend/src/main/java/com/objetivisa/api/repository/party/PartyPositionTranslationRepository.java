package com.objetivisa.api.repository.party;

import com.objetivisa.api.entity.party.PartyPositionTranslation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PartyPositionTranslationRepository extends JpaRepository<PartyPositionTranslation, Long> {
    List<PartyPositionTranslation> findByPositionIdInAndLocaleIn(List<Long> positionIds, List<String> locales);
}
