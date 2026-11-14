# Using the Admin plugin in ChatGPT Work

The Admin plugin manages settings, permissions, and controls inside ChatGPT Work: you state a goal in plain language, it reads current state, explains it, and guides the next supported step.

## Signature / Usage

Prompt to try (read-only role review):

```text
List the roles in workspace {workspace_id}. Separate built-in and custom roles. For each role, explain which features it can use and show the users or groups assigned to it. Don’t make changes.
```

## Options / Props

### Use cases

| Use case | Prompt gist | Mode |
| --- | --- | --- |
| List workspace roles | Roles in `{workspace_id}`, built-in vs custom, assignments | Read-only |
| Review one role | Explain `{role_id}` permissions, who has it, flag anything broad | Read-only |
| Understand access | Roles and overlaps/gaps for `{user_id}` or `{group_id}`; state what can't be verified | Read-only |
| Assign an existing role to a group | Show current roles of `{group_id}`, what `{role_id}` adds, confirm approver, wait for explicit approval, verify after | Supported change |
| Check general connector permission | Whether `{user_id}` has general connector access via roles | Read-only |
| Troubleshoot an approved change | Compare `{change_record_id}` with current workspace; check workspace and role, then owner | Read-only |
| Optimize cost and model mix | Token use and cost by use case for `{date_range}`; compare models/reasoning modes | Read-only |
| Discover usage and adoption | Tasks and tokens by team/function, top use cases, skills/plugins use | Read-only |
| Measure business value and ROI | Combine usage/cost with approved outcomes; show sources and formula | Read-only |
| Assess Codex ROI | Codex usage/cost vs approved engineering outcomes by team, repository, workflow | Read-only |

Each use case follows four steps: Gather (IDs, approval), Run, Review, Verify.

## Notes

- Scope: reads and changes only what authorized sources, credentials, and actions allow; doesn't combine every admin system, expand permissions, or expose every API action. The owning system stays the source of truth.
- Current documented scope: review roles, feature permissions, and user/group assignments; after confirmation, assign an existing role to an existing group. It can't create roles, change a role's permissions, or confirm access to a specific connector.
- Start with a read-only request; ask which sources and fields were used and what couldn't be verified; for a change, review the plan before approving, then have it re-read the record.
- Analytics use cases need connected, approved data sources; ROI also needs approved business or engineering results (usage alone isn't enough and doesn't prove causation).
- Never paste a real admin API key into ChatGPT, Codex, a document, or a source file; use approved secret storage. ChatGPT workspace administration and OpenAI API Platform administration stay separate.
- Admin APIs suit scheduled reports, bulk work, and connections to approved systems, and need engineering, security, and governance review.
- Source: https://learn.chatgpt.com/docs/enterprise/admin-plugin (retrieved 2026-11-14).

## Related

- [Roles and workspace permissions](./roles-and-workspace-permissions.md)
- [Analytics API](./analytics-api.md)
- [Compliance API](./compliance-api.md)
- [Work admin FAQ](./work-admin-faq.md)
