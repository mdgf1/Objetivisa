package com.objetivisa.api.repository;

import com.objetivisa.api.entity.PolicyGroupTranslation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PolicyGroupTranslationRepository extends JpaRepository<PolicyGroupTranslation, Long> {
    List<PolicyGroupTranslation> findByLocaleIn(List<String> locales);
    java.util.Optional<PolicyGroupTranslation> findByGroupIdAndLocale(String groupId, String locale);
}
