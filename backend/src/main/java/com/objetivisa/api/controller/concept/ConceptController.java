package com.objetivisa.api.controller.concept;

import com.objetivisa.api.model.concept.Concept;
import com.objetivisa.api.service.concept.ConceptService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ConceptController {

    private final ConceptService conceptService;

    public ConceptController(ConceptService conceptService) {
        this.conceptService = conceptService;
    }

    @GetMapping("/concepts")
    public List<Concept> concepts(@RequestParam(defaultValue = "pt") String lang) {
        return conceptService.getConcepts(lang);
    }
}
