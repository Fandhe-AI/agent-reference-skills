# Daybreak notifications

Send Daybreak scan events to a service you control with a workspace webhook (for example to update a security dashboard or refresh a ticket). Each destination receives the selected events from across your ChatGPT workspace.

## Signature / Usage

In Daybreak go to **Settings** > **Notifications** > **Add**, enter a **Name** and an **Endpoint URL** (publicly reachable HTTPS, accepts `POST` on port 443), and choose events:

```text
scan.finished
scan.updated
```

Copy the signing secret when adding (shown in full once), then use **Send test notification** > **Send test**: Daybreak sends a sample `scan.finished` event with `is_test: true` and reports delivery when your endpoint returns `2xx`.

## Options / Props

| Event | Meaning |
| --- | --- |
| `scan.finished` | Scan completions, failures, and cancellations. |
| `scan.updated` | Later changes to a scan's results, such as updated validation or severity. |

| Payload / header | Use |
| --- | --- |
| `webhook-signature` | Verify before processing (HMAC-SHA256 over `webhook-id`, `webhook-timestamp`, and the original body). |
| `is_test` | Check before triggering production workflows. |
| `id` | Identify repeat deliveries. |
| `data.scan_id` | Group events for the same scan. |

## Notes

- Verification follows the Standard Webhooks specification; pass the original request bytes to the verifier so whitespace or JSON reformatting doesn't break the signature.
- Each delivery attempt (including tests) has 10 seconds; return `2xx` once accepted. For longer work, queue the event and respond first.
- Manage destinations with **Edit** (change URL or events, turn off **Enabled** to pause). **Rotate secret** replaces the signing secret; **Keep the current secret active for 24 hours** signs with both secrets during the window. With immediate rotation, update the receiver before the next test.
- Source: https://learn.chatgpt.com/docs/security/notifications (retrieved 2026-11-14).

## Related

- [Set up Daybreak Defense Factory](./daybreak-setup.md)
- [Daybreak FAQ](./daybreak-faq.md)
