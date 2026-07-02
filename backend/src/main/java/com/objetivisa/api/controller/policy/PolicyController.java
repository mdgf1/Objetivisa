package com.objetivisa.api.controller.policy;

import com.objetivisa.api.model.policy.PolicyCategory;
import com.objetivisa.api.service.policy.PolicyService;
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

    @GetMapping("/categories")
    public List<PolicyCategory> categories(@RequestParam(defaultValue = "pt") String lang) {
        return policyService.getCategories(lang);
    }
}
