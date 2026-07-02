package com.objetivisa.api.repository.party;

import com.objetivisa.api.entity.party.PartyHistoryEventEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PartyHistoryEventRepository extends JpaRepository<PartyHistoryEventEntity, Long> {
    List<PartyHistoryEventEntity> findByPartyIdOrderByDisplayOrder(String partyId);
}
