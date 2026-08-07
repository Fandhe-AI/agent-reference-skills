<!-- source: https://platform.claude.com/docs/en/api/claude-platform-on-aws-iam-actions / last verified: 2026-08-07 -->

# IAM actions for Claude Platform on AWS

IAM action reference for controlling access to Claude Platform on AWS via AWS policies. Every API route maps to an IAM action in the `aws-external-anthropic` namespace (66 actions total, `VerbNoun` convention).

## Signature / Usage

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "aws-external-anthropic:CreateInference",
        "aws-external-anthropic:CountTokens",
        "aws-external-anthropic:GetModel",
        "aws-external-anthropic:ListModels",
        "aws-external-anthropic:GetWorkspace"
      ],
      "Resource": "arn:aws:aws-external-anthropic:us-west-2:123456789012:workspace/wrkspc_01AbCdEf23GhIj"
    }
  ]
}
```

Workspace ARN format: `arn:aws:aws-external-anthropic:{region}:{account-id}:workspace/{workspace-id}`.

## Options / Props

**IAM service prefix:** `aws-external-anthropic`. **Resource type:** `workspace`.

**Action groups (representative):**

| Resource | Actions |
|---|---|
| Inference | `CreateInference` (`POST /v1/messages`), `CountTokens` (`POST /v1/messages/count_tokens`) |
| Batch | `CreateBatchInference`, `GetBatchInference` (metadata + results), `ListBatchInferences`, `CancelBatchInference`, `DeleteBatchInference` |
| Models | `GetModel`, `ListModels` |
| Files | `CreateFile`, `GetFile` (metadata + content download), `ListFiles`, `DeleteFile` |
| Skills | `CreateSkill`, `GetSkill` (metadata + content), `ListSkills`, `UpdateSkill` (also version create/delete), `DeleteSkill` |
| Agents | `CreateAgent`, `GetAgent`, `ListAgents`, `UpdateAgent`, `ArchiveAgent` (no hard delete) |
| Sessions | `CreateSession`, `GetSession` (metadata + events + resources), `ListSessions`, `UpdateSession` (sub-resource CRUD), `ArchiveSession`, `DeleteSession` |
| Environments | `CreateEnvironment`, `GetEnvironment`, `ListEnvironments`, `UpdateEnvironment`, `ArchiveEnvironment`, `DeleteEnvironment`, `ProcessEnvironmentWork` (self-hosted sandbox worker poll/ack/heartbeat/stop) |
| Vaults | `CreateVault`, `GetVault` (secrets never returned), `ListVaults`, `UpdateVault` (credential CRUD), `ArchiveVault`, `DeleteVault` |
| Memory stores | `CreateMemoryStore`, `GetMemoryStore`, `ListMemoryStores`, `UpdateMemoryStore` (memory CRUD, version redact), `ArchiveMemoryStore`, `DeleteMemoryStore` |
| Webhooks | `CreateWebhook`, `GetWebhook` (secret never returned), `ListWebhooks`, `UpdateWebhook`, `DeleteWebhook`, `RotateWebhookSecret` |
| User profiles | `CreateUserProfile`, `GetUserProfile`, `ListUserProfiles`, `UpdateUserProfile` |
| Workspaces (account-scoped) | `CreateWorkspace`, `GetWorkspace`, `ListWorkspaces`, `UpdateWorkspace`, `ArchiveWorkspace` (no hard delete) |
| Compliance (account-scoped) | `ListComplianceActivities` |
| Auth / console (route-less) | `CallWithBearerToken` (API-key auth instead of SigV4), `AssumeConsole` (open Claude Console via AWS Console federation) |

**Managed policies** (all apply to `Resource: "*"`):

| Policy | Grants |
|---|---|
| `AnthropicFullAccess` | `aws-external-anthropic:*` |
| `AnthropicReadOnlyAccess` | `Get*`, `List*`, `CallWithBearerToken` |
| `AnthropicInferenceAccess` | `Get*`, `List*`, `CreateInference`, `CreateBatchInference`, `CancelBatchInference`, `DeleteBatchInference`, `CountTokens`, `CallWithBearerToken` |
| `AnthropicLimitedAccess` | `AnthropicInferenceAccess` + all Claude Managed Agents actions |
| `AnthropicSelfHostedEnvironmentAccess` | `GetEnvironment`, `ProcessEnvironmentWork`, `GetSession`, `UpdateSession`, `GetSkill`, `CallWithBearerToken` |

CloudTrail classifies vault, webhook, workspace, and compliance actions as Management events; all others (inference, batch, model, file, skill, user profile, remaining Claude Managed Agents actions) as Data events.

## Notes

- `Get*`/`List*` wildcards grant read access to file bytes, skill content, batch results, session conversation history, and memory contents — but never vault credential secrets or webhook signing secrets (write-only fields).
- Sub-resource mutations (skill versions, session events/resources, vault credentials, memory-store memories) map to the parent's `Update*` action, not `Create*`/`Delete*` — deny `Update*` explicitly to block them.
- IAM action string matching is case-insensitive and suffix-based: `*File` matches `CreateFile`/`GetFile`/`DeleteFile` but not `ListFiles`, and also over-matches `CreateUserProfile`/`GetUserProfile`/`UpdateUserProfile` (ends in "file" via "Profile") — enumerate explicitly for Files-only policies.
- `CreateInference` and `CreateBatchInference` are independent; deny both to block all model calls.
- Only workspace routes are available from the Admin API on Claude Platform on AWS; the Claude Console Workspaces page is read-only there.

## Related

- [ip-addresses](./ip-addresses.md)
- [overview](./overview.md)
