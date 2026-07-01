package com.objetivisa.api.repository;

import com.objetivisa.api.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CategoryRepository extends JpaRepository<CategoryEntity, String> {
    List<CategoryEntity> findAllByOrderByDisplayOrderAsc();
}
