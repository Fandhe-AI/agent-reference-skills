<!-- source: https://platform.claude.com/docs/en/api/admin/external_keys, https://platform.claude.com/docs/en/api/admin/external_keys/create, https://platform.claude.com/docs/en/api/admin/external_keys/list, https://platform.claude.com/docs/en/api/admin/external_keys/retrieve, https://platform.claude.com/docs/en/api/admin/external_keys/update, https://platform.claude.com/docs/en/api/admin/external_keys/delete, https://platform.claude.com/docs/en/api/admin/external_keys/validate / last verified: 2026-08-07 -->

# External Keys Admin API

Manage customer-managed encryption key (CMEK) configs (AWS KMS / GCP Cloud KMS / Azure Key Vault) referenced by Workspaces.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/organizations/external_keys` | Create External Key |
| GET | `/v1/organizations/external_keys` | List External Keys |
| GET | `/v1/organizations/external_keys/{external_key_id}` | Get External Key |
| POST | `/v1/organizations/external_keys/{external_key_id}` | Update External Key |
| DELETE | `/v1/organizations/external_keys/{external_key_id}` | Delete External Key |
| POST | `/v1/organizations/external_keys/{external_key_id}/validate` | Validate External Key |

```http
curl https://api.anthropic.com/v1/organizations/external_keys \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2023-06-01' \
    -H "Authorization: Bearer $ANTHROPIC_OAUTH_TOKEN" \
    -d '{
          "provider_config": {
            "kms_arn": "arn:aws:kms:us-east-1:111122223333:key/abcd1234-5678-90ab-cdef-000011112222",
            "type": "aws"
          }
        }'
```

## Options / Props

### Body Parameters (Create / Update)

| Name | Type | Description |
|------|------|-------------|
| provider_config | object (discriminated by `type`) | Aws: `{ kms_arn, type: "aws", region?, role_arn? (deprecated, ignored) }`. Gcp: `{ key_name, type: "gcp" }`. Azure: `{ key_name, tenant_id, type: "azure", vault_uri, client_id? }` |
| display_name | optional string | Human-friendly display name |
| geo | optional `"us"` | Data residency geo, only `"us"` supported |

Update: all fields optional and partial (unset fields unchanged). `geo` and `provider_config` become immutable once any workspace references the config.

### Query Parameters (List)

| Name | Type | Description |
|------|------|-------------|
| limit | optional number | Results per page |
| page | optional string | `next_page` cursor |

### ExternalKey object

| Name | Type | Description |
|------|------|-------------|
| id | string | `ekey_...` ID, or AWS KMS key ARN for Claude Platform on AWS orgs |
| created_at / updated_at | string | RFC 3339 timestamps |
| display_name | string | Null if unset |
| geo | string | Data residency geo (selects the regional validator) |
| provider_config | object | See above |
| type | `"external_key"` | Object type |

### Delete response

| Name | Type | Description |
|------|------|-------------|
| id | string | ID of the deleted key |
| type | `"external_key_deleted"` | Object type |

### Validate response

| Name | Type | Description |
|------|------|-------------|
| error | string | Error message when `status` is `failure`, null otherwise |
| status | `"failure"` \| `"success"` | Result of an encrypt/decrypt roundtrip against the KMS (waits up to 30s) |
| type | `"external_key_validation"` | Object type |

## Notes

- Requires an Admin API key (`sk-ant-admin...`).
- Delete is rejected if any workspace still references the config.
- Once attached to a workspace (`external_key_id` on `workspaces.md`), the key is write-once on the workspace side; rotate the underlying KMS key material instead of swapping `external_key_id`.

## Related

- workspaces.md
