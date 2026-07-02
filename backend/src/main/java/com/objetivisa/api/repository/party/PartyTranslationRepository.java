package com.objetivisa.api.repository.party;

import com.objetivisa.api.entity.party.PartyTranslation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PartyTranslationRepository extends JpaRepository<PartyTranslation, Long> {
    List<PartyTranslation> findByLocaleIn(List<String> locales);
}
