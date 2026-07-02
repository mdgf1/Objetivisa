package com.objetivisa.api.repository.party;

import com.objetivisa.api.entity.party.PartyPersonTranslation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PartyPersonTranslationRepository extends JpaRepository<PartyPersonTranslation, Long> {
    List<PartyPersonTranslation> findByPersonIdInAndLocaleIn(List<Long> personIds, List<String> locales);
}
