package com.objetivisa.api.repository.policy;

import com.objetivisa.api.entity.policy.PolicyOptionTranslation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PolicyOptionTranslationRepository extends JpaRepository<PolicyOptionTranslation, Long> {
    List<PolicyOptionTranslation> findByLocaleIn(List<String> locales);
    java.util.Optional<PolicyOptionTranslation> findByOptionIdAndLocale(String optionId, String locale);
}
