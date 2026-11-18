---
source: https://docs.cloud.google.com/pubsub/docs/encryption
---

# Pub/Sub encryption and customer-managed encryption keys (CMEK)

Pub/Sub encrypts customer content at rest by default (Google default encryption). With CMEK, a Cloud KMS key you control wraps the per-topic Data Encryption Keys (DEKs) that Pub/Sub generates. Pub/Sub accesses the key through its service agent, which needs `roles/cloudkms.cryptoKeyEncrypterDecrypter` on the key.

## Signature / Usage

### Grant the Pub/Sub service agent access to the key

The Pub/Sub service agent has the form `service-${PROJECT_NUMBER}@gcp-sa-pubsub.iam.gserviceaccount.com`. It is maintained internally by Pub/Sub for each project and is not visible on the Service Accounts page by default. Grant the role on the key (not project-wide):

```bash
gcloud kms keys add-iam-policy-binding CLOUD_KMS_KEY_NAME \
    --member=serviceAccount:service-PROJECT_NUMBER@gcp-sa-pubsub.iam.gserviceaccount.com \
    --role=roles/cloudkms.cryptoKeyEncrypterDecrypter
```

`CLOUD_KMS_KEY_NAME` has the format `projects/PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/CRYPTO_KEY`, for example `projects/test-project/locations/us-central1/keyRings/test-keyring/cryptoKeys/test-key`. `PROJECT_NUMBER` is the project number of the Pub/Sub project.

### Create a topic with CMEK

```bash
gcloud pubsub topics create TOPIC_ID --topic-encryption-key=ENCRYPTION_KEY
```

`ENCRYPTION_KEY` has the format `projects/PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/CRYPTO_KEY`.

### Estimate Cloud KMS operations for one CMEK topic per 30 days

```text
1 key access for ENCRYPT * (30 days / month * 24 hours / day) / 6 hours
 + 3 key accesses for DECRYPT
   * (30 days / month * 24 hours / day * 60 minutes / hour ) / 6 minutes
   = 21,720 Cloud KMS key access events
```

The source's example assumes a topic with at least one subscription and publisher and subscriber clients in the same region. Use the numbers as estimates only; see the Cloud KMS pricing page for prices.

## Options / Props

### CMEK behavior and timings

| Item | Value |
|------|-------|
| Pattern | Envelope encryption: Cloud KMS encrypts (wraps) per-topic DEKs, not messages |
| New DEK per topic | Approximately every 6 hours |
| KEK DEK-decrypt access | Every 6 minutes, 3 times (once per zone of the service region) |
| Key cache | About 30 minutes before Pub/Sub uses a key manually changed on a topic |
| Key rotation in Cloud KMS | Up to 12 hours before Pub/Sub uses new key versions |
| Old-key dependency after a key change | Up to 31 days, depending on message retention on the topic or any of its subscriptions |
| After key access is restored | Publishing available within 12 hours; delivery resumes within 2 hours |
| Message attributes | Not encrypted at the application layer (still encrypted at hardware and infrastructure layers) |

### Cloud KMS key region

| Key type | Guidance |
|----------|----------|
| Global key | Recommended, because Pub/Sub resources are global |
| Regional key | Only if a message storage policy restricts storage to that region with `enforceInTransit` enabled, or all publisher and subscriber clients use the same regional endpoint |

### Metrics to monitor key-access problems

| Metric | Use |
|--------|-----|
| `topic/send_request_count` | Publish errors, grouped by `response_class` and `response_code` |
| `subscription/pull_request_count` | Pull errors, grouped by `response_class` and `response_code` |
| `subscription/streaming_pull_response_count` | StreamingPull; every response is an error that ends the stream, so look for `FAILED_PRECONDITION` |
| `subscription/num_unacked_messages` | Push subscriptions: backlog size |
| `subscription/oldest_unacked_message_age` | Push subscriptions: watch for spikes |

## Notes

- Before you begin: enable the Cloud KMS API and create a key ring and key in Cloud KMS. Keys and key rings cannot be deleted. Keys themselves are covered by `gcp-security`.
- Changing or removing the CMEK of a topic is not retroactive: messages published earlier stay encrypted with the original key (CMEK or Google-owned and Google-managed key).
- Cloud KMS Autokey can generate key rings and keys on demand, create the service agents and grant the required roles. See the Autokey overview in the Cloud KMS docs.
- Cloud KMS produces audit logs when keys are enabled, disabled or used by Pub/Sub; the key is attached to audit logs for topic resources.
- CMEK incurs Cloud KMS charges; see the Pub/Sub and Cloud KMS pricing pages (prices not copied here).
- To prevent Pub/Sub from decrypting message data, the source recommends disabling the Cloud KMS key associated with the topic (affects only topics and subscriptions tied to that key). The alternative, revoking `roles/cloudkms.cryptoKeyEncrypterDecrypter` from the Pub/Sub service agent, affects all of the project's topics and subscriptions holding CMEK-encrypted messages. IAM changes generally propagate faster; neither confirms instantaneous revocation.
- When Pub/Sub cannot access the key, publishing and delivery with StreamingPull or pull fail with `FAILED_PRECONDITION`; delivery to push endpoints stops. Intermittent Cloud KMS outages of less than a minute are unlikely to significantly interrupt publishing and delivery, but extended Cloud KMS unavailability has the same effect as key revocation. The source names the role "Pub/Sub CryptoKey Encrypter/Decrypter" in one place and "Cloud KMS Crypto Key Encrypter/Decrypter" (`roles/cloudkms.cryptoKeyEncrypterDecrypter`) in the setup steps. For Cloud EKM keys, see the Cloud EKM error reference.
- Disabling a key or revoking the role blocks publishing and delivery and is hard to reverse quickly (up to 12 hours for publishing); try it on a disposable project first.
- Push subscriptions have no direct way to detect CMEK-specific delivery issues; use the backlog metrics above, publish errors and CMEK audit logs.
- The source also shows Console.
- Source: https://docs.cloud.google.com/pubsub/docs/encryption (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [resource-location-restriction.md](./resource-location-restriction.md)
- [monitoring.md](./monitoring.md)
- [troubleshooting.md](./troubleshooting.md)
