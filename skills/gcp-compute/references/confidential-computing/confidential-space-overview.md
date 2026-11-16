---
source: https://docs.cloud.google.com/confidential-computing/confidential-space/docs/confidential-space-overview
---

# Confidential Space overview

Confidential Space provides an isolated TEE for operating on sensitive data from multiple parties (PII, PHI, intellectual property, cryptographic secrets, ML models, LLM interactions) so data owners keep it confidential. An attestation process and a hardened OS image protect the workload and its data from the operator, and secrets are released only to authorized workloads.

## Signature / Usage

A workload runs on a Confidential VM created from a Confidential Space image:

```bash
gcloud compute instances create INSTANCE_NAME \
    --confidential-compute-type=CONFIDENTIAL_COMPUTING_TECHNOLOGY \
    --machine-type=MACHINE_TYPE_NAME \
    --maintenance-policy=MAINTENANCE_POLICY \
    --shielded-secure-boot \
    --image-project=confidential-space-images \
    --image-family=IMAGE_FAMILY \
    --metadata="^~^tee-image-reference=us-docker.pkg.dev/WORKLOAD_AUTHOR_PROJECT_ID/REPOSITORY_NAME/WORKLOAD_CONTAINER_NAME:latest" \
    --service-account=WORKLOAD_SERVICE_ACCOUNT_NAME@WORKLOAD_OPERATOR_PROJECT_ID.iam.gserviceaccount.com \
    --scopes=cloud-platform \
    --zone=ZONE_NAME \
    --project=PROJECT_ID
```

## Options / Props

### Components

| Component | Description |
|-----------|-------------|
| Workload | Containerized image with the code that processes protected resources, run on a Confidential Space image (hardened OS based on Container-Optimized OS) on a Confidential VM. Typically in a separate project from the protected resources. |
| Attestation service | Remote verifier returning identity tokens with workload attributes. Google Cloud Attestation (AMD SEV and Intel TDX; runs in the workload's region) or Intel Trust Authority (Intel TDX; runs in a region you define). |
| Protected resources | Resources behind authentication and authorization, e.g. Cloud KMS keys or Cloud Storage buckets, or any resource outside Google Cloud. |

### Roles

| Role | Description |
|------|-------------|
| Data collaborators | Own the protected resources; can access their own data, set permissions, and maybe see results. Can't access each other's data or modify workload code. |
| Workload author | Builds the application into a container image (e.g. Docker) in a repository such as Artifact Registry. No access to data or results and can't control access. |
| Workload operator | Runs the workload with full administrative privileges on their project. No access to the data, can't control access, can't modify the workload code or execution environment. |

One person can hold several roles; the strongest trust model uses separate, mutually distrusting parties.

### Requirements

Confidential VM with AMD SEV, Intel TDX, or Intel TDX with NVIDIA Confidential Computing.

## Notes

- Source: https://docs.cloud.google.com/confidential-computing/confidential-space/docs/confidential-space-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/confidential-computing/confidential-space/docs/deploy-workloads (the overview page itself has no code).
- Example flow in the source: collaborators store encrypted data in isolated projects, create a workload identity pool (WIP) with a provider (attestation service, attribute mappings, attribute conditions), the author pushes the image to Artifact Registry, the operator creates a service account and starts a debug-image VM to test on non-confidential data, then production after all parties sign off.
- Confidential Space on Google Cloud; not Apple Private Cloud Compute (`apple-intelligence`). Workload identity federation in general is in `gcp-foundation`.

## Related

- [deploy-workloads.md](./deploy-workloads.md)
- [create-customize-workloads.md](./create-customize-workloads.md)
- [confidential-vm-overview.md](./confidential-vm-overview.md)
- [supported-configurations.md](./supported-configurations.md)
