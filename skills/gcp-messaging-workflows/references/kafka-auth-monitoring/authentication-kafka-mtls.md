---
source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/authentication-kafka-mtls
---

# Configure mTLS authentication for Managed Service for Apache Kafka

Authenticate Kafka clients with mutual TLS using client certificates issued by Certificate Authority Service (CA Service) CA pools, as an alternative to the default SASL mechanism based on IAM principals. Authorization for mTLS principals must use Kafka ACLs. Only clusters created after June 24, 2025 support mTLS. CA Service itself (pools, CAs) is covered by `gcp-security`.

## Signature / Usage

### Grant the service agent access to a CA pool in another project

Needed only when the CA pool is in a different project than the cluster. Pool-level grant (recommended, least privilege):

Adapted (not in the official docs): `--project=CA_PROJECT_ID` is added so the grant targets the CA pool in the CA project, not a pool of the same name in the currently selected project.

```bash
gcloud privateca pools add-iam-policy-binding CA_POOL_ID \
    --project=CA_PROJECT_ID \
    --location=CA_POOL_LOCATION \
    --member='serviceAccount:service-CLUSTER_PROJECT_NUMBER@gcp-sa-managedkafka.iam.gserviceaccount.com' \
    --role='roles/privateca.poolReader'
```

Alternative at project level (all CA pools in the project):

```bash
gcloud projects add-iam-policy-binding CA_PROJECT_ID \
    --member='serviceAccount:service-CLUSTER_PROJECT_NUMBER@gcp-sa-managedkafka.iam.gserviceaccount.com' \
    --role='roles/privateca.poolReader'
```

### Enable mTLS on a cluster

Adapted (not in the official docs): the source's `--subnets` value uses `locations/LOCATION`; the gcloud 593.0.0 help requires `projects/PROJECT_ID/regions/REGION/subnetworks/SUBNET`, so `regions/LOCATION` is used.

```bash
gcloud managed-kafka clusters create CLUSTER_ID \
    --location=LOCATION \
    --cpu=3 \
    --memory=3GiB \
    --subnets=projects/PROJECT_ID/regions/LOCATION/subnetworks/SUBNET_ID \
    --mtls-ca-pools=projects/PROJECT_ID/locations/LOCATION/caPools/POOL_ID_1,projects/PROJECT_ID/locations/LOCATION/caPools/POOL_ID_2
```

On an existing cluster (overwrites the whole set of pools, so pass the full list):

```bash
gcloud managed-kafka clusters update CLUSTER_ID \
    --location=LOCATION \
    --mtls-ca-pools=projects/PROJECT_ID/locations/LOCATION/caPools/POOL_ID_1,projects/PROJECT_ID/locations/LOCATION/caPools/POOL_ID_2
```

### Configure principal name mapping

Example rule: certificate Subject DN `CN=order-processing-app,OU=marketing,O=company,C=US` becomes the Kafka principal `order-processing-app`.

```text
RULE:^.*[Cc][Nn]=([a-zA-Z0-9.-]*).*$/$1/L,DEFAULT
```

```bash
gcloud managed-kafka clusters update CLUSTER_ID \
    --location=REGION \
    --ssl-principal-mapping-rules='MAPPING_RULE'
```

### Configure Kafka ACLs for the mTLS principal

Requires `roles/managedkafka.aclEditor`. The principal must be prefixed with `User:`.

```bash
gcloud managed-kafka acls add-acl-entry topic/orders-topic \
    --cluster=CLUSTER_ID \
    --location=REGION \
    --principal=User:order-processing-app \
    --operation=WRITE \
    --permission-type=ALLOW \
    --host="*"
```

Adapted (not in the official docs): the source command reads `add-alc-entry`, which does not exist; corrected to `add-acl-entry`.

```bash
gcloud managed-kafka acls add-acl-entry topic/analytics-topic \
    --cluster=CLUSTER_ID \
    --location=REGION \
    --principal=User:order-processing-app \
    --operation=READ \
    --permission-type=ALLOW \
    --host="*"
```

### Configure the Kafka client

Issue a client certificate and key from one of the cluster's CA pools:

Adapted (not in the official docs): the subject is changed from `CN=test-client-app` to `CN=order-processing-app`, so that the certificate maps to the `User:order-processing-app` principal of the ACLs above.

```bash
gcloud privateca certificates create CERTIFICATE_ID \
    --project=PROJECT_ID \
    --issuer-location=REGION \
    --issuer-pool=POOL_ID \
    --ca=CA_NAME \
    --generate-key \
    --dns-san="client.example.com" \
    --subject="CN=order-processing-app" \
    --key-output-file=client-key.pem \
    --cert-output-file=client-cert.pem
```

```bash
gcloud privateca certificates describe CERTIFICATE_ID \
   --issuer-pool=POOL_ID \
   --issuer-location=REGION
```

Create a Java KeyStore from the certificate and key:

```bash
# Create a password for the keystore
export KEYSTORE_PASSWORD="KEYSTORE_PASSWORD"

# Combine the key and cert into a PKCS#12 file
openssl pkcs12 -export -inkey client-key.pem -in client-cert.pem \
  -name client -out client-keystore.p12 -password "pass:$KEYSTORE_PASSWORD"

# Import the PKCS#12 file into a Java KeyStore
keytool -importkeystore -srckeystore client-keystore.p12 -srcstoretype pkcs12 \
  -destkeystore client-keystore.jks -srcstorepass "$KEYSTORE_PASSWORD" -deststorepass "$KEYSTORE_PASSWORD"
```

