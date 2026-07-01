package com.objetivisa.api.repository;

import com.objetivisa.api.entity.PolicyGroupEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PolicyGroupRepository extends JpaRepository<PolicyGroupEntity, String> {
    List<PolicyGroupEntity> findAllByOrderByCategoryIdAscDisplayOrderAsc();
}
