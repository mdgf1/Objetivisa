package com.objetivisa.api.repository;

import com.objetivisa.api.entity.AgendaPriorityEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AgendaPriorityRepository extends JpaRepository<AgendaPriorityEntity, Long> {
    List<AgendaPriorityEntity> findAll();
}
