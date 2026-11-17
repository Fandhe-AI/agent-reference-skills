---
source: https://docs.cloud.google.com/certificate-authority-service/docs/ca-service-overview
---

# Certificate Authority Service overview

Certificate Authority Service (CA Service) is a Google Cloud service for creating, automating and securing private certificate authorities (CAs). Private CAs issue digital certificates (entity identity, issuer identity, cryptographic signature) used to authenticate users, machines and services, often in DevOps environments for containers, microservices, VMs and service accounts. CA Service manages a private PKI, as opposed to the Web PKI.

## Signature / Usage

### Create the first resource: a CA pool

You must create a CA pool before you can create a CA (see [creating-ca-pool.md](./creating-ca-pool.md)).

```bash
gcloud privateca pools create POOL_NAME --location=LOCATION
```

## Options / Props

### Capabilities

| Capability | Detail |
|---|---|
| CA hierarchy | Create custom root and subordinate CAs; define subject, key algorithm and location. |
| Regions | A subordinate CA's region can differ from its root CA's region. |
| Templates | Reusable, parameterized templates for common issuance scenarios. |
| Bring your own root | Chain CAs up to an existing root CA on-premises or outside Google Cloud. |
| Key storage | CA keys can be stored in Cloud HSM (FIPS 140-2 Level 3 validated; several regions in the Americas, Europe and Asia Pacific). |
| Audit | Cloud Audit Logs show who did what, when and where. |
| Access control | IAM for granular access; VPC Service Controls for security perimeters. |
| Throughput | Up to 25 certificates per second per CA (DevOps tier). Several CAs behind one CA pool issuance endpoint distribute requests, for up to 100 certificates per second. |
| Management | APIs, Google Cloud CLI, Google Cloud console, Terraform. |

### Certificate use cases

| Use case | Description |
|---|---|
| Software supply chain and code identity | Code signing, artifact authentication, application identity certificates. |
| User identity | Client authentication certificates for zero trust networking, VPN, document signing, email, smartcard. |
| IoT and mobile device identity | Client authentication certificates as device identity, for example wireless access. |
| Intraservice identity | mTLS certificates used by microservices. |
| CI/CD channels | Code signing certificates used throughout the CI/CD build. |
| Kubernetes and Istio | Certificates securing connections between Kubernetes and Istio components. |

## Notes

- Why a private PKI: it uses a small CA hierarchy managed by one organization and issues only to clients that trust that organization, so it is not limited to publicly verifiable identities. It allows internal sites with short domain names and other identity formats such as SPIFFE IDs, and does not require logging issued certificates to public Certificate Transparency logs, which keeps internal topology private.
- Pricing, security and compliance, and locations are separate pages: https://cloud.google.com/certificate-authority-service/pricing, https://docs.cloud.google.com/certificate-authority-service/docs/certificate-authority-compliance, https://docs.cloud.google.com/certificate-authority-service/docs/locations.
- Snippet taken from https://docs.cloud.google.com/certificate-authority-service/docs/creating-ca-pool
- Source: https://docs.cloud.google.com/certificate-authority-service/docs/ca-service-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [ca-service-concepts.md](./ca-service-concepts.md)
- [creating-ca-pool.md](./creating-ca-pool.md)
- [request-certificates-gcloud.md](./request-certificates-gcloud.md)
