---
source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/authn-types-kafka
---

# Authentication for Kafka clients

Supported authentication methods for client applications connecting to Managed Service for Apache Kafka brokers: SASL/OAUTHBEARER, SASL/PLAIN and mTLS. SASL authenticates a Google Cloud IAM principal; mTLS authenticates a client certificate and is authorized only with Kafka ACLs.

## Signature / Usage

The mTLS client configuration summarized by the comparison below (keystore and truststore properties, dedicated bootstrap port `9192`):

```properties
security.protocol=SSL
ssl.keystore.location=KEYSTORE_LOCATION
ssl.keystore.password=KEYSTORE_PASSWORD
bootstrap.servers=CLUSTER_BOOTSTRAP_ADDRESS
```

## Options / Props

### Options by client location

| Client location | Method | Source's assessment |
|-----------------|--------|---------------------|
| Google Cloud (GKE, Compute Engine, Cloud Run, Cloud Run functions) | SASL/OAUTHBEARER | Recommended; uses Application Default Credentials, no static credential files |
| Google Cloud | SASL/PLAIN | Useful for early development; long-lived service account key |
| Google Cloud | mTLS | When the organization standard is certificate-based authentication |
| Outside Google Cloud | Workload Identity Federation with SASL/OAUTHBEARER | Recommended; short-lived Google Cloud access tokens |
| Outside Google Cloud | mTLS | Provider-agnostic; fits an existing PKI; you manage long-lived client certificates |
| Outside Google Cloud | SASL/PLAIN with a service account key | Generally discouraged for production workloads |

### Feature comparison

| Feature | SASL/OAUTHBEARER | SASL/PLAIN | mTLS |
|---------|------------------|------------|------|
| Primary identity | Google Cloud IAM Principal | Google Cloud IAM Principal | Certificate Subject Name |
| Credential type | Application Default Credentials (ADC) or OAuth 2.0 token | Base64-encoded service account key | Client certificate and private key |
| Authorization method | Google Cloud IAM roles or Kafka ACLs | Google Cloud IAM roles or Kafka ACLs | Kafka ACLs only |
| Client configuration | JAAS config with specialized login handler class (Java) or a local auth server (non-Java) | JAAS config with standard `PlainLoginModule` (Java) | Keystore and truststore properties (for example `security.protocol=SSL`) |
| Cluster availability | All clusters | All clusters | Clusters created after June 24, 2025 |

### Limits and requirements

| Item | Value |
|------|-------|
| mTLS availability | Clusters created after June 24, 2025 |
| CA pools trusted per cluster | Maximum 10 |
| mTLS bootstrap port | `9192` |
| Java OAUTHBEARER login handler | `GcpLoginCallbackHandler` |
| mTLS truststore metric | `managedkafka.googleapis.com/mtls_truststore_update_count` |
| mTLS service agent | `service-PROJECT_NUMBER@gcp-sa-managedkafka.iam.gserviceaccount.com` |

## Notes

- Snippet taken from https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/authentication-kafka-mtls (the page itself has no code block). Replace the placeholders with your own values and do not commit the keystore password.
- Workflow for SASL: grant `roles/managedkafka.client` (includes `managedkafka.clusters.connect`) to the client's service account, configure the client, then configure authorization with IAM roles or Kafka ACLs. Java clients add the Google Cloud authentication library to the classpath and set `GcpLoginCallbackHandler`; non-Java clients run a local authentication server that uses ADC and point the client at its endpoint. SASL/PLAIN uses `SASL_SSL`, `PLAIN`, `PlainLoginModule`; the username is the service account email and the password is a base64-encoded key file or a short-lived access token.
- Workflow for mTLS: create root and subordinate CAs inside CA Service CA pools (CA Service itself is covered by `gcp-security`); grant the service agent access if the pools are in another project; create or update the cluster with the CA pool resource identifiers; set `ssl.principal.mapping.rules` (recommended); obtain client certificates and configure the client with `security.protocol=SSL` and port `9192`; monitor `mtls_truststore_update_count`.
- If no Kafka ACLs are set, default Kafka behavior grants all authenticated principals, SASL or mTLS, full access to the cluster. The source strongly recommends configuring Kafka ACLs.
- mTLS principals cannot be managed with IAM roles. The service only authenticates clients that present certificates managed by CA Service; an external root of trust can be integrated through a subordinate CA in CA Service that chains to the external CA.
- SASL limitations: tied to IAM principals (not suited to organizations that require separation from Google Cloud identity, unless Workload Identity Federation is configured) and does not use client certificates.
- The source recommends SASL with IAM or Workload Identity Federation for most use cases; choose mTLS for strict certificate-based requirements, such as migrating an on-premises Kafka deployment.
- Google Cloud Managed Service for Apache Kafka runs Apache Kafka; client properties follow upstream Apache Kafka.
- Source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/authn-types-kafka (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [authentication-kafka.md](./authentication-kafka.md)
- [authentication-kafka-mtls.md](./authentication-kafka-mtls.md)
- [access-control-kafka-acls.md](./access-control-kafka-acls.md)
