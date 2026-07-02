package com.objetivisa.api.controller.party;

import com.objetivisa.api.model.party.Party;
import com.objetivisa.api.model.party.PartyDetail;
import com.objetivisa.api.service.party.PartyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parties")
@CrossOrigin(origins = "http://localhost:3000")
public class PartyController {

    private final PartyService partyService;

    public PartyController(PartyService partyService) {
        this.partyService = partyService;
    }

    @GetMapping
    public List<Party> parties(@RequestParam(defaultValue = "pt") String lang) {
        return partyService.getParties(lang);
    }

    @GetMapping("/{id}/detail")
    public ResponseEntity<PartyDetail> partyDetail(@PathVariable String id,
                                                   @RequestParam(defaultValue = "pt") String lang) {
        PartyDetail detail = partyService.getPartyDetail(id, lang);
        return detail == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(detail);
    }
}
