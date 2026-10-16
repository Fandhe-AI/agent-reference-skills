# AWS Lambda MicroVMs

Run an agent's tools in your AWS account with AWS Lambda MicroVMs as a self-hosted sandbox. OpenAI runs the agent harness; each MicroVM runs `codex exec-server` and holds the session's workspace files.

## Signature / Usage

Launcher verification and monitoring (from the AWS example directory):

```bash
image_state=application_managed/.local/image.json
region=$(jq -r '.region' "$image_state")
image_arn=$(jq -r '.image_arn' "$image_state")

aws logs tail /aws/lambda/codex-agents-api-webhook --since 10m --region "$region"

aws lambda-microvms list-microvms \
  --image-identifier "$image_arn" --region "$region" \
  --query 'items[].{id:microvmId,state:state}' --output table
```

## Options / Props

Image lifecycle hooks (under `/aws/lambda-microvms/runtime/v1`):

| Hook | Behavior |
|------|----------|
| `/ready` | HTTP 200 when ready for AWS to snapshot; leave the executor disconnected |
| `/validate` | Check Codex runs and the workspace is writable |
| `/run` | Read session connection values and secret ARN, fetch the environment key, start the executor |
| `/suspend` | Stop the executor before AWS snapshots the VM |
| `/resume` | Reload the environment key and restart the executor using saved connection values |
| `/terminate` | Stop the executor before the VM terminates |

`runHookPayload` (JSON string at launch): `session.environment.id`, `session.environment.remote_url`, environment-key secret ARN.

AWS fallback limits: `maximumDurationInSeconds` (ceiling for the workload, can interrupt active work; limits total running and suspended time to eight hours with suspend/resume), `maxIdleDurationSeconds` (AWS measures inbound traffic; the executor's outbound connection does not reset it), `suspendedDurationSeconds` / `autoResumeEnabled` (examples default `0` / `false`; `300` / `false` with `--suspend-resume`).

## Notes

- Default: one MicroVM per turn. Choose one provisioning owner per session: application-managed (create a self-hosted session, open its stream, call AWS `RunMicrovm`, save `microvmId`, wait for `agent.session.environment.connected`, send input, retrieve files, stop) or webhook-managed (API Gateway `POST /webhook` -> launcher Lambda with `lambda:RunMicrovm`, `GetMicrovm`, `ResumeMicrovm`, `TerminateMicrovm`; register for `agent.session.action_required` and `agent.session.failed`; verify signature on the raw body; resume a `SUSPENDED` VM, wait for `PENDING`/`RUNNING`, call `RunMicrovm` only when none is recorded).
- Prerequisites: AWS account with Lambda MicroVMs access, AWS CLI including `lambda-microvms`, S3 artifact bucket and IAM image build role; `OPENAI_API_KEY`; environment key stored in Secrets Manager (e.g. secret `codex/agents-api/executor`), passed by `/run` as `CODEX_API_KEY`; a MicroVM execution role allowed to read only that secret. Keep the application key and webhook signing secret outside the MicroVM.
- `/run` must return once the process starts; waiting for the turn to finish can cause a hook timeout. Keep session IDs, credentials, and live executor connections out of the image snapshot.
- Stop: wait for `agent.session.turn.completed` / `.failed` / `.cancelled` for the main agent (`event.turn.subagent_id` is `null`); subagents share the MicroVM. Call `TerminateMicrovm` and verify `TERMINATED`. Do not terminate on `agent.session.idle` alone. Session deletion does not terminate AWS compute or emit a webhook.
- Suspend/resume preserves memory and disk between turns (snapshot storage charges apply; suspend only after tools and subagents finish); AWS automatic resume requires inbound VM traffic, Agents API input alone does not wake it.
- Production: add durable launch ownership and idempotency and queue provisioning; metadata alone does not prevent duplicate launches.
- Troubleshooting: webhook signature rejected (use unmodified body and signing secret), no MicroVM launches (subscription, ownership filter, pending `environment_connection`, IAM), image build fails (S3 artifact, build role, `/ready`), `/run` fails (secret access, return after starting), executor can't connect (environment ID, remote URL, key ownership, egress), VM stops mid-turn (lifetime and idle policy).
- Source: https://developers.openai.com/api/docs/guides/agents-api/environments/providers/aws (fetched 2026-10). Cookbook: openai/openai-cookbook `examples/agents_api/sandboxes/aws`.

## Related

- [Self-hosted Sandboxes](./self-hosted-sandboxes.md)
- [Sandbox Lifecycle](./sandbox-lifecycle.md)
- [Session Webhooks](./session-webhooks.md)
- [Agents API](./overview.md)