Client properties (bootstrap address must use port `9192`):

```properties
security.protocol=SSL
ssl.keystore.location=KEYSTORE_LOCATION
ssl.keystore.password=KEYSTORE_PASSWORD
bootstrap.servers=CLUSTER_BOOTSTRAP_ADDRESS
```

## Options / Props

| Item | Value |
|------|-------|
| Cluster eligibility | Created after June 24, 2025 (check with `gcloud managed-kafka clusters describe` or the Console details page) |
| `--mtls-ca-pools` | CA pool resource names `projects/PROJECT_ID/locations/LOCATION/caPools/POOL_ID`; maximum 10; each pool needs root and subordinate CAs |
| `--ssl-principal-mapping-rules` | Value of the `ssl.principal.mapping.rules` broker property |
| mTLS bootstrap port | `9192` |
| User role to create or update the cluster | `roles/managedkafka.clusterEditor` (`managedkafka.clusters.create`, `managedkafka.clusters.update`) |
| User role to manage Kafka ACLs | `roles/managedkafka.aclEditor` |
| Service agent permission on the CA pool | `privateca.caPools.get` (in `roles/privateca.poolReader`) |
| Same-project service agent | Has the permission by default through `managedkafka.serviceAgent` |
| Console roles for CA Service | `roles/privateca.admin` or `roles/privateca.operator` (only to manage pools in the Console) |
| Truststore refresh | Once per hour per cluster |
| Metric | `managedkafka.googleapis.com/mtls_truststore_update_count`, label `STATUS` (`SUCCESS` or a failure reason such as `CA_POOL_FETCH_ERROR`) |
| CA Service quota used | `API requests per minute per region` (`FetchCaCerts`); default limit 400 QPS per region; counted against the project that contains the CA pool |
| Log entries for successful updates | `Managed Service for Apache Kafka updated the mTLS trust store`; `Added root CA certificate to trust store` |

## Notes

- Corrected from the official docs: the source issues the client certificate with `--subject="CN=test-client-app"`, but its ACL examples grant access to `User:order-processing-app`; with the example mapping rule `RULE:^.*[Cc][Nn]=([a-zA-Z0-9.-]*).*$/$1/L,DEFAULT` that client would authenticate as `User:test-client-app`, which the ACLs do not name. The example uses `CN=order-processing-app` so the steps fit together.
- Adapted from the official docs: the source's pool-level `gcloud privateca pools add-iam-policy-binding` command has no `--project`; because this step applies when the CA pool is in another project, `--project=CA_PROJECT_ID` is added (`--project` is a gcloud-wide flag).
- Permissive: a client that authenticates with a valid mTLS certificate is granted full access to the cluster until Kafka ACLs exist. Create ACLs to enforce least privilege. The mTLS principal is the certificate Subject DN (or its mapped alias) prefixed with `User:`; by default it has the form `User:CN=...,OU=...,O=...,L=...,ST=...,C=...`.
- Permissive: the project-level `roles/privateca.poolReader` grant lets the service agent read every CA pool in the project. The source recommends the pool-level grant.
- Adapted from the official docs: the source writes `--subnets=projects/PROJECT_ID/locations/LOCATION/subnetworks/SUBNET_ID`; gcloud 593.0.0 help gives the format `projects/PROJECT_ID/regions/REGION/subnetworks/SUBNET` (one subnet per network, 1 to 10 subnets, same region as the cluster).
- Corrected from the official docs: the source command `gcloud managed-kafka acls add-alc-entry` is a typo for `add-acl-entry`.
- The ACL examples keep the source's `--host="*"`: Managed Service for Apache Kafka supports only host `'*'` (it is also the default in gcloud help).
- gcloud 593.0.0 help states that setting or modifying `--ssl-principal-mapping-rules` triggers a rolling restart of the brokers, and that `--mtls-ca-pools` overwrites the entire set of pools (use `--clear-mtls-ca-pools` on `update` to clear them). CA pools can be in a different project and region than the cluster.
- Private key and keystore handling: `client-key.pem` is a private key and the keystore password appears in the shell session and in the `openssl` / `keytool` arguments. Never commit them; the example password is a placeholder. The source says this example is not recommended for production: store the keystore and its password as secrets in Secret Manager and retrieve them at runtime, or on GKE use the Secret Manager add-on to mount them. Secret Manager is covered by `gcp-security`.
- The source also shows Console steps (including the `Add CA Pool` limit of 10), sample `describe` and `keytool -list` outputs (and the `keytool -v -list` verification command), and a Cloud Shell activation step.
- Troubleshooting is on https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/troubleshooting/troubleshoot-mTLS (not in scope).
- Google Cloud Managed Service for Apache Kafka runs Apache Kafka; client properties follow upstream Apache Kafka.
- Source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/authentication-kafka-mtls (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [authn-types-kafka.md](./authn-types-kafka.md)
- [access-control-kafka-acls.md](./access-control-kafka-acls.md)
- [monitor-cluster.md](./monitor-cluster.md)
