---
source: https://docs.cloud.google.com/pubsub/docs/troubleshooting
---

# Troubleshoot Pub/Sub

Common Pub/Sub problems: cannot create a topic or subscription, permission errors, deleted subscriptions, 403 errors, connection timeouts, `Invalid JWT` token errors and excessive administrative operations. Audit logs in Logs Explorer are the main tool for permission and deletion issues.

## Signature / Usage

### Logs Explorer filters for permission issues

Start for any issue involving topic or subscription configuration or access control:

```text
resource.type="pubsub_topic" OR resource.type="pubsub_subscription"
```

Track who changed the IAM policy and what changed:

```text
protoPayload.methodName="google.iam.v1.SetIamPolicy"
```

Find errors explicitly related to permissions; combine with the filters above:

```text
protoPayload.status.code=7
```

### Find why a subscription was deleted

```text
protoPayload.methodName="google.pubsub.v1.Subscriber.DeleteSubscription"
```

`InternalExpireInactiveSubscription` in the log entry indicates deletion due to inactivity.

### Avoid excessive administrative operations

Checking whether a subscription exists before consuming (both `GET` and `CREATE` are administrative operations) wastes admin quota:

```text
if !GetSubscription my-sub {
  CreateSubscription my-sub
}
Consume from subscription my-sub
```

Prefer the optimistic pattern: consume first and create the subscription only on a not-found error:

```text
try {
  Consume from subscription my-sub
} catch NotFoundError {
  CreateSubscription my-sub
  Consume from subscription my-sub
}
```

Node.js (TypeScript) sample:

```typescript
/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// const subscriptionNameOrId = 'YOUR_SUBSCRIPTION_NAME_OR_ID';
// const topicNameOrId = 'YOUR_TOPIC_NAME_OR_ID';
// const timeout = 60;

// Imports the Google Cloud client library
import {PubSub, Message, StatusError} from '@google-cloud/pubsub';

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

function optimisticSubscribe(
  subscriptionNameOrId: string,
  topicNameOrId: string,
  timeout: number,
) {
  // Try using an existing subscription
  let subscription = pubSubClient.subscription(subscriptionNameOrId);

  // Create an event handler to handle messages
  let messageCount = 0;
  const messageHandler = (message: Message) => {
    console.log(`Received message ${message.id}:`);
    console.log(`\tData: ${message.data}`);
    console.log(`\tAttributes: ${message.attributes}`);
    messageCount += 1;

    // "Ack" (acknowledge receipt of) the message
    message.ack();
  };

  // Set an error handler so that we're notified if the subscription doesn't
  // already exist.
  subscription.on('error', async (e: StatusError) => {
    // Resource Not Found
    if (e.code === 5) {
      console.log('Subscription not found, creating it');
      await pubSubClient.createSubscription(
        topicNameOrId,
        subscriptionNameOrId,
      );

      // Refresh our subscriber object and re-attach the message handler.
      subscription = pubSubClient.subscription(subscriptionNameOrId);
      subscription.on('message', messageHandler);
    }
  });

  // Listen for new messages until timeout is hit; this will attempt to
  // open the actual subscriber streams. If it fails, the error handler
  // above will be called.
  subscription.on('message', messageHandler);

  // Wait a while for the subscription to run. (Part of the sample only.)
  setTimeout(() => {
    subscription.removeListener('message', messageHandler);
    console.log(`${messageCount} message(s) received.`);
  }, timeout * 1000);
}
```

## Options / Props

| Problem | Checks |
|---------|--------|
| Cannot create a topic | Need Pub/Sub Editor (`roles/pubsub.editor`) on the project |
| Cannot create a subscription | Need `roles/pubsub.editor` on the project; subscription name given; existing topic named; push endpoint uses `https://` in lower case (not `http://` or `HTTPS://`) in the `pushEndpoint` field |
| Subscription got deleted | Deleted by a principal with permission, or automatically after inactivity (31 days by default; see the subscription expiration period) |
| `403 (Forbidden)` | Pub/Sub API enabled; principal has required permissions on the resources (especially cross-project); Dataflow: both `{PROJECT_NUMBER}@cloudservices.gserviceaccount.com` and `{PROJECT_NUMBER}-compute@developer.gserviceaccount.com` need the required permissions on the relevant Pub/Sub resources; App Engine: the service account `<project-id>@appspot.gserviceaccount.com` listed as Pub/Sub Editor |
| Timeouts / network errors | Symptoms: slow publish, `DEADLINE_EXCEEDED`, `UNAVAILABLE: io exception`, `Connection refused` to `pubsub.googleapis.com` or `oauth2.googleapis.com`. Cause: hardcoded IP allowlists for Google APIs. Fix: allow Google's published IP ranges for default domains and enable Private Google Access |
| `Invalid JWT: Token must be a short-lived token (60 minutes) and in a reasonable timeframe` | Clock skew; verify date, time and timezone; keep time synchronized with NTP |

## Notes

- Terraform: grant required roles explicitly in Terraform code (for example `roles/pubsub.publisher` for publishing); an unspecified role can be removed by a later `terraform apply`, causing sudden `PERMISSION_DENIED` errors.
- The source's 403 entries say that for Dataflow both `{PROJECT_NUMBER}@cloudservices.gserviceaccount.com` and the Compute Engine default service account (`{PROJECT_NUMBER}-compute@developer.gserviceaccount.com`) need the required permissions on the relevant Pub/Sub resources, and that for App Engine the App Engine service account should be listed as a Pub/Sub Editor on the project's Permissions page. This is the source's troubleshooting text, not a recommendation; a project-level Pub/Sub Editor grant allows that identity to manage topics and subscriptions across the project (see `gcp-foundation` for service accounts).
- The sample's `error` handler acts only on code 5 (`NOT_FOUND`) and ignores every other subscriber error, such as permission or network failures; handle or log those errors in real code.
- The sample acks each message in the callback without processing it. A message acked before processing is lost if processing then fails; ack only after processing succeeds.
- A deleted subscription loses its unacked messages; try deletion and recovery tests on a disposable project first. Audit logs are covered by `gcp-observability`.
- Other troubleshooting pages exist in the source for topics, import topics, pull, push, BigQuery, Cloud Storage and subscriptions with SMTs, plus an error code reference.
- The source also shows Console, and the optimistic-subscribe samples in Go, Java, Node.js (JavaScript), Python and C++ (omitted).
- Source: https://docs.cloud.google.com/pubsub/docs/troubleshooting (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [monitoring.md](./monitoring.md)
- [authentication.md](./authentication.md)
- [encryption.md](./encryption.md)
