package com.objetivisa.api.controller.editor;

import com.objetivisa.api.service.editor.EditorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/editor")
@CrossOrigin(origins = "http://localhost:3000")
public class EditorController {

    private final EditorService editorService;

    public EditorController(EditorService editorService) {
        this.editorService = editorService;
    }

    record GroupBody(String name, String currentOptionId, String classificationReason) {}
    record OptionBody(String name, String description) {}
    record StanceBody(String stance) {}
    record ConceptBody(String id, String name, String description) {}
    record CardBody(String card) {}

    @PostMapping("/concepts")
    public ResponseEntity<Void> createConcept(
            @RequestParam(defaultValue = "pt") String lang,
            @RequestBody ConceptBody body) {
        editorService.createConcept(body.id(), lang, body.name(), body.description());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/concepts/{id}/card")
    public ResponseEntity<Void> saveConceptCard(
            @PathVariable String id,
            @RequestParam(defaultValue = "pt") String lang,
            @RequestBody CardBody body) {
        editorService.saveConceptCard(id, lang, body.card());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/groups/{id}")
    public ResponseEntity<Void> updateGroup(
            @PathVariable String id,
            @RequestParam(defaultValue = "pt") String lang,
            @RequestBody GroupBody body) {
        editorService.updateGroup(id, lang, body.name(), body.currentOptionId(), body.classificationReason());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/options/{id}")
    public ResponseEntity<Void> updateOption(
            @PathVariable String id,
            @RequestParam(defaultValue = "pt") String lang,
            @RequestBody OptionBody body) {
        editorService.updateOption(id, lang, body.name(), body.description());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/stances/{optionId}/{partyId}")
    public ResponseEntity<Void> updateStance(
            @PathVariable String optionId,
            @PathVariable String partyId,
            @RequestBody StanceBody body) {
        editorService.updateStance(optionId, partyId, body.stance());
        return ResponseEntity.ok().build();
    }
}
