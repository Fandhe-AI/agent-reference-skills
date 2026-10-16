# Background Completion Backlogs

Interactive surfaces coalesce consecutive background-process completions that are already ready for one conversation into a single notification turn.

## Signature / Usage

Local validation probe (real local shell children, production CLI / TUI / post-turn routes, loopback HTTP turn sink):

```bash
evals/completion_backlog_probe.py REPO OUTPUT.json
```

The shared renderer is `tools/process_registry_notifications.py::ProcessNotificationBatch`.

## Options / Props

| Consumer | Owner |
|----------|-------|
| Classic CLI | `hermes_cli/cli_process_notifications.py` (idle/post-turn drain, compression-aware ownership, final input unwrapping) |
| TUI and Desktop | `tui_gateway/session_notifications.py` (groups the poller's ready snapshot after checking ownership; each process still emits its own UI status; busy sessions requeue structured events) |
| Post-turn TUI safety net | `tui_gateway/prompt_turn.py` (same routing and rendering; Desktop and dashboard chat share this backend) |
| Messaging gateway | `gateway/run_notifications.py` (own route-keyed short-window batching, unchanged) |
| Noninteractive / headless | No new autonomous notification loop for API requests, ACP clients or one-shot CLI |

## Notes

- No delay is added and no promise is made to combine jobs that finish at different times. Failures and successful outputs both stay in the batch; a single completion keeps its original text.
- Process identity remains available until dispatch, so explicit `process_manage` wait/log/kill consumption can suppress a CLI completion even after it entered the input queue. A fully consumed batch starts no turn.
- Watch-output and async-delegation results remain separate notifications in original order and are not folded into completion batches. Delegation delivery uses its durable claim/complete ledger, once per delegation.
- Neither a batch nor its delivery status is persisted into the system prompt. Addressed events still need a provable owner; another live session cannot adopt them.
- The probe replaces `chat` / `_run_prompt_submit` with a loopback HTTP sink, so it does not exercise model inference, native renderer interaction or a hosted platform. It checks a ready backlog, a single exact payload, explicitly consumed results, foreign ownership, and interleaved watches/delegations; it measures turn admission, not model token savings.

## Related

- [Gateway Internals](./gateway-internals.md)
- [Tools Runtime](./tools-runtime.md)
