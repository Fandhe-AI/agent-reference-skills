---
source: https://docs.cloud.google.com/monitoring/support/notification-options
---

# Webhook notification channels

A webhook channel sends the notification JSON (schema 1.2) to a public HTTP(S) endpoint. Use it, or Pub/Sub, when automation tools consume notifications.

## Signature / Usage

### Configure

1. Identify the public endpoint URL (the webhook handler).
2. In the Alerting page click **Edit notification channels**, then **Add New** in the **Webhook** section, and complete the dialog.
3. Click **Test Connection** to send a test payload to the endpoint, then **Save**.
4. When creating an alerting policy, select **Webhook** in **Notifications**.

### Token authentication

Token authentication uses a query string parameter in the endpoint URL and a key the server expects to be secret between itself and Monitoring. The source's sample URL form:

Adapted (not in the official docs): the source's inline sample URL shows the token value `1234-abcd`; it is replaced by an upper-case placeholder so no real-looking token is shown.

```text
https://www.myserver.com/stackdriver-hook?auth_token=AUTH_TOKEN
```

## Options / Props

| Item | Description |
|------|-------------|
| Endpoint | Must be public: fully accessible from the public internet by HTTP (port 80) or HTTPS (port 443); for HTTPS the notification service must be able to verify the server's certificate. |
| Basic authentication | HTTP username and password; Cloud Monitoring requires your server to return a 401 response with the proper `WWW-Authenticate` header. |
| Token authentication | `auth_token` query parameter in the endpoint URL; most effective with SSL/TLS. |
| Payload | Monitoring uses the 1.2 schema; Error Reporting notifications use the 1.0 schema. |

## Notes

- Webhooks only support public endpoints. For a non-public endpoint, create a Pub/Sub notification channel and configure a subscription to the topic.
- If a Cloud Run function is the webhook endpoint, ensure the invoking user has the required authentication permission (see Authenticate for invocation and Enabling access to a function).
- To send to Microsoft Teams, use an intermediary such as Power Automate or Cloud Run functions that converts the data into a Teams-compatible format and forwards it.
- The token lives in the channel's URL: it appears in server access logs and in the channel configuration; use HTTPS, keep the secret out of source control, and restrict who can edit channels. A webhook without authentication opens your endpoint to anyone who can reach it; the source offers basic or token authentication.
- Webhook, PagerDuty, Slack and Mobile App channels share a single point of failure; add email or Pub/Sub for redundancy.
- The source links a Python sample server (a gist) for token validation; it is not reproduced here.
- Source: https://docs.cloud.google.com/monitoring/support/notification-options (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the sample URL `https://www.myserver.com/stackdriver-hook?auth_token=1234-abcd` is shown with `AUTH_TOKEN` as the value.

## Related

- [notification-payload-schema.md](./notification-payload-schema.md)
- [notification-channel-pubsub.md](./notification-channel-pubsub.md)
- [notification-options.md](./notification-options.md)
