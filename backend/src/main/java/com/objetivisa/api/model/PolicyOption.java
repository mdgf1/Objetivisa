package com.objetivisa.api.model;

import java.util.List;

public record PolicyOption(String id, String name, String description, String iconUrl, List<PartyStance> stances) {}
