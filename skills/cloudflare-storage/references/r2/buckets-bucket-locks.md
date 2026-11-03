---
source: https://developers.cloudflare.com/r2/buckets/bucket-locks/
---

# Bucket locks

Bucket locks prevent deletion and overwriting of objects in an R2 bucket for a specified period or indefinitely, enforcing retention policies.

## Signature / Usage

```sh
npx wrangler r2 bucket lock add <BUCKET_NAME> [OPTIONS]
npx wrangler r2 bucket lock set <BUCKET_NAME> --file <FILE_PATH>
npx wrangler r2 bucket lock list <BUCKET_NAME>
npx wrangler r2 bucket lock remove <BUCKET_NAME> --id <RULE_ID>
```

```bash
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/r2/buckets/<BUCKET_NAME>/lock" \
    -H "Authorization: Bearer <API_TOKEN>" \
    -H "Content-Type: application/json" \
    -d '{
        "rules": [
            {
                "id": "lock-logs-7d",
                "enabled": true,
                "prefix": "logs/",
                "condition": {
                    "type": "Age",
                    "maxAgeSeconds": 604800
                }
            },
            {
                "id": "lock-images-indefinite",
                "enabled": true,
                "prefix": "images/",
                "condition": {
                    "type": "Indefinite"
                }
            }
        ]
    }'
```

## Notes

- Up to 1,000 rules per bucket lock configuration. Each rule specifies a prefix and how long objects are locked: a specific duration (e.g. 90 days), until a certain date, or indefinitely. If multiple rules apply to the same object, the strictest (longest) retention wins.
- The `lock set --file` JSON uses the request body format of the put bucket lock configuration API. API tokens need permissions to edit R2 bucket configuration. To remove rules via API, exclude them from the updated configuration and PUT it again.
- Jurisdictional buckets need a `cf-r2-jurisdiction` request header (e.g. `cf-r2-jurisdiction: eu`).
- Rules without prefix apply to all objects. Locks protect existing objects and objects created after the rule is enabled; they do not prevent new object creation.
- Once a rule update succeeds, overwrites, deletes, completion of earlier-started uploads, and lifecycle removals of protected objects are blocked.
- A blocked single-object S3 request fails with HTTP `409` and error code `ObjectLockedByBucketPolicy`. For `DeleteObjects`, R2 returns HTTP `200` and reports `ObjectLockedByBucketPolicy` per locked key in the body. The lock check runs before conditions like `If-None-Match` / `If-Match`, so such a write returns `ObjectLockedByBucketPolicy`, not `PreconditionFailed` (`412`).
- Bucket lock rules take precedence over lifecycle rules (e.g. a 30-day lifecycle delete does not apply until a 90-day lock is satisfied).
- A bucket cannot be emptied while lock rules exist; they also apply when deleting folders from the dashboard.
- Dashboard: bucket **Settings** tab, **Bucket lock rules** card, **Add rule** (name, prefix, retention period).

## Related

- [Object lifecycles](./buckets-object-lifecycles.md)
- [Delete buckets](./buckets-delete.md)
- [Delete objects](./objects-delete.md)
- [Authentication](./api-tokens.md)
