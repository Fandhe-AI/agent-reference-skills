---
source: https://docs.cloud.google.com/kms/docs/ekm
---

# Cloud External Key Manager

Cloud EKM lets you protect data in supported CMEK integration services, or via direct Cloud KMS API calls, with keys held in a supported external key management partner. Key material stays in the external system and is never sent to, cached or stored in Google Cloud; Cloud EKM contacts the partner on every request. Keys appear in Cloud KMS with protection level `EXTERNAL` (over the internet) or `EXTERNAL_VPC` (over a VPC).

## Signature / Usage

Creating a Cloud EKM key over the internet (protection level `EXTERNAL`, no initial key version as the restrictions below require):

```bash
gcloud kms keys create legolas --location=us-central1 \
    --keyring=fellowship --purpose=encryption \
    --default-algorithm=external-symmetric-encryption \
    --protection-level=external --skip-initial-version-creation
```

### Two ways keys are managed

- **Manually managed** (all internet keys; VPC connections in **Manual** EKM management mode): create the key in the EKM, grant the Google Cloud project access, create the Cloud EKM key version with the key URI or key path. Rotation and destruction must be done in both the EKM and Cloud KMS. Automatic rotation is not supported.
- **Coordinated** (VPC connection in **Cloud KMS** EKM management mode, EKM supports the Cloud EKM control plane): Cloud EKM asks the EKM to create keys, rotate and destroy. Protection level is `EXTERNAL_VPC`. Destroying a key version schedules destruction in Cloud KMS; if not restored before the scheduled-for-destruction period ends, Cloud EKM destroys its part and sends a destruction request to the EKM. Data encrypted with the version can't be decrypted after Cloud KMS destruction, even if the EKM hasn't yet destroyed it.

## Options / Props

### Key version parts

| Part | Description |
|------|-------------|
| External key material | Created and stored in your EKM; never shared with Google |
| Key reference | Key URI or key path identifying the external key material |
| Internal key material | Created in Cloud KMS for symmetric Cloud EKM keys only (extra encryption layer); never leaves Cloud KMS; not applicable to asymmetric signing keys |

### Location availability

| Mode | Availability |
|------|--------------|
| Cloud EKM over the internet | Most Cloud KMS locations, regional and multi-regional |
| Cloud EKM over a VPC | Most regional locations; not available in multi-regional locations |
| Not available | Some locations including `global` and `nam-eur-asia1` |

### Restrictions

| Area | Restriction |
|------|-------------|
| Creation | Via API or gcloud the key must not have an initial key version (does not apply to console) |
| Rotation | No automatic rotation for manually managed keys |
| Quotas | Cloud EKM quotas apply in addition to Cloud KMS quotas (https://docs.cloud.google.com/kms/quotas#cloud_ekm_quotas) |
| Symmetric keys | Only for CMEK in supported services and direct symmetric encrypt/decrypt; data can't be decrypted without Cloud EKM |
| Asymmetric signing keys | Subset of Cloud KMS algorithms; only direct asymmetric signing and custom signing key with Access Approval; algorithm can't be changed once set; sign on the `data` field |

## Notes

- Supported key managers: Fortanix, Futurex, Thales.
- Metrics (Preview): `cloudkms.googleapis.com/ekm/external/request_latencies`, `cloudkms.googleapis.com/ekm/external/request_count`.
- Services supporting CMEK with Cloud EKM: Agent Assist, Agent Retrieval, AlloyDB for PostgreSQL, Apigee API hub, Application Integration, Artifact Registry, Backup and DR Service (Backup Vault Container, Backups at rest), Backup for GKE, BigQuery, Bigtable, Cloud Data Fusion, Cloud Healthcare API, Cloud Logging (Log Router, Logging storage), Cloud Run, Cloud Run functions, Cloud SQL (databases, standard and enhanced backups), Cloud Storage, Cloud Tasks, Cloud Workstations, Compute Engine (persistent disks, snapshots, custom images, machine images), Customer Experience Insights, Data Studio, Database Migration Service (MySQL, PostgreSQL, PostgreSQL to AlloyDB, SQL Server, Oracle to PostgreSQL), Dataflow, Dataform, Dataproc Metastore, Datastream, Dialogflow CX, Document AI, Eventarc Advanced (Preview), Eventarc Standard, Filestore, Firestore, Managed Lustre, Managed Service for Apache Kafka, NetApp Volumes, Google Cloud Observability (Preview), Google Distributed Cloud, GKE (data on VM disks, application-layer secrets), Integration Connectors, Knowledge Catalog, Looker (Google Cloud core), Managed Service for Apache Airflow, Managed Service for Apache Spark (cluster data on VM disks, serverless data on VM disks), Memorystore for Redis, for Redis Cluster and for Valkey, Migrate to Virtual Machines, Parameter Manager, Pub/Sub, Secret Manager, Secure Source Manager, Security Command Center, Spanner, Speech-to-Text, Vertex AI, Vertex AI Workbench instances, Workflows, Workload Manager. All other services are not compatible with Cloud EKM for CMEK.
- Both the Cloud EKM key version and the external key are required for every encrypt and decrypt. If you lose access to either, data cannot be recovered; an identical Cloud EKM key version can't be re-created from the same key URI or key path.
- Disabling or losing external keys is disruptive and can be irreversible. For example, if the CMEK key for a Spanner database is unavailable for more than 30 consecutive days, Spanner automatically deletes the database; GKE application-layer secrets encrypted with an unavailable key can make nodes unavailable. Rotating to a new key version does not recover data when the current version is unavailable. Try on disposable resources first.
- When an external key is unavailable Cloud KMS returns `FAILED_PRECONDITION` with a `PreconditionFailure` detail; enable data audit logging to record EKM errors. A support contract with the EKM partner is needed; Google Cloud support can't assist with issues on external systems. Review the Cloud EKM SLA (https://cloud.google.com/ekm/sla).
- Multi-region: key metadata is available in multiple data centers; use a multi-region only if your EKM has low latency to all areas of it. Choose a Google Cloud location geographically near the EKM.
- Key Access Justifications: if enabled, each request to the partner carries a justification code; the partner completes the request only for codes allowed by your policy. Google can't change permissions or Key Access Justifications policies in your EKM; if you revoke Google's permissions, Cloud KMS management operations fail. See the `gcp-security-compliance` skill for Key Access Justifications.
- Cloud EKM can be used with Bare Metal Rack HSM for a standalone HSM solution; this differs from Single-tenant Cloud HSM.
- Partner-managed EKM: a trusted sovereign partner manages your EKM; the partner provisions a Cloud KMS project and an EKM connection configured for EKM key management from Cloud KMS. See the `gcp-security-compliance` skill for Sovereign Controls by Partners.
- Migrating between `EXTERNAL` and `EXTERNAL_VPC` protection levels with zero downtime is in Preview.
- Source: https://docs.cloud.google.com/kms/docs/ekm (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/kms/keys/create (gcloud 593.0.0 help).

## Related

- [create-ekm-connection.md](./create-ekm-connection.md)
- [ekm-architectures.md](./ekm-architectures.md)
- [bare-metal-hsm.md](./bare-metal-hsm.md)
