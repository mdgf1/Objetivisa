package com.objetivisa.api.model.party;

import java.util.List;

public record PartyDetail(
    String id,
    List<PartyPosition> positions,
    List<PartyPerson> people,
    List<PartyHistoryEvent> history
) {}
