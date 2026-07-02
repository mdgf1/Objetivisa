package com.objetivisa.api.repository.party;

import com.objetivisa.api.entity.party.PartyPositionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PartyPositionRepository extends JpaRepository<PartyPositionEntity, Long> {
    List<PartyPositionEntity> findByPartyIdOrderByDisplayOrder(String partyId);
}
