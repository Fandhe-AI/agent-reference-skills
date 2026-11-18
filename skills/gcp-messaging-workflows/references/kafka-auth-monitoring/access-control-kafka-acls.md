---
source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/access-control-kafka-acls
---

# Access control with Kafka ACLs

Apache Kafka ACLs give fine-grained access control inside a Managed Service for Apache Kafka cluster. The service enables the out-of-the-box `StandardAuthorizer`, which stores ACLs in the KRaft-based cluster metadata. ACLs control which authenticated principals can run operations on Kafka resources; standard Kafka clients are otherwise subject only to a cluster-level IAM check on the initial connection. ACLs are managed with the Managed Kafka ACL APIs or with open-source tools such as `kafka-acls.sh` or an Admin Client.

## Signature / Usage

ACL binding format:

```text
Principal P is [Allowed/Denied] Operation O From Host H on any resource matching Resource Pattern RP.
```

### Default-deny: grant an administrator on every resource

Defining any ACL on a resource suppresses `allow.everyone.if.no.acl.found`. Granting an administrator an ACL on all resource types gives every resource an ACL.
Adapted (not in the official docs): the source wraps the principal in backticks (shell command substitution) and leaves `--host=*` unquoted (shell glob); the principal and host are quoted.

```bash
gcloud managed-kafka acls add-acl-entry cluster \
    --principal='User:clusterAdmin@test-project.iam.gserviceaccount.com' \
    --operation=ALL \
    --permission-type=ALLOW \
    --host='*' \
    --cluster=CLUSTER_ID \
    --location=LOCATION
```

Adapted (not in the official docs): same quoting fix as above.

```bash
gcloud managed-kafka acls add-acl-entry allTopics \
    --principal='User:clusterAdmin@test-project.iam.gserviceaccount.com' \
    --operation=ALL \
    --permission-type=ALLOW \
    --host='*' \
    --cluster=CLUSTER_ID \
    --location=LOCATION
```

Adapted (not in the official docs): same quoting fix as above.

```bash
gcloud managed-kafka acls add-acl-entry allConsumerGroups \
    --principal='User:clusterAdmin@test-project.iam.gserviceaccount.com' \
    --operation=ALL \
    --permission-type=ALLOW \
    --host='*' \
    --cluster=CLUSTER_ID \
    --location=LOCATION
```

Adapted (not in the official docs): same quoting fix as above.

```bash
gcloud managed-kafka acls add-acl-entry allTransactionalIds \
    --principal='User:clusterAdmin@test-project.iam.gserviceaccount.com' \
    --operation=ALL \
    --permission-type=ALLOW \
    --host='*' \
    --cluster=CLUSTER_ID \
    --location=LOCATION
```

### Allow reading from a topic

Adapted (not in the official docs): the source omits the `\` after `--location=LOCATION`, which breaks the command; it is added.

```bash
gcloud managed-kafka acls add-acl-entry topic/topic-name \
    --cluster=CLUSTER_ID \
    --location=LOCATION \
    --principal='User:test-kafka-client@test-project.iam.gserviceaccount.com' \
    --operation=READ \
    --permission-type=ALLOW \
    --host='*'
```

Remove it with the same parameters.

Adapted (not in the official docs): same missing `\` fixed.

```bash
gcloud managed-kafka acls remove-acl-entry topic/topic-name \
    --cluster=CLUSTER_ID \
    --location=LOCATION \
    --principal='User:test-kafka-client@test-project.iam.gserviceaccount.com' \
    --operation=READ \
    --permission-type=ALLOW \
    --host='*'
```

### Allow writing to all topics with a prefix

Adapted (not in the official docs): same missing `\` fixed.

```bash
gcloud managed-kafka acls add-acl-entry topicPrefixed/topic-prefix \
    --cluster=CLUSTER_ID \
    --location=LOCATION \
    --principal='User:test-kafka-client@test-project.iam.gserviceaccount.com' \
    --operation=WRITE \
    --permission-type=ALLOW \
    --host='*'
```

### Deny modifying all topics

Deny `ALTER`, `ALTER_CONFIGS` and `DELETE` (one `add-acl-entry` per operation; shown for `DELETE`).

Adapted (not in the official docs): same missing `\` fixed.

```bash
gcloud managed-kafka acls add-acl-entry allTopics \
    --cluster=CLUSTER_ID \
    --location=LOCATION \
    --principal='User:test-kafka-client@test-project.iam.gserviceaccount.com' \
    --operation=DELETE \
    --permission-type=DENY \
    --host='*'
