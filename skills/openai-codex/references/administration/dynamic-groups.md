# Dynamic groups

Dynamic groups organize workspace members using user attributes that the identity provider sends through SCIM; membership follows rules such as department or location.

## Signature / Usage

Create in ChatGPT Admin: **Identity & access** > **Groups & roles** > **Create group** (**+**), enter a name, turn on **Dynamic group**, select **Next**. Under **Add membership rules** choose an **Attribute**, an **Operator**, and a **Value**; **Add condition** adds more rules. Members must match **all conditions**. Select **Create**, then **Re-sync** to apply the rules to existing members.

Attribute paths inside a SCIM extension object start with `/`:

```text
/urn:ietf:params:scim:schemas:extension:enterprise:2.0:User/department
```

Example rule set: `department` Equals `Engineering` AND `location` Equals `London`.

## Options / Props

### Supported SCIM attributes

All attributes use the string type, including `isAdmin`. A plain field name is a top-level field.

| Attribute | Recognized fields in the SCIM payload |
| --- | --- |
| `department` | `department`; `.../enterprise:2.0:User/department`; `/urn:scim:schemas:extension:enterprise:1.0/department`; `/urn:scim:schemas:extension:enterprise:2.0/department` |
| `title` | `title` |
| `manager` | `manager`; `value` or `displayName` under the enterprise 2.0:User, enterprise:1.0, and enterprise:2.0 extension objects |
| `costCenter` | `costCenter`; enterprise 2.0:User and enterprise:1.0 extension paths |
| `division` | `division`; enterprise 2.0:User and enterprise:1.0 extension paths |
| `organization` | `organization`; enterprise 2.0:User and enterprise:1.0 extension paths |
| `userType` | `userType` |
| `country` | `country` (top-level field) |
| `isAdmin` | `isAdmin` |
| `location` | `location` |

### Actions

| Action | Where | Behavior |
| --- | --- | --- |
| Edit rules | Group > **Settings** > **Save changes** | Stores rules without starting a re-sync |
| **Re-sync** | Group > **Settings** > **Membership rules** | Re-evaluates membership against saved rules and SCIM attributes already in the workspace; unavailable with unsaved changes |
| **Cancel sync** | **Syncing group membership** panel | Available while queued; can leave membership partially updated |
| View attributes | **Identity & access** > **Members** > member profile card > **SCIM attributes** | Shows each attribute and value |

## Notes

- Prerequisites: workspace owner or admin in a workspace where dynamic groups are available; SCIM provisioning configured and the identity provider sending the attributes; rule values must match what the identity provider sends.
- Group membership and feature permissions are separate; roles, seat type, and product eligibility still determine access.
- Rule controls are unavailable while a sync is active. After any rule change, save then run **Re-sync** again. If a member is missing, check their SCIM attributes reached the workspace and match every condition.
- Source: https://learn.chatgpt.com/docs/enterprise/dynamic-groups (retrieved 2026-11-14).

## Related

- [Groups and provisioning](./groups-and-provisioning.md)
- [Roles and workspace permissions](./roles-and-workspace-permissions.md)
