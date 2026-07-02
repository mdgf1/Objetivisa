package com.objetivisa.api.entity.policy;

import jakarta.persistence.*;

@Entity @Table(name = "policy_options")
public class PolicyOptionEntity {
    @Id private String id;
    private String groupId;
    private String iconUrl;
    private int displayOrder;

    public PolicyOptionEntity() {}
    public PolicyOptionEntity(String id, String groupId, String iconUrl, int displayOrder) {
        this.id = id; this.groupId = groupId; this.iconUrl = iconUrl; this.displayOrder = displayOrder;
    }

    public String getId() { return id; }
    public String getGroupId() { return groupId; }
    public String getIconUrl() { return iconUrl; }
    public int getDisplayOrder() { return displayOrder; }
}
