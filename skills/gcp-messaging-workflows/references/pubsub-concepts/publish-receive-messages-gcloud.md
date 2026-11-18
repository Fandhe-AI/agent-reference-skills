---
source: https://docs.cloud.google.com/pubsub/docs/publish-receive-messages-gcloud
---

# Quickstart: publish and receive messages with the gcloud CLI

Create a topic and a subscription, publish a message and pull it, using the Google Cloud CLI.

## Signature / Usage

### Create a topic

```bash
gcloud pubsub topics create my-topic
```

### Create a subscription

```bash
gcloud pubsub subscriptions create my-sub --topic=my-topic
```

### Publish messages

```bash
gcloud pubsub topics publish my-topic --message="hello"
```

### Receive messages

The gcloud CLI prints the message to the command line.

```bash
gcloud pubsub subscriptions pull my-sub --auto-ack
```

## Options / Props

| Role | Scope | Purpose |
|---|---|---|
| Pub/Sub Editor (`roles/pubsub.editor`) | Project | Required to complete the quickstart. |

## Notes

- `--auto-ack` acknowledges the pulled message immediately. A message acked before it is processed is lost if processing then fails.
- The source also shows a Google Cloud console tutorial link.
- Try it in a disposable project; `roles/pubsub.editor` is a project-level role.
- Source: https://docs.cloud.google.com/pubsub/docs/publish-receive-messages-gcloud (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [pubsub-basics.md](./pubsub-basics.md)
- [subscription-overview.md](./subscription-overview.md)
