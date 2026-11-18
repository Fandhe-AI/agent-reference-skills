---
source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/encryption
---

# Customer-managed encryption keys (CMEK) for Managed Service for Apache Kafka

By default, messages at rest are encrypted with Google-owned and Google-managed keys. To control the keys, set a customer-managed encryption key (CMEK) from Cloud KMS when you create the cluster. The CMEK is a key-encryption key (KEK) that encrypts a data encryption key (DEK); the DEK reads and writes data on broker persistent disks and tiered storage in Cloud Storage. Cloud KMS keys are covered by `gcp-security`.

## Signature / Usage

Grant the Managed Service for Apache Kafka service agent the Cloud KMS Crypto Key Encrypter/Decrypter role on the key (a resource-level grant on the key):

```bash
gcloud kms keys add-iam-policy-binding KEY \
  --keyring=KEY_RING \
  --location=LOCATION \
  --member=serviceAccount:service-PROJECT_NUMBER@gcp-sa-managedkafka.iam.gserviceaccount.com \
  --role=roles/cloudkms.cryptoKeyEncrypterDecrypter
```

## Options / Props

### Placeholders

| Placeholder | Meaning |
|-------------|---------|
| `KEY` | Name of the key |
| `KEY_RING` | Key ring containing the key |
| `LOCATION` | Cloud KMS location of the key ring |
| `PROJECT_NUMBER` | Project number of the project that contains the cluster |

### Key state effects

| Action | Effect |
|--------|--------|
| Rotate (new primary key version) | Disks: new KEK takes effect only after a broker restarts (force a rolling restart by changing cluster capacity, for example RAM). Tiered storage: new segment files use the new primary version; a delay of several minutes is possible |
| Disable a non-primary version | Local disks continue; each broker downloads the new KEK on restart. Cloud Storage cannot access segment files encrypted with the original version, so older data may not be consumable |
| Disable the primary version | Brokers cannot write new segment files to tiered storage (local disk use grows); broker restarts fail, whether you or the service trigger them |
| Revoke access for the service agent | Similar to disabling both primary and non-primary versions |
| Delete the key | The cluster is scheduled for shutdown and cannot be recovered |

### Recovery times after the key is accessible again

| Operation | Time |
|-----------|------|
| Publishing available | Within 12 hours |
| Message delivery resumes | Within 2 hours |

## Notes

- Irreversible: if you delete the Cloud KMS key, the cluster is scheduled for shutdown and cannot be recovered. Test key disable, revoke and rotation on a disposable cluster and key first.
- You cannot change the key associated with a cluster; rotate it by creating a new key version and setting it primary. You cannot request re-encryption of data at rest (re-encryption requires new data encryption keys).
- Because the service's resources are regional, create the CMEK in the same region as the Kafka cluster. gcloud 593.0.0 help for `gcloud managed-kafka clusters create` documents `--encryption-key` as the relative resource path `projects/PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY`, in the same region as the cluster, and states that the key cannot be changed once set.
- Two ways to disable CMEK: disable the Cloud KMS key (affects all resources associated with that key), or revoke the Crypto Key Encrypter/Decrypter role from the service agent `service-${PROJECT_NUMBER}@gcp-sa-managedkafka.iam.gserviceaccount.com` (affects all Managed Service for Apache Kafka clusters in the project that use CMEK). IAM changes generally propagate faster than key state changes; neither is necessarily instantaneous.
- When the service cannot access the key, publishing and delivery fail with errors. Intermittent Cloud KMS outages under a minute are unlikely to interrupt them; extended unavailability has the same effect as revocation.
- Cloud KMS audit logs record key enable, disable and use; Cloud KMS key IDs are attached to audit logs for cluster resources, with no other Cloud KMS information. Using a CMEK might incur additional costs.
- Google Cloud Managed Service for Apache Kafka runs Apache Kafka; client properties follow upstream Apache Kafka.
- Source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/encryption (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [authentication-kafka-mtls.md](./authentication-kafka-mtls.md)
- [monitor-cluster.md](./monitor-cluster.md)
