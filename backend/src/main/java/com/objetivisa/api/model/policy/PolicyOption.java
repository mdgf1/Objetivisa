package com.objetivisa.api.model.policy;

import com.objetivisa.api.model.party.PartyStance;
import java.util.List;

public record PolicyOption(String id, String name, String description, String iconUrl, List<PartyStance> stances) {}
