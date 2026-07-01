package com.objetivisa.api.controller;

import com.objetivisa.api.model.Party;
import com.objetivisa.api.model.PolicyCategory;
import com.objetivisa.api.service.PolicyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class PolicyController {

    private final PolicyService policyService;

    public PolicyController(PolicyService policyService) {
        this.policyService = policyService;
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "ok", "service", "visapolitica-api");
    }

    @GetMapping("/parties")
    public List<Party> parties(@RequestParam(defaultValue = "pt") String lang) {
        return policyService.getParties(lang);
    }

    @GetMapping("/categories")
    public List<PolicyCategory> categories(@RequestParam(defaultValue = "pt") String lang) {
        return policyService.getCategories(lang);
    }
}
