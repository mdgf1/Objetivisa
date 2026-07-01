package com.objetivisa.api.model;

import java.util.List;

public record PolicyCategory(String id, String name, List<PolicyGroup> groups) {}
