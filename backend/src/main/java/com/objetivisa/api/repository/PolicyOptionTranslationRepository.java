package com.objetivisa.api.repository;

import com.objetivisa.api.entity.PolicyOptionTranslation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PolicyOptionTranslationRepository extends JpaRepository<PolicyOptionTranslation, Long> {
    List<PolicyOptionTranslation> findByLocaleIn(List<String> locales);
    java.util.Optional<PolicyOptionTranslation> findByOptionIdAndLocale(String optionId, String locale);
}
