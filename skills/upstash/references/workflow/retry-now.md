# Run a Step Now

Release a waiting step early so the run continues immediately. A run waits either because a step is sleeping (`context.sleep` / `context.sleepUntil`) or because a failed step is waiting out its retry delay.

## Signature / Usage

Under the hood a sleeping or retrying step is a delayed QStash message. Retry it now with the step's message ID (found in the run's event logs):

```bash
curl -X POST https://qstash.upstash.io/v2/messages/<STEP_MESSAGE_ID>/retry \
  -H "Authorization: Bearer <QSTASH_TOKEN>"
```

## From the console

In the `Logs` tab of the Upstash Console, each waiting step shows a button: **Run now** on a sleeping step and **Retry now** on a step in retry backoff. In a parallel block each branch has its own button.

## Notes

- Buttons are offered only while the run is running and the step is genuinely waiting; once QStash picks the step up, the button disappears and the run continues as if the delay ended on its own
- Releasing a retrying step does not add an attempt. If it was on its last retry and fails again, the run fails and the failure function is called as usual

## Related

- [context-sleep](./context-sleep.md)
- [retries](./retries.md)
- [failure-callback](./failure-callback.md)
- [client-logs](./client-logs.md)
