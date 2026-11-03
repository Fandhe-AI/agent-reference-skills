---
source: https://developers.cloudflare.com/r2/buckets/delete-buckets/
---

# Delete buckets

A bucket must be emptied before it can be deleted. Emptying removes all objects but preserves bucket configuration; deleting removes the bucket and its configuration.

## Signature / Usage

Add a lifecycle rule that expires all objects after 1 day:

```sh
npx wrangler r2 bucket lifecycle add <BUCKET_NAME> --expire-days 1
```

After the bucket is empty, remove the rule:

```sh
npx wrangler r2 bucket lifecycle remove <BUCKET_NAME> --id <RULE_ID>
```

Delete an empty bucket:

```sh
npx wrangler r2 bucket delete <BUCKET_NAME>
```

```sh
curl -X DELETE "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/r2/buckets/<BUCKET_NAME>" \
  -H "Authorization: Bearer <API_TOKEN>"
```

With a jurisdiction:

```sh
curl -X DELETE "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/r2/buckets/<BUCKET_NAME>" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "cf-r2-jurisdiction: eu"
```

## Notes

- Emptying is irreversible. Dashboard: bucket **Settings** tab, **Empty Bucket** section, **Empty**; large buckets are emptied in the background with progress shown.
- Alternative: lifecycle rule with no prefix filter and 1-day expiration; objects are typically removed within 24 hours (large buckets may take longer). Remove the rule as soon as the bucket is empty, because objects uploaded while it is active also expire.
- Other approaches: script that lists and deletes in batches using the S3 API or Workers API, or rclone.
- You cannot empty a bucket that has bucket lock rules; remove all lock rules first.
- `wrangler r2 bucket delete` fails if the bucket still contains objects.
- Deleting a bucket removes lifecycle rules, CORS settings, event notifications, and custom domains. Remove a custom domain association before or after deletion to avoid dangling DNS records.

## Related

- [Bucket locks](./buckets-bucket-locks.md)
- [Object lifecycles](./buckets-object-lifecycles.md)
- [Delete objects](./objects-delete.md)
- [Create new buckets](./buckets-create.md)
