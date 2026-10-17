# Bulk Actions

Cancel many messages at once from the Logs tab of the Upstash Console, or through the bulk cancel messages API endpoint.

## Signature / Usage

Console: Logs tab, apply filters, then open the **Bulk actions** menu to cancel (or republish) everything that matches.

```json
{ "async": true }
```

API: the bulk cancel messages endpoint (https://upstash.com/docs/qstash/api-reference/messages/bulk-cancel-messages). Pass `"async": true` to run it in the background and receive an `actionId`, which can be looked up with the bulk actions endpoints (https://upstash.com/docs/qstash/api-reference/bulk-actions/list-bulk-actions).

## Notes

- Cancelling applies to every active message matching the current filters, including messages waiting on a retry.
- Cancelled messages are removed without going to the DLQ.
- Cancelling a small number of selected messages happens immediately in the console. Cancelling by filter, or all active messages, is processed in the background and shown in the bulk action history.
- The **History** button lists every bulk cancellation with state, filters used and number cancelled. The `Active` filter shows in-progress operations. Each entry has an action ID that can be pasted into the search box.
- The official page provides no code snippet beyond the `"async": true` parameter above; request/response shapes are in the API reference.
- Source: https://upstash.com/docs/qstash/howto/bulk-actions (fetched 2026-10-17; no version pin on the site).

## Related

- [messages.md](./messages.md)
- [dlq.md](./dlq.md)
- [logs.md](./logs.md)
