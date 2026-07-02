package com.objetivisa.api.repository.party;

import com.objetivisa.api.entity.party.PartyStanceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PartyStanceRepository extends JpaRepository<PartyStanceEntity, Long> {
    List<PartyStanceEntity> findAll();
    java.util.Optional<PartyStanceEntity> findByOptionIdAndPartyId(String optionId, String partyId);
}
