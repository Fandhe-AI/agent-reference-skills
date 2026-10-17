---
source: https://ai.google.dev/api/triggers
---

# Triggers API

REST reference for triggers: schedule agent executions on a cron schedule for automated and recurring tasks (Beta).

## Signature / Usage

```text
POST   https://generativelanguage.googleapis.com/v1beta/triggers                          Creates a new trigger that will invoke the specified agent on the given cron schedule.
POST   https://generativelanguage.googleapis.com/v1beta/triggers/{triggerId}/executions   Runs a trigger immediately.
GET    https://generativelanguage.googleapis.com/v1beta/triggers                          Lists triggers for a project.
GET    https://generativelanguage.googleapis.com/v1beta/triggers/{id}                     Gets details of a single trigger.
GET    https://generativelanguage.googleapis.com/v1beta/triggers/{triggerId}/executions   Lists executions for a trigger.
PATCH  https://generativelanguage.googleapis.com/v1beta/triggers/{id}                     Updates a trigger.
DELETE https://generativelanguage.googleapis.com/v1beta/triggers/{id}                     Deletes a trigger.
```

Example response of `RunTrigger` (a `TriggerExecution`):

```json
{
  "end_time": "string",
  "environment_id": "string",
  "error": "string",
  "id": "string",
  "interaction_id": "string",
  "scheduled_time": "string",
  "start_time": "string",
  "status": "in_progress",
  "trigger_id": "string"
}
```

## Options / Props

`CreateTrigger` request body:

| Name | Type | Description |
|------|------|-------------|
| display_name | string (optional) | The display name of the trigger. |
| environment_id | string (optional) | The environment ID for the trigger execution. |
| execution_timeout_seconds | integer (optional) | The execution timeout for the triggered interaction. |
| interaction | AgentInteraction (required) | The interaction request template to be executed (`agent`, `agent_config`, `background`, `environment`, `input`, `labels`, `previous_interaction_id`, `response_format`, `safety_settings`, `service_tier`, `store`, `stream`, `system_instruction`, `tools`, `webhook_config`). `agent` values: `deep-research-pro-preview-12-2025`, `deep-research-preview-04-2026`, `deep-research-max-preview-04-2026`, `antigravity-preview-05-2026`. |
| max_consecutive_failures | integer (optional) | Maximum consecutive failures before the trigger is automatically paused (status becomes ERROR). |
| schedule | string (required) | The cron schedule on which the trigger should run. Standard cron format. |
| time_zone | string (required) | Time zone in which the schedule should be interpreted. |

`Trigger` resource fields: `consecutive_failure_count`, `create_time`, `display_name`, `environment_id`, `execution_timeout_seconds`, `id`, `interaction`, `last_pause_time`, `last_resume_time`, `last_run_time`, `max_consecutive_failures`, `next_run_time`, `previous_interaction_id`, `schedule`, `status`, `time_zone`, `update_time`.

Other methods:

| Method | Parameters | Response |
|------|------|-------------|
| RunTrigger | `triggerId` (required) | `TriggerExecution` |
| ListTriggers | `filter` (optional, e.g. by state), `page_size`, `page_token` | `triggers[]`, `next_page_token` |
| GetTrigger | `id` (required) | `Trigger` |
| ListTriggerExecutions | `triggerId` (required), `page_size`, `page_token` | `trigger_executions[]`, `next_page_token` |
| UpdateTrigger | `id` (required); body: `display_name`, `status` | `Trigger` |
| DeleteTrigger | `id` (required) | empty |

`status` values: Trigger: `active` (fires on schedule), `paused`, `error` (entered an error state due to consecutive failures). TriggerExecution: `in_progress`, `completed`, `failed`, `skipped` (e.g. previous execution still running), `timed_out`.

`TriggerExecution` fields: `end_time`, `environment_id`, `error`, `id`, `interaction_id`, `scheduled_time`, `start_time`, `status`, `trigger_id`.

## Notes

- Availability: v1beta (the source states "This API is in Beta. Endpoints are under `/v1beta/`.").
- The per-method request examples are embedded frames not present in the stored text; endpoint lines and JSON responses are verbatim.
- Cron-schedule triggers invoke a Gemini agent (see agents.md); not related to anthropic-claude-code-extend routines or inngest scheduled functions.
- Docs fetched 2026-10-16.

## Related

- [Agents API](./agents.md)
- [Environments API](./environments.md)
- [Webhooks API](./webhooks.md)
- [Interactions API (v1beta)](./interactions-v1beta.md)
