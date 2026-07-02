package com.objetivisa.api.repository.party;

import com.objetivisa.api.entity.party.PartyPersonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PartyPersonRepository extends JpaRepository<PartyPersonEntity, Long> {
    List<PartyPersonEntity> findByPartyIdOrderByDisplayOrder(String partyId);
}
