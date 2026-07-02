package com.objetivisa.api.repository.policy;

import com.objetivisa.api.entity.policy.PolicyOptionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PolicyOptionRepository extends JpaRepository<PolicyOptionEntity, String> {
    List<PolicyOptionEntity> findAllByOrderByGroupIdAscDisplayOrderAsc();
}