```

### Troubleshooting denials

Search the cluster logs for `StandardAuthorizerData logAuditMessage`. Sample entry:

```text
org.apache.kafka.metadata.authorizer.StandardAuthorizerData logAuditMessage\n
INFO: Principal = User:556291496362-compute@developer.iam.gserviceaccount.com is
Denied operation = DESCRIBE from host = 172.16.0.20 on resource = Topic:LITERAL:t1
for request = Metadata with resourceRefCount = 1 based on rule DefaultDeny
```

## Options / Props

### Principals

| Authentication | Principal format (prefix `User:`) |
|----------------|-----------------------------------|
| SASL/IAM | `User:my-service-account@my-project.iam.gserviceaccount.com`, `User:test-kafka-client@test-project.iam.gserviceaccount.com` |
| mTLS (default, from Subject DN) | `User:CN=my-client,OU=my-org-unit`, `User:CN=client1,OU=dev,O=MyOrg,L=City,ST=State,C=US` |
| mTLS with a principal mapping rule | The mapped alias, for example `User:order-processing-app` |
| Group proxy (service account impersonation) | `User:group-proxy@test-project.iam.gserviceaccount.com` |

### ACL resource ID (positional argument)

| ACL ID | Matches |
|--------|---------|
| `cluster` | The cluster resource |
| `topic/NAME`, `consumerGroup/NAME`, `transactionalId/NAME` | A single (literal) resource |
| `topicPrefixed/PREFIX`, `consumerGroupPrefixed/PREFIX`, `transactionalIdPrefixed/PREFIX` | All resources whose name starts with the prefix |
| `allTopics`, `allConsumerGroups`, `allTransactionalIds` | All resources of the type (`topic/*`, `consumerGroup/*`, `transactionalId/*`) |

### Flags of `add-acl-entry` / `remove-acl-entry`

| Flag | Values |
|------|--------|
| `--cluster`, `--location` | Cluster ID and region of the cluster |
| `--principal` | Required; `User:` prefix |
| `--operation` | Required; `ALL`, `READ`, `WRITE`, `CREATE`, `DELETE`, `ALTER`, `DESCRIBE`, `CLUSTER_ACTION`, `DESCRIBE_CONFIGS`, `ALTER_CONFIGS`, `IDEMPOTENT_WRITE` |
| `--permission-type` | `ALLOW` (default) or `DENY` |
| `--host` | Only `'*'` is supported (default `"*"`) |

### Producer and consumer grants

| Role | Resource | Operation |
|------|----------|-----------|
| Producer | Topic | `WRITE` and `CREATE` |
| Producer using transactional IDs | Transactional ID | `WRITE` |
| Consumer | Topic | `READ` |
| Consumer | Consumer group | `READ` |

## Notes

- Permissive: the default-deny examples grant `--operation=ALL` with host `'*'` to an administrator principal on the cluster, all topics, all consumer groups and all transactional IDs. `'*'` as host is the only host value the service supports; it is not an open grant to every principal.
- Default access: clusters run with `allow.everyone.if.no.acl.found` set to `true`. With no ACL on a resource, all authenticated principals can access it; once any ACL is defined for it, only principals with an `ALLOW` entry can (unless blocked by `DENY`). `DENY` bindings take precedence.
- Managed Service for Apache Kafka gives its service agent administrative access to the cluster (similar to super users, except for read and write operations); this cannot be changed.
- Principals must be a user, a service account, or an individual IAM principal, not a group or principal set; Kafka ACLs do not resolve group memberships. To cover a Google Group, create a proxy service account, grant the group `roles/iam.serviceAccountTokenCreator` on it, add ACLs for the proxy service account principal and have clients use service account impersonation.
- Managing ACLs needs `roles/managedkafka.aclEditor`. ACLs can be managed per ACL resource (all entries for one resource pattern) or incrementally with `add-acl-entry` and `remove-acl-entry`.
- A `READ` operation on the topic resource type maps to the `Fetch`, `OffsetCommit` and `TxnOffsetCommit` Kafka protocols. Valid operations per resource: https://kafka.apache.org/37/security/authorization-and-acls/#operations-and-resources-on-protocols
- Corrected from the official docs: the source commands wrapped the principal in backticks, used an unquoted `--host=*` and, in the single-topic, prefix and deny examples, omitted the line continuation after `--location=LOCATION`. The quoted `--principal='User:...'` form is the one the source itself uses in its flag descriptions.
- Try ACL changes, especially `DENY` entries and removals, on a disposable cluster first. The source describes the `ALTER` (partition count, replication factor), `ALTER_CONFIGS` (topic-level configuration) and `DELETE` (topic deletion) denies as three separate entries with the same arguments; the same effect can be defined declaratively with one ACL resource holding a list of `AclEntry` resources. Only the `DELETE` command and its removal are shown above.
- Google Cloud Managed Service for Apache Kafka runs Apache Kafka; client properties follow upstream Apache Kafka.
- Source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/access-control-kafka-acls (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [authn-types-kafka.md](./authn-types-kafka.md)
- [authentication-kafka-mtls.md](./authentication-kafka-mtls.md)
- [authentication-kafka.md](./authentication-kafka.md)
