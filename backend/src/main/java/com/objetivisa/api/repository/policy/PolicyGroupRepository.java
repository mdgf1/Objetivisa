package com.objetivisa.api.repository.policy;

import com.objetivisa.api.entity.policy.PolicyGroupEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PolicyGroupRepository extends JpaRepository<PolicyGroupEntity, String> {
    List<PolicyGroupEntity> findAllByOrderByCategoryIdAscDisplayOrderAsc();
}
