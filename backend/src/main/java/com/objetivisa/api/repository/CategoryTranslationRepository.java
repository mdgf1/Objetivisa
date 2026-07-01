package com.objetivisa.api.repository;

import com.objetivisa.api.entity.CategoryTranslation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CategoryTranslationRepository extends JpaRepository<CategoryTranslation, Long> {
    List<CategoryTranslation> findByLocaleIn(List<String> locales);
}
