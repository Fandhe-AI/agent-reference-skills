# Workspace connections

A workspace connection lets an eligible Team Task or @ChatGPT surface use a company-managed app account without each participant connecting a personal account.

## Signature / Usage

Create: Admin Console > select workspace > **Workspace connections** > **+** > choose the app, authenticate the designated account (enable real-time app access if prompted), verify the account and permissions, give the connection a descriptive nickname such as:

```text
Project reporting: read access.
```

then grant access to approved users, teams, or service accounts (review use and management permissions separately) and hand off to the team or workflow owner to select and test.

## Options / Props

### Responsibilities

| Role | Responsibility |
| --- | --- |
| Workspace administrator | Needs permission to manage plugins; creates/authorizes the connection and sets who can find, use, and manage it |
| Provider administrator | Provisions accounts and approves source-service access (involve for Notion and Linear) |
| Connection account | Approved account or service identity with only the required access; avoid an employee's personal account |
| Connection owner | Maintains authorization, coordinates permission changes, restores failed access |
| Team or workflow owner | Agrees on resources/actions with the admin, selects and tests the connection |

### Per-app setup

| App | Setup |
| --- | --- |
| Google Drive | Google sign-in with an approved account, or a Google Cloud service account JSON key (no domain-wide delegation); share files/folders with the service-account email; use a shared drive to create files (service accounts can't own My Drive files) |
| Gmail | OAuth with the designated mailbox (ask IT for a separate user account if needed); test read and, if required, send; Google Groups aren't mailboxes |
| Google Workspace domain-wide delegation | Only where offered; needs super-admin approval, numeric OAuth client ID, complete JSON key; authorize exact scopes under **Security > Access and data control > API controls > Manage Domain Wide Delegation**; requires a verified requesting employee |
| GitHub | Organization-approved GitHub user-account sign-in (GitHub app sign-in unavailable at launch); test a known repository and writes separately |
| Notion | Dedicated account provisioned by the Notion admin; add the Notion plugin and sign in through Notion MCP |
| Linear | Invite a dedicated account as **Guest** limited to needed teams; add the Linear plugin |
| Slack | Use the shared ChatGPT in Slack connection; personal Slack and the dots Add to Slack connection are separate; test post, read, and search separately |

### Troubleshooting

| What happens | Who can help |
| --- | --- |
| Connection missing | Workspace administrator (role and audience) |
| Available but job doesn't use it | Surface or Team owner (configured connection for the app) |
| Source or action fails | Connection owner (identity and resource access) |
| Summary readable, source not | Source owner |
| Recipient can't open generated file | File owner (sharing) |

## Notes

- Enabling @ChatGPT in Slack or Microsoft Teams for a connection also enables its team and service-account access options; these can't be disabled independently.
- Actions use the connected account's permissions, which may exceed a member's personal access. Source links don't grant access; generated files may be private to the connected account.
- For @ChatGPT, open the surface's plugin settings, select and save the connection, then reopen to check. For a Team Task, the team service account runs the task and each app's authentication method decides the external account; confirm it supports the run type (e.g. verified employee).
- Test: read a known source, write at an approved destination, and verify an authorized user can and an unauthorized one cannot use it.
- Before disabling a connection, identify affected workflows. Revoke provider authorization separately. Before retrying a failed write or send, check the destination to avoid duplicates. Renaming doesn't change external permissions.
- Keep service-account JSON keys out of screenshots and support messages.
- Source: https://learn.chatgpt.com/docs/enterprise/shared-connections (retrieved 2026-11-14).

## Related

- [Teams](./teams.md)
- [Plugin controls](./plugin-controls.md)
- [Roles and workspace permissions](./roles-and-workspace-permissions.md)
