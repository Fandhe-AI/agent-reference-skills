---
source: https://docs.cloud.google.com/pubsub/docs/resource-location-restriction
---

# Pub/Sub resource location restriction (message storage policy)

A message storage policy on a topic controls the Google Cloud regions where Pub/Sub stores and processes message contents. Without one, messages published to the global endpoint are stored in the nearest region. New topics inherit the effective Resource Location Restriction organization policy when no policy is given.

## Signature / Usage

### Create a topic with a message storage policy (gcloud)

```bash
gcloud pubsub topics create TOPIC_ID \
    --message-storage-policy-allowed-regions=REGION1,REGION2
```

`REGION1,REGION2` is a comma-separated list of supported Google Cloud regions. The help also lists `--message-storage-policy-enforce-in-transit` for `create` and `update`.

### Create a topic with a message storage policy (REST)

Adapted (not in the official docs): the source shows `POST` with a pseudo-HTTP request and a `--data @response-body.json` fragment; `projects.topics.create` uses `PUT`, so this is a runnable curl form with the same body fields.

```bash
curl -X PUT \
  -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
  -H "Content-Type: application/json" \
  -d '{"name": "projects/PROJECT_ID/topics/TOPIC_ID", "messageStoragePolicy": {"allowedPersistenceRegions": ["REGION"], "enforceInTransit": true}}' \
  "https://pubsub.googleapis.com/v1/projects/PROJECT_ID/topics/TOPIC_ID"
```

Sample response:

```json
{
  "name": "projects/PROJECT_ID/topics/TOPIC_ID",
  "messageStoragePolicy": {
    "allowedPersistenceRegions": [
      "REGION"
    ],
    "enforceInTransit": true
  }
}
```

### Update an existing topic (gcloud)

Push the policy defined by your organization's Resource Location Restriction policy to a topic:

```bash
gcloud pubsub topics update TOPIC_ID \
    --recompute-message-storage-policy
```

Set specific regions:

```bash
gcloud pubsub topics update TOPIC_ID \
    --message-storage-policy-allowed-regions=REGION1,REGION2
```

### Update an existing topic (REST)

Adapted (not in the official docs): `projects.topics.patch` takes an `UpdateTopicRequest` with a required `topic` and `updateMask`; the source's body omits both and contains a `//` comment that is invalid JSON.

```bash
curl -X PATCH \
  -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
  -H "Content-Type: application/json" \
  -d '{"topic": {"name": "projects/PROJECT_ID/topics/TOPIC_ID", "messageStoragePolicy": {"allowedPersistenceRegions": ["REGION"], "enforceInTransit": true}}, "updateMask": "message_storage_policy"}' \
  "https://pubsub.googleapis.com/v1/projects/PROJECT_ID/topics/TOPIC_ID"
```

### Compare organization policy and topic policy

```bash
gcloud pubsub topics describe TOPIC_ID
```

## Options / Props

### Policy fields

| Field | Description |
|-------|-------------|
| `allowedPersistenceRegions` | List of allowed region names. No exclusion lists, zones or multi-region locations |
| `enforceInTransit` | When true: publish, pull and streamingPull requests received in a non-allowed region are rejected with `FAILED_PRECONDITION`; push delivery happens only within allowed regions |

### Organization policy defaults for new topics

| Case | Result |
|------|--------|
| No policy given at topic creation | Policy derived from the effective **Resource Location Restriction** organization policy; allows all regions when none is in effect |
| `enforceInTransit` not given | Derived from the effective **Enforce in-transit regions for Pub/Sub messages** organization policy |
| Policy given at topic creation | May contain only regions allowed by the effective Resource Location Restriction policy; any region if none is in effect |

### Message storage metrics (by region)

| Metric | Meaning |
|--------|---------|
| `subscription/num_unacked_messages_by_region` | Count of unacknowledged stored messages |
| `subscription/unacked_bytes_by_region` | Volume of stored data |
| `subscription/oldest_unacked_message_age_by_region` | Age of oldest message |
| `subscription/num_retained_acked_messages_by_region` | Acknowledged messages retained for replay |

## Notes

- The policy applies only to message contents, not to topic names, labels or IAM settings.
- If the policy allows multiple regions for publishing, Pub/Sub stores the message in the allowed region closest to where it enters the Google Cloud network.
- With `enforceInTransit`: a client in an allowed region can use the global endpoint (routed locally) or a locational or regional endpoint for an allowed region; a client in a non-allowed region or outside Google Cloud must use a locational or regional endpoint for an allowed region.
- Push delivery can be paused completely when push locations are over-constrained by message storage location, allowed regions and export resource location; the source says this state is visible in Stackdriver.
- Changes to an organization policy do not automatically propagate to existing topics; run an update (for example `--recompute-message-storage-policy`). Changes to a topic's policy apply only to messages published afterwards; stored messages are not moved.
- Publishing a message with an ordering key returns an error when the policy excludes the nearest region.
- Changing an organization policy affects services beyond Pub/Sub; check other services first. Organization Policy itself is covered by `gcp-foundation`. The source names the constraints by display name only: Resource Location Restriction and Enforce in-transit regions for Pub/Sub messages.
- Message storage policies can add outbound-message fees; see the Pub/Sub pricing page. The policy does not affect the SLA, but publishers or subscribers outside the allowed regions trade latency and availability: a policy allowing only `us-central1` sends a publish from `us-east1` to `us-central1`, and a single allowed region makes a multi-region application only as available as that region.
- The console cannot set a policy at topic creation (new topics inherit the organization policy); it can update a topic's policy in the Info Panel Storage Policy tab and shows differences from the organization policy.
- Corrected from the official docs: the create example `POST https://pubsub.googleapis.com/v1/projects/PROJECT_ID/topics/TOPIC_ID` with `Authorization: Bearer $(gcloud auth application-default print-access-token)` and `Content-Type: application/json --data @response-body.json` is rewritten as `curl -X PUT` (`pubsub.projects.topics.create` is `PUT` in the Discovery document).
- Corrected from the official docs: the patch example body `{"name": ..., "messageStoragePolicy": {"allowedPersistenceRegions": ["REGION"], // Replace with your required region ...}}` is wrapped as `{"topic": {...}, "updateMask": "message_storage_policy"}` (the field-mask form used in the Discovery document's `UpdateTopicRequest` description) and the `//` comment is removed.
- The source also shows Console. Metrics are in Cloud Monitoring (`gcp-observability`).
- Source: https://docs.cloud.google.com/pubsub/docs/resource-location-restriction (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [encryption.md](./encryption.md)
- [monitoring.md](./monitoring.md)
