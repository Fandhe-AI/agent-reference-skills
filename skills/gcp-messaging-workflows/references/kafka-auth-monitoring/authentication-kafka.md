---
source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/authentication-kafka
---

# Configure SASL authentication for Managed Service for Apache Kafka

Clients connect with the open source Apache Kafka API. All connections must be encrypted with TLS; plaintext communication is not supported. Authentication uses one of two mechanisms, SASL or mTLS. With SASL, a client authenticates with the credentials of an authorized IAM principal such as a service account, and the service manages the server-side broker certificates. SASL/OAUTHBEARER (Application Default Credentials) is recommended; SASL/PLAIN (service account key or access token) can be more convenient for testing.

## Signature / Usage

### Grant the Managed Kafka client role

Grant `roles/managedkafka.client` on the project containing the cluster to the service account the client uses. The role includes `managedkafka.clusters.connect`, required for all connections.

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member serviceAccount:SERVICE_ACCOUNT_EMAIL \
  --role roles/managedkafka.client
```

### SASL/OAUTHBEARER

Uses Application Default Credentials (ADC). The source defers the client configuration to the googleapis/managedkafka GitHub README (client auth section): https://github.com/googleapis/managedkafka?tab=readme-ov-file#google-cloud-managed-service-for-apache-kafkatm-client-auth

### SASL/PLAIN with a service account key JSON file

Applicable to all Kafka clients. Download a key JSON file for the service account, then base64-encode it (the file name `my_service_account_key.json` is the source's example):

Adapted (not in the official docs): `base64 -w 0` is a GNU coreutils option that the macOS `base64` does not accept; the newline is removed with `tr` instead, which works on both.

```bash
base64 < my_service_account_key.json | tr -d '\n' > password.txt
```

Use the contents of `password.txt` (a single line) as the password:

```properties
security.protocol=SASL_SSL
sasl.mechanism=PLAIN
sasl.jaas.config=org.apache.kafka.common.security.plain.PlainLoginModule required \
username="SERVICE_ACCOUNT_EMAIL_ADDRESS" \
password="CONTENTS_OF_BASE64_ENCODED_PASSWORD_FILE";
```

### SASL/PLAIN with an access token

Get a token for the current gcloud CLI principal:

```bash
gcloud auth print-access-token
```

```properties
security.protocol=SASL_SSL
sasl.mechanism=PLAIN
sasl.jaas.config=org.apache.kafka.common.security.plain.PlainLoginModule required \
username="PRINCIPAL_EMAIL_ADDRESS" \
password="ACCESS_TOKEN_VALUE";
```

### Workload Identity Federation for GKE

Annotate the Kubernetes service account (only when not linking it to an IAM service account with the `iam.gke.io/gcp-service-account` annotation):

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: kafka-service-account
  annotations:
    iam.gke.io/return-principal-id-as-email: "true"
```

## Options / Props

| Item | Value |
|------|-------|
| Role | `roles/managedkafka.client` (includes `managedkafka.clusters.connect`) |
| Username (key file) | Service account email address; must match the service account whose key is in the password |
| Password (key file) | Base64-encoded service account key JSON, one line |
| Username (access token) | Email of the principal the token belongs to |
| Password (access token) | Access token value; must be valid and not expired |
| `security.protocol` | `SASL_SSL` |
| `sasl.mechanism` | `PLAIN` |
| GKE version for Workload Identity Federation for GKE | `1.31.1-gke.1241000` or higher |
| `google-auth` package for the local auth server | `2.40.3` or higher |

## Notes

- Adapted from the official docs: the source shows `base64 -w 0 < my_service_account_key.json > password.txt` for Linux or macOS; `-w 0` exists only in GNU `base64`, so the command pipes through `tr -d '\n'` to produce a single line on both. The password file holds a service account key; restrict its permissions (for example `chmod 600`) and delete it when no longer needed.
- Caution (source): service account keys are a security risk if not managed correctly. You are responsible for the security of the private key; key creation might be disabled for your organization (secure-by-default organizations). A key from an external source must be validated before use.
- Caution (source): access tokens are short-lived and expire; make sure the client presents a valid token each time it opens a new Kafka wire protocol connection. Reference implementations: https://github.com/googleapis/managedkafka/tree/main/sasl-plain-access-token/README.md
- Server-side checks for a key: the username matches the service account whose key is the password, and that principal has `managedkafka.clusters.connect` on the cluster. For a token: the token is valid and unexpired, the username matches the principal email of the token, and that principal has `managedkafka.clusters.connect` on the cluster.
- The service account key and access token are secrets. Keep `password.txt` and any properties file that contains them out of version control and never commit real values; placeholders above are upper-case.
- The source says to use the `base64` command on Linux or macOS systems as shown.
- The grant above is at project level, as in the source; it applies to every cluster in the project.
- Workload Identity Federation for GKE supports SASL/PLAIN and SASL/OAUTHBEARER. Fleet workload identity is not supported; link the Kubernetes service account to an IAM service account instead. The GKE principal still needs `managedkafka.clusters.connect` (in `roles/managedkafka.client`).
- Google Cloud Managed Service for Apache Kafka runs Apache Kafka; client properties follow upstream Apache Kafka.
- The source also shows the Console steps for the grant and Cloud Shell activation.
- Source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/authentication-kafka (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [authn-types-kafka.md](./authn-types-kafka.md)
- [authentication-kafka-mtls.md](./authentication-kafka-mtls.md)
- [access-control-kafka-acls.md](./access-control-kafka-acls.md)
