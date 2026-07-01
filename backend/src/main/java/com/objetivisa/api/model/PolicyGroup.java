package com.objetivisa.api.model;

import java.util.List;

public record PolicyGroup(String id, String name, String icon, String currentOptionId, String classificationReason, List<PolicyOption> options) {}
