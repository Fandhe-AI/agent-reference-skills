---
source: https://docs.cloud.google.com/iam/docs/roles-overview
---

# IAM Roles Overview

A role is a collection of IAM permissions. There are three role types: basic (broad), predefined (granular, Google-managed), and custom (user-defined list of permissions).

## Signature / Usage

Permission format:

```
SERVICE.RESOURCE.VERB
```

Role name formats:

```text
Predefined roles: roles/SERVICE.IDENTIFIER
Project-level custom roles: projects/PROJECT_ID/roles/IDENTIFIER
Organization-level custom roles: organizations/ORG_ID/roles/IDENTIFIER
```

Ways to inspect a role: Google Cloud console, `gcloud iam roles describe`, REST `roles.get()` (predefined), `projects.roles.get()` (project custom), `organizations.roles.get()` (organization custom).

### Role components

| Component | Description |
|---|---|
| Title | Human-readable name shown in the console |
| Name | Identifier used in allow policies |
| ID | Same as name for basic and predefined roles; for custom roles, everything after `roles/` |
| Description | Human-readable description |
| Stage | Launch stage such as `ALPHA`, `BETA`, `GA` (also `DISABLED`, `DEPRECATED`) |
| Permissions | Permissions in `SERVICE.RESOURCE.VERB` form, usually 1:1 with REST methods (e.g. `pubsub.topics.publish`) |
| ETag | Basic and predefined roles always `AA==`; custom role ETags change on each modification |

### Basic roles

| Role | Permissions |
|---|---|
| Reader `roles/reader` | Read-only actions that don't affect state |
| Writer `roles/writer` | Reader plus state-modifying actions |
| Admin `roles/admin` | Writer plus sensitive tasks (tag bindings for Compute Engine, managing roles and permissions on a project, setting up billing) |

Legacy basic roles: Viewer `roles/viewer`, Editor `roles/editor`, Owner `roles/owner`. They cannot have conditions on role bindings. Owner can be granted only to Google Accounts, service accounts in your organization, and Google groups in your organization, and must be granted in the console when the user is outside the organization or the project has no organization.

### Custom roles

| Limit / rule | Value |
|---|---|
| Per organization / per project | 300 each |
| Defined at | Organization or project only (not folder) |
| Grantable on | Only within the organization or project where created |
| Role ID | Up to 64 bytes; alphanumeric, underscores, periods; cannot be changed or reused until 44-day deletion completes |
| Title | Up to 100 bytes; changeable |
| Description | Up to 300 bytes |

Permission support levels in custom roles: `SUPPORTED`, `TESTING` (not for production), `NOT_SUPPORTED`. Project-level custom roles cannot include permissions usable only at organization or folder level (e.g. `resourcemanager.folders.list`).

Lifecycle: creation, launch stage (informational), maintenance (track predefined-role permission changes, see the permissions change log), disabling (set stage `DISABLED`; role stays in policies but has no effect).

## Notes

- Basic roles contain thousands of permissions; avoid them in production. In staging/test prefer Admin/Writer/Reader over legacy roles because they support IAM Conditions.
- Cloud Storage convenience values and BigQuery special group membership give no extra permissions to Admin/Writer/Reader, but do apply to legacy basic roles.
- Permission dependencies: updating an allow policy normally needs `getIamPolicy` plus `setIamPolicy`.
- Caution: a principal who can edit custom roles in a project or organization can add any permission to any custom role there, so any custom role granted to them yields unlimited access. Restrict this to a few highly trusted principals.
- Source: https://docs.cloud.google.com/iam/docs/roles-overview
- Retrieved 2026-11-14. Text CC BY 4.0, code samples Apache 2.0.

## Related

- [policy-types-and-inheritance.md](../policy-concepts/policy-types-and-inheritance.md)
