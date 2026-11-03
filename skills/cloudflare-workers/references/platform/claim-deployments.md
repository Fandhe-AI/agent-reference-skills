---
source: https://developers.cloudflare.com/workers/platform/claim-deployments/
---

# Claim deployments (temporary accounts)

Deploy Workers before authenticating using a temporary preview account, then claim it within 60 minutes to keep its deployments and supported resources.

## Signature / Usage

With Wrangler 4.102.0 or later, an unauthenticated non-interactive `wrangler deploy` prints guidance to rerun with `--temporary`:

```bash
npx wrangler deploy --temporary
```

Expected output shape:

```txt
Continuing means you accept Cloudflare's Terms of Service (https://www.cloudflare.com/terms/) and Privacy Policy (https://www.cloudflare.com/privacypolicy/).

Temporary account ready:
  Account:        example-name (created)
  Claim within:   60 minutes
  Claim URL:      https://dash.cloudflare.com/claim-preview?claimToken=<CLAIM_TOKEN>

Uploaded example-worker
Deployed example-worker triggers
  https://example-worker.example-name.workers.dev
```

REST API flow (backend only; step 1, request a proof-of-work challenge):

```bash
curl "https://api.cloudflare.com/client/v4/provisioning/previews/challenge" \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{}'
```

Step 2, create the temporary account after the user accepts the Terms of Service and Privacy Policy:

```bash
curl "https://api.cloudflare.com/client/v4/provisioning/previews" \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{
    "termsOfService": "https://www.cloudflare.com/terms/",
    "privacyPolicy": "https://www.cloudflare.com/privacypolicy/",
    "acceptTermsOfService": "yes",
    "challengeToken": "<CHALLENGE_TOKEN>",
    "solution": {
      "checkpoints": "<BASE64_CHECKPOINTS>"
    }
  }'
```

Challenge solver (Node.js):

```js
import { createHash } from "node:crypto";

function sha256(value) {
	return createHash("sha256").update(value).digest();
}

export function solvePreviewChallenge({ challengeToken, seed, k, g }) {
	const seedBytes = Buffer.from(seed, "base64url");
	if (seedBytes.length !== 32) {
		throw new Error("seed must decode to 32 bytes");
	}
	if (!Number.isInteger(k) || k <= 0) {
		throw new Error("k must be a positive integer");
	}
	if (!Number.isInteger(g) || g <= 0) {
		throw new Error("g must be a positive integer");
	}
	if (k * g > 64_000_000) {
		throw new Error("k * g must not exceed 64,000,000");
	}

	const checkpoints = [];
	let hash = sha256(seedBytes);

	checkpoints.push(hash);

	for (let segment = 0; segment < k; segment++) {
		for (let iteration = 0; iteration < g; iteration++) {
			hash = sha256(hash);
		}

		checkpoints.push(hash);
	}

	return {
		challengeToken,
		solution: {
			checkpoints: Buffer.concat(checkpoints).toString("base64"),
		},
	};
}
```

Step 3, deploy with the temporary credentials (`account.id`, `account.apiToken`):

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/workers/scripts/$SCRIPT_NAME" \
  -X PUT \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -F 'metadata={"main_module":"worker.mjs","compatibility_date":"<YYYY-MM-DD>"};type=application/json' \
  -F 'worker.mjs=@worker.mjs;type=application/javascript+module'
```

## Options / Props

| Integration | Use when | Provisioning behavior |
| --- | --- | --- |
| `wrangler deploy --temporary` | An AI agent or tool runs Wrangler | Wrangler creates or reuses the account and prints the claim URL |
| REST `POST /client/v4/provisioning/previews` | Your platform backend controls deployment | Backend receives temporary credentials and claim URL |

Challenge response fields: `challengeToken`, `seed` (Base64URL, 32 bytes), `k` (8000 in the example), `g` (2000). Solution: `checkpoint[0] = SHA-256(seed)`; for each of `k` segments compute `g` sequential SHA-256 hashes; concatenate all `k + 1` 32-byte checkpoints; standard Base64 into `solution.checkpoints`.

Create response: `account.{id, name, type, apiToken, tokenId, expiresAt}` and `claim.{token, url, expiresAt}`.

Supported resources with temporary credentials:

| Product | Supported capability or limit |
| --- | --- |
| Workers | Deployments on `workers.dev` |
| Workers Static Assets | Up to 1,000 files, each up to 5 MiB |
| Workers KV | Create, list, rename, delete namespaces; put, get, list, delete keys; bulk put, get, delete |
| D1 | One database, up to 100 MB per database and 100 MB total |
| Durable Objects | Deploy Workers with Durable Object bindings and migrations |
| Hyperdrive | Up to two database configurations and 10 connections |
| Queues | Up to 10 queues |
| mTLS and CA certificates | `wrangler cert` upload, list, and delete |

## Notes

- Claim within 60 minutes (opening the URL is not enough); otherwise Cloudflare deletes the account and its resources. With Wrangler, rerun `--temporary` for a new account and claim URL. Wrangler clears the cached temporary account on `wrangler login` / `wrangler logout` and stores it in the OS user's global config directory (do not share between users).
- `account.apiToken` and `claim.url` are sensitive: keep them in backend storage only, never log them, treat `claim.url` as a bearer credential.
- Limits: proof-of-work required; account creation is rate limited; `--temporary` supports unauthenticated use only (existing OAuth, API token, or global key credentials cause an error); it is not a global flag; unavailable on the FedRAMP High API endpoint; unsupported operations return an authorization error.
- Do not use for production or CI/CD; use a permanent account (`wrangler login` or an API token). Claiming does not give the platform permanent access; use an OAuth client for later deployments.
- The solver is CPU-intensive and blocks the event loop; run it in a worker thread or background job. The source also has TypeScript, TypeScript SDK (`cloudflare` package) variants and a mermaid architecture diagram, omitted here.
- Source quirk: the mermaid fence in the page has no language tag.

## Related

- [get-started-cli.md](./get-started-cli.md)
- [prompting.md](./prompting.md)
- [infrastructure-as-code.md](./infrastructure-as-code.md)
