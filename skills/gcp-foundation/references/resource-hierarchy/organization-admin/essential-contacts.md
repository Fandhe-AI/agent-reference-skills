---
source: https://docs.cloud.google.com/resource-manager/docs/managing-notification-contacts
---

# Essential Contacts

A central directory of custom contacts per notification category across projects, folders, and the organization. Essential Contacts does not send email itself; other Google Cloud services read the contacts to address their notifications.

## Signature / Usage

List contacts defined on a resource (`RESOURCE_TYPE` is `project`, `folder`, or `organization`; for projects use the numeric project number):

```bash
gcloud essential-contacts list --RESOURCE_TYPE="RESOURCE_ID"
```

```yaml
---
email: my-contact-1@example.com
languageTag: en-US
name: projects/my-projects/contacts/1
notificationCategorySubscriptions:
- ALL
---
email: my-contact-2@example.com
languageTag: en-US
name: projects/my-projects/contacts/2
notificationCategorySubscriptions:
- BILLING
---
```

List contacts including inherited ones:

```bash
gcloud essential-contacts compute --notification-categories="NOTIFICATION_CATEGORY" \
  --RESOURCE_TYPE="RESOURCE_ID"
```

Add a contact (no output on success; email cannot be changed afterwards):

```bash
gcloud essential-contacts create --email="EMAIL" \
    --notification-categories="NOTIFICATION_CATEGORY" \
    --language="LANGUAGE" \
    --RESOURCE_TYPE="RESOURCE_ID"
```

Update a contact:

Adapted (not in the official docs): `--RESOURCE_TYPE="RESOURCE_ID"` is added so the contact is updated under the intended parent (the official sample omits it, unlike the other examples).

```bash
gcloud essential-contacts update CONTACT_ID \
    --notification-categories="NOTIFICATION_CATEGORY" \
    --language="LANGUAGE" \
    --RESOURCE_TYPE="RESOURCE_ID"
```

Delete a contact:

```bash
gcloud essential-contacts delete CONTACT_ID \
    --RESOURCE_TYPE="RESOURCE_ID"
```

REST (`RESOURCE_TYPE` is `projects`, `folders`, or `organizations`):

```
POST essentialcontacts.googleapis.com/v1/RESOURCE_TYPE/RESOURCE_ID/contacts
```

```
{
  "email": "EMAIL",
  "notificationCategorySubscriptions": [
    "NOTIFICATION_CATEGORY_1",
    "NOTIFICATION_CATEGORY_2"
  ],
  "languageTag": "LANGUAGE"
}
```

```
curl -X DELETE \
-H "Authorization: Bearer "$(gcloud auth application-default print-access-token) \
https://essentialcontacts.googleapis.com/v1/RESOURCE_TYPE/RESOURCE_ID/contacts/CONTACT_ID
```

Terraform:

```bash
resource "google_essential_contacts_contact" "contact" {
  parent = "RESOURCE_TYPE/RESOURCE_ID"
  email = "EMAIL"
  language_tag = "LANGUAGE"
  notification_category_subscriptions = [NOTIFICATION_CATEGORY]
}
```

## Options / Props

Notification categories (gcloud values `billing`, `legal`, `product-updates`, `security`, `suspension`, `technical`, `all`, `notification-category-unspecified`; REST / Terraform use `BILLING`, `LEGAL`, `PRODUCT_UPDATES`, `SECURITY`, `SUSPENSION`, `TECHNICAL`, `ALL`):

| Category | Content | Recommended contact | Recommended level |
|----------|---------|---------------------|-------------------|
| Billing | Price updates, payment errors, budget alerts, invoice changes, overdue payments | Finance staff | Organization |
| Legal | Enforcement actions, compliance audits, government notices, ToS changes | Legal counsel, compliance officers | Organization |
| Product updates | Feature announcements, deprecations, migrations | Product managers, architects, lead engineers | Folder / project |
| Security | Security bulletins, vulnerabilities, breaches, abuse, cryptomining, ToS violations, project deletion | Security team, SOC, incident response, CISO | Organization if a central group manages security, else project |
| Suspension | Potential or actual suspensions for policy or payment violations | Operations leads | Folder / project |
| Technical | Maintenance, outages, SLO breaches, logging config errors | SRE, on-call, sysadmins | Folder / project |
| All | Superset of all categories | Automated ticketing / logging, central operations | Folder / project |

Roles: Essential Contacts Viewer (`roles/essentialcontacts.viewer`) to view; Essential Contacts Admin (`roles/essentialcontacts.admin`) to view, create, edit, and delete.

## Notes

- Without custom contacts for a category, IAM principals act as fallback contacts. Services may also notify other principals with relevant IAM roles; each product governs its own notification channels and opt-ins.
- Contacts are inherited down the hierarchy: organization-level contacts receive notifications for the organization and all folders / projects.
- Use group aliases or mailing lists (for example `security-team@yourcompany.com`) rather than individuals; review at least annually. Console may prompt for yearly verification; an unvalidated contact still receives notifications unless its address is invalid.
- Test email: from the console, Category view > Send; at most one test email per contact per category and resource every 24 hours; sender `gcp-essential-contacts-noreply@google.com`. Notification emails come from `@google.com` addresses.
- Each contact has a preferred language (set automatically from the creator's console language; set manually via API with a language code).
- Limit contact domains with the organization policy constraints `constraints/essentialcontacts.allowedContactDomains` (legacy) or `essentialcontacts.managed.allowedContactDomains` (managed); existing contacts are unaffected. A custom-constraint variant is documented under Essential Contacts custom organization policies.
- Resource Manager audit logs exist for Essential Contacts under `essentialcontacts.googleapis.com`.
- Adapted from the official docs: the `essential-contacts update` example specifies the parent (`--RESOURCE_TYPE="RESOURCE_ID"`), since `CONTACT_ID` is only unique per parent.
- Source: https://docs.cloud.google.com/resource-manager/docs/managing-notification-contacts
- Source: https://docs.cloud.google.com/resource-manager/docs/manage-essential-contacts
- Retrieved 2026-11-14. Content is CC BY 4.0; code examples are Apache 2.0.

## Related

- [organization-resource.md](./organization-resource.md)
- [../organization-policy/constraints-reference.md](../organization-policy/constraints-reference.md)
- [../organization-policy/custom-constraint-supported-services.md](../organization-policy/custom-constraint-supported-services.md)
