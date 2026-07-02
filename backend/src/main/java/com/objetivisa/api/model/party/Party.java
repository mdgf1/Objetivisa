package com.objetivisa.api.model.party;

import java.util.List;

public record Party(String id, String name, String color, List<AgendaPriority> agendaPriorities) {}
