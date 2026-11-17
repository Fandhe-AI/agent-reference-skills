---
source: https://docs.cloud.google.com/binary-authorization/docs/overview
---

# Binary Authorization overview

Binary Authorization is a Google Cloud product for software supply-chain security of container-based applications. It enforces a deploy-time policy on images (Enforce) and, with continuous validation (CV, Preview), periodically monitors running Pods against check-based platform policies (Monitor).

## Signature / Usage

### Policy workflow (export, edit, import)

Export the current policy to a YAML file:

```bash
gcloud container binauthz policy export > /tmp/policy.yaml
```

After editing the file, import it:

```bash
gcloud container binauthz policy import /tmp/policy.yaml
```

### Setup order

1. Enable Binary Authorization for the Google Cloud projects of your deployment and authorization pipeline.
2. Define the policy that sets the constraints under which images can be deployed.
3. If the policy requires attestations, set up attestors that verify attestations before images deploy.

## Options / Props

### Supported platforms

| Platform | Description |
|---|---|
| Google Kubernetes Engine (GKE) | Runs images in clusters hosted on Google Cloud. |
| Cloud Run | Runs containerized applications on a fully managed serverless platform. |
| Cloud Service Mesh | Manages a reliable service mesh that is on-premises or on Google Cloud. |
| Google Distributed Cloud software | Runs images in GKE clusters that you host on your own hardware. |

### Related products

| Product | Role |
|---|---|
| Artifact Registry, Container Registry and other registries | Store the images you want to deploy. |
| Artifact Analysis | Provides vulnerability information for deployment control; separately stores the trusted metadata used in the authorization process. |
| Security monitoring | Dashboard to assess application security posture across interdependent Google Cloud products, including Binary Authorization. |
| Cloud Build | Produces attestations and provenance that Binary Authorization can use for enforcement and monitoring. |
| Cloud Deploy | Managed continuous-delivery service that automates delivery to a series of target environments. |

### Features

| Feature | Description |
|---|---|
| Policy model | Describes the constraints under which images can be deployed. |
| Attestation model | Defines trusted authorities who attest that required processes completed before deployment. |
| Deploy-time enforcer | Prevents images that violate the policy from being deployed. |

## Notes

- Enforcement: when you deploy an image, Binary Authorization checks the policy. If the image passes, deployment is allowed; if not, the service blocks deployment and writes a message to Cloud Audit Logs describing why the image is out of compliance.
- Attestation use cases: build verification (the image was built by a specific build system or CI pipeline) and manual check (a person such as a QA representative creates the attestation). An attestation is a record containing the registry path and digest of the image, digitally signed with the signer's private key.
- Continuous validation (CV) with check-based platform policies is Preview ("Pre-GA Offerings Terms"; available "as is" and might have limited support). If images do not conform, CV writes log entries to Cloud Logging.
- Binary Authorization is based on the Kritis specification, part of the Grafeas open source project.
- Setup guides in the source: Set up on GKE, Set up on Distributed Cloud, Set up on Cloud Run. Audit-log guides exist for GKE, Cloud Run and Distributed Cloud.
- VPC Service Controls can be used to secure Binary Authorization-related resources (see "Secure with VPC Service Controls" in the official docs).
- Container Registry is listed in the source as a registry option; use Artifact Registry (`LOCATION-docker.pkg.dev`) for new images.
- Image building is covered by the `docker` skill; enforcement on GKE clusters is covered by the `gcp-gke` skill.
- Console steps are omitted; see the source page.
- Snippet taken from https://docs.cloud.google.com/binary-authorization/docs/configuring-policy-cli
- Source: https://docs.cloud.google.com/binary-authorization/docs/overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [key-concepts.md](./key-concepts.md)
- [attestations.md](./attestations.md)
- [configuring-policy-cli.md](./configuring-policy-cli.md)
- [overview-cv.md](./overview-cv.md)
- [run-overview.md](./run-overview.md)
