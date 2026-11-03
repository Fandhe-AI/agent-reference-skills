---
source: https://developers.cloudflare.com/kv/reference/data-location/
---

# Data location

How the location of data stored in Workers KV is determined, including restricting a namespace to a jurisdiction.

## Signature / Usage

```sh
npx wrangler@latest kv namespace create <NAMESPACE_NAME> --jurisdiction=eu
```

REST API (requires the `Workers KV Storage Write` token permission):

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/storage/kv/namespaces" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"title": "<NAMESPACE_NAME>",
		"jurisdiction": "eu"
	}'
```

## Options / Props

| Parameter | Data Storage Location |
|-----------|-----------------------|
| eu | European Union |
| fedramp | FedRAMP-compliant data centers |
| us | United States of America |

## Notes

- Standard (default): data is stored in KV's central data stores with no jurisdictional restriction, then cached globally.
- Jurisdictions help comply with data locality regulations such as GDPR or FedRAMP. Workers may still access the namespace from anywhere, and data can be cached outside the jurisdiction; the constraint controls only where data is durably stored. Consider Regional Services to control the regions from which Cloudflare responds to requests.
- Jurisdictions can only be set when a namespace is created and cannot be added or changed afterwards.
- `--jurisdiction` cannot be combined with `--experimental-mode` (Instant) on `wrangler kv namespace create`.

## Related

- [kv-namespaces.md](./kv-namespaces.md)
- [kv-commands.md](./kv-commands.md)
- [how-kv-works.md](./how-kv-works.md)
