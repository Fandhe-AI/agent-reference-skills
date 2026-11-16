---
source: https://docs.cloud.google.com/memorystore/docs/valkey/manage-iam-auth
---

# Manage IAM authentication

Create an instance with IAM authentication, grant `roles/memorystore.dbConnectionUser`, connect with `valkey-cli` and an access token, automate token retrieval, and troubleshoot errors.

## Signature / Usage

### Create an instance with IAM authentication

Adapted (not in the official docs): `--region` and `--network` are not flags of `gcloud memorystore instances create` (gcloud reports "unrecognized arguments"); replaced with `--location` and the `--endpoints` PSC auto-connection form used on the create-instances page.

```bash
gcloud memorystore instances create INSTANCE_ID --location=REGION_ID --endpoints='[{"connections": [{"pscAutoConnection": {"network": "projects/NETWORK_PROJECT_ID/global/networks/NETWORK_ID", "projectId": "PROJECT_ID"}}]}]' --node-type=NODE_TYPE --shard-count=SHARD_COUNT --authorization-mode=iam-auth
```

### Connect (valkey-cli)

Retrieve a token for your IAM user:

```bash
gcloud auth print-access-token
```

Connect to the discovery endpoint:

Adapted (not in the official docs): `-a ACCESS_TOKEN` is replaced with `--askpass`, so `valkey-cli` prompts for the token instead of taking it as a process argument.

```bash
valkey-cli -h NETWORK_ADDRESS -p PORT --askpass -c
```

With in-transit encryption enabled, append the TLS flags:

Adapted (not in the official docs): `-a ACCESS_TOKEN` is replaced with `--askpass`, so `valkey-cli` prompts for the token instead of taking it as a process argument.

```bash
valkey-cli -h NETWORK_ADDRESS -p PORT --askpass -c --tls --cacert /tmp/server_ca.pem
```

For Cluster Mode Enabled instances you can run `CLUSTER SHARDS` to view the topology, then connect to a node:

Adapted (not in the official docs): `-a ACCESS_TOKEN` is replaced with `--askpass`, so `valkey-cli` prompts for the token instead of taking it as a process argument.

```bash
valkey-cli -h NODE_IP_ADDRESS -p NODE_PORT --askpass -c
```

Verify with `SET` and `GET`.

### Automate access token retrieval

```bash
gcloud iam service-accounts create SA_NAME \
    --description="DESCRIPTION" \
    --display-name="DISPLAY_NAME"
```

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
--member="serviceAccount:SA_NAME@PROJECT_ID.iam.gserviceaccount.com" \
--role=roles/"ROLE_NAME"
```

ROLE_NAME for this example is `memorystore.dbConnectionUser`. Then authenticate the application as that service account (client library code samples are on the Memorystore client library code samples page).

## Options / Props

| Item | Detail |
|------|--------|
| INSTANCE_ID | 1 to 63 characters; lowercase letters, numbers, hyphens; starts with a lowercase letter, ends with a lowercase letter or number |
| NETWORK_PROJECT_ID / NETWORK_ID | network path `projects/NETWORK_PROJECT_ID/global/networks/NETWORK_ID`; must match the network of the service connection policy or `create` fails |
| PROJECT_ID | project in which the instance is created |
| Username | `default` or the IAM principal email address (or omit) |
| Per-instance grant | use the `resource.name` attribute with `projects/PROJECT/locations/REGION/instances/INSTANCE_NAME` |

| Error | Action |
|-------|--------|
| `-WRONGPASS invalid username-password pair or user is disabled` | Verify the access token and that the matching ACL user is enabled; expired token, missing permissions or recent IAM changes (minutes to propagate) |
| `-NOAUTH Authentication required` | Configure the application to supply an IAM access token |
| `-ERR (ERR_IAM_EXHAUSTED) Memorystore IAM authentication backend quota exceeded.` | Retry with exponential backoff |
| `-ERR (ERR_IAM_OTHER) Memorystore IAM authentication backend error.` | Invalid username (use `default`, none, or the principal email) or transient backend error; retry with exponential backoff |

## Notes

- Corrected from the official docs: the source's commands pass `-a ACCESS_TOKEN`, which puts the access token in shell history and the process list. The valkey-cli reference lists `--askpass` and says of it: "If this argument is used, `-a` and the `VALKEYCLI_AUTH` environment variable will be ignored." (https://valkey.io/topics/cli/). Paste the output of `gcloud auth print-access-token` at the prompt; never print or log an access token in shared terminals.
- Do not use `-c` with a Cluster Mode Disabled instance. Authenticated connections remain valid after the token expires.
- Corrected from the official docs: `gcloud memorystore instances create INSTANCE_ID --region=REGION_ID --network=NETWORK --node-type=NODE_TYPE --shard-count=SHARD_COUNT --authorization-mode=iam-auth`; gcloud (SDK 593.0.0) rejects `--region` and `--network`.
- Granting `roles/memorystore.dbConnectionUser` at project level allows access to all instances in the project. To limit by instance, see "Grant access to a group of resources based on resource name prefixes" in the IAM docs; a limited IAM admin for this role can also be created.
- Delete the Compute Engine VM used for testing to avoid charges. The source also shows Console steps.
- Managed Valkey on Google Cloud; distinct from Upstash Redis (`upstash`). Service accounts and ADC are in `gcp-foundation`; gcloud auth in `gcp-cli`.
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/manage-iam-auth (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-iam-auth.md](./about-iam-auth.md)
- [access-control.md](./access-control.md)
- [manage-in-transit-encryption.md](./manage-in-transit-encryption.md)
