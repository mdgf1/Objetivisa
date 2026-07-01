package com.objetivisa.api.repository;

import com.objetivisa.api.entity.PolicyOptionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PolicyOptionRepository extends JpaRepository<PolicyOptionEntity, String> {
    List<PolicyOptionEntity> findAllByOrderByGroupIdAscDisplayOrderAsc();
}
