package com.objetivisa.api.repository.policy;

import com.objetivisa.api.entity.policy.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CategoryRepository extends JpaRepository<CategoryEntity, String> {
    List<CategoryEntity> findAllByOrderByDisplayOrderAsc();
}
