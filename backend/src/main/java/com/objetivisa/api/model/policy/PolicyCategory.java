package com.objetivisa.api.model.policy;

import java.util.List;

public record PolicyCategory(String id, String name, List<PolicyGroup> groups) {}
