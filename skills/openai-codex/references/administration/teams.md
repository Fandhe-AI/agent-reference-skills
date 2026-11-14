# Set up and manage teams and Team Tasks

Teams give ChatGPT members a shared place to organize work; Team Tasks run on a schedule or on an event in the cloud with the team's service account and configured app connections.

## Signature / Usage

Example Team Task (Customer success team, scheduled):

```text
Each Monday, summarize the previous week's customer updates, follow-ups and open questions.
```

Set up a team: **Settings > Teams** > **Create team** (Name, optional Description) > **Invite** members > add the team's connections.

Create a Team Task: **Scheduled** > **+ New Task** > select the **Team toggle** and team > choose a **Trigger** (**Schedule** with timing and time zone, or a supported event trigger with its required connection) > write **Instructions** (goal, expected output, success criteria, guardrails, linked sources) > review **Plugins** and **Advanced** (**Model**) > **Create** > **Run now** and inspect **Previous runs**.

## Options / Props

| Permission (workspace owner enables via settings or custom roles) | Required for |
| --- | --- |
| Create teams | Creating a team |
| Create and manage team tasks (team automations) | Creating or editing team tasks, across supported entry points |

| Role | Responsibility |
| --- | --- |
| Workspace admin | Set up and authorize workspace connections, choose who can find and use them, check the external account's data and action permissions |
| Team owner | Select available connections for the team, confirm which external account each connection uses before scheduling |

## Notes

- A team is separate from workspace groups (manual or SCIM) and from Slack / Microsoft Teams channels; membership can't be imported or synced.
- The creator becomes team owner without workspace admin rights. Members can invite coworkers and remove non-owner members; same-workspace join links need no owner approval. Only the owner can delete the team; owners must transfer ownership before leaving (connections the new owner can't access become disabled for the whole team).
- New members see all earlier runs and generated files; tasks and runs can't have separate access restrictions. Pages and Spaces keep their own sharing. Joining doesn't share personal chats or connections.
- Tasks don't inherit the creator's memories, custom instructions, or chat history. Tasks use the team's service account; a connection's account decides data and actions and can exceed a member's own access.
- Unattended runs can't complete a new app sign-in and remain subject to action-approval requirements. Pausing stops future runs; neither pausing nor deleting reliably interrupts an active run.
- Audit: the team's Activity view; Compliance API records (confirm coverage first); Admin API reference for fields. Billing: workspace credits; team spending limits are separate from user limits.
- Source: https://learn.chatgpt.com/docs/enterprise/teams (retrieved 2026-11-14).

## Related

- [Shared connections](./shared-connections.md)
- [Roles and workspace permissions](./roles-and-workspace-permissions.md)
- [Groups and provisioning](./groups-and-provisioning.md)
- [Compliance API](./compliance-api.md)
