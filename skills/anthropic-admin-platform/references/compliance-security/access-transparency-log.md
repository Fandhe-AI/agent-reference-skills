<!-- source: https://platform.claude.com/docs/en/manage-claude/access-transparency-log / last verified: 2026-10-17 -->

# Verify Access Transparency events with the transparency log (beta)

Cryptographically verify that no Access Transparency event (`anthropic_access`, `cmek_preserve`) was removed or altered after being committed to your organization's append-only, signed transparency log. Beta: endpoints and response shapes may change. Part of Access Transparency (eligible customers on request, not self-serve). Read through the Compliance API with the same key and scope as the Activity Feed (`read:compliance_activities`).

## Signature / Usage

```bash
curl --fail-with-body -sS \
  "https://api.anthropic.com/v1/compliance/transparency_log/checkpoint" \
  --header "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY" \
  --header "anthropic-version: 2023-06-01"
```

Run the open-source verifier (Go 1.26+) on your own infrastructure, at least daily:

```bash
go install github.com/anthropics/axt-verify/cmd/axt-verify@latest

export ANTHROPIC_COMPLIANCE_ACCESS_KEY="<your Compliance Access Key>"
axt-verify --org 25f6429a-3293-49bf-afed-cb312911554b \
  --state /var/lib/axt-verify/25f6429a-3293-49bf-afed-cb312911554b.state \
  run
```

## Options / Props

Six read-only endpoints under `https://api.anthropic.com/v1/compliance/transparency_log/`:

| Endpoint | Returns |
| --- | --- |
| `GET /checkpoint` | Latest signed checkpoint (`text/plain`, C2SP signed note) |
| `GET /keys` | Verifier key set (`type: transparency_log_keys`, `origin`, `log_keys[]`) |
| `GET /inclusion?leaf_index={index}` | Inclusion proof for one event (`hashes`, `checkpoint`) |
| `GET /consistency?from={size}` | Consistency proof from a held checkpoint's tree size to the latest (`hashes`, `checkpoint`) |
| `GET /tile/{level}/{index}` | Merkle hash tile (concatenated 32-byte SHA-256 hashes) |
| `GET /tile/entries/{index}` | Entry bundle (leaf bytes, each prefixed with a big-endian `uint16` length) |

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `leaf_index` | integer, required (inclusion) | The `transparency_log_leaf_index` served on the event; zero or greater |
| `from` | integer, required (consistency) | Tree size of the earlier checkpoint you hold; at least 1, at most the latest tree size |
| `organization_id` | string, optional | `org_...` tagged ID or organization UUID. Optional for an organization key (must be its own); required for a parent-organization key, naming one child |

`log_keys[]` fields:

| Field | Type | Description |
| --- | --- | --- |
| `verifier_key` | string | `<origin>+<key_hash>+<base64 key>` C2SP note-verifier string (algorithm byte `0x02` + DER public key) |
| `key_hash` | string | 8 lowercase hex digits; first four bytes of `fingerprint`; selects the key for a signature line (not an identity) |
| `fingerprint` | string | 64 hex digits: SHA-256 of the DER `SubjectPublicKeyInfo` |
| `algorithm` | string | Currently `ecdsa_p256_sha256`; skip unsupported values |
| `public_key` | string | Base64 DER `SubjectPublicKeyInfo` |

Errors (standard Compliance API envelope):

| Status | Meaning |
| --- | --- |
| `400` | Malformed or omitted `organization_id` (parent key), Compliance API not enabled, unknown query parameter, or per-endpoint validation failure |
| `401` | API key missing or not valid |
| `403` | Key lacks the required scope |
| `404` | No log readable by this key, or the per-endpoint "not covered" / "beyond the tree" cases |
| `429` | Rate limited (shared per-parent-organization limit); honor `retry-after` |
| `503` | Log temporarily unavailable; retry with backoff |

`axt-verify` exit status:

| Code | Meaning |
| --- | --- |
| `0` | Nothing failed (not-logged events reported; pending events in `run` are not failures) |
| `1` | Verification failure, a security finding: report to your Anthropic account representative or support, keep state file and output |
| `2` | Usage or configuration error (bad flag, missing `ANTHROPIC_COMPLIANCE_ACCESS_KEY`, 401/403 before any checkpoint verified, unreadable state or wrong-origin state file) |
| `3` | Run could not complete (pending event not yet covered, network/rate-limit/server errors, unexpected response, state file write failure); run again |

Published key fingerprints (as of the source page):

| Key hash | SHA-256 fingerprint | Algorithm | Signing since | Status |
| --- | --- | --- | --- | --- |
| `1dff5fe4` | `1dff5fe420d49743fe444a04fc17f818eea856699dec2ebbc24df15602c74a58` | `ecdsa_p256_sha256` | 2026-08-17 | Current signing key |

## Notes

- Log origin is `axt.anthropic.com/<your organization UUID>`; take the UUID from the Claude Console Organization page and derive the origin yourself, never from an API response. One log per organization; follows the C2SP tlog-tiles format.
- Your log is created when the first Access Transparency event is recorded after enablement; until then every transparency log endpoint returns `404`. Disenrollment deletes nothing; the same log continues if re-enabled. Anthropic never deletes entries; endpoints are read-only.
- Each event on the Activity Feed carries `transparency_log_leaf_index` (absent, not `null`, when no leaf). It is a pointer, not a proof; verify inclusion. Index-less events occur only while not enrolled or for events recorded before the log was created.
- Events enter the log before the feed serves them, so an entry can briefly precede its event on the feed (not a discrepancy). Events appear within two business days of the access. An inclusion proof 404 shortly after an event is served is transient; retry. Unavailable a day later is the anomaly to escalate.
- It proves committed fields are unchanged and the log is append-only. It does not prove every access was recorded or that a record is accurate; fields outside the leaf (e.g. `workspace_uuid`) are not covered. Beta; not designed or certified to satisfy any security, privacy, or regulatory requirement.
- A leaf is the schema-version byte `0x01` plus RFC 8785 canonical JSON of 11 fields: `id`, `type`, `created_at`, `accessed_at`, `organization_id`, `organization_uuid`, `workspace_id`, `accessor_department`, `reason_code`, `actor` (`type`, `email_address`), `resource_details` (`type`, `id`, `parent`). Omitted documented fields enter as `null`; `actor.email_address` and `resource_details.parent` are always `null` under `0x01`. Leaf hash is `SHA-256(0x00 || entry)`; interior nodes are `SHA-256(0x01 || left || right)`. The page includes a test vector for your canonicalization code.
- Checkpoint signature: the first four bytes of the decoded signature are the `key_hash`; the rest is an ASN.1 DER ECDSA P-256 signature over the SHA-256 of the note body (everything before the blank line). Ignore unknown extra lines and signature lines for other origins or unknown key hashes. Never cache a checkpoint.
- Key rotation is announced in the fingerprints table at least 30 days before the switch date. A key not listed in that table is not legitimate whatever `GET /keys` returns. Each `axt-verify` release carries exactly one key; upgrade on the switch date (old release after the switch, or new release before it, exits `1`).
- Verification run order: fetch and fingerprint-filter keys; establish latest checkpoint (first run via `/checkpoint`, later runs via `/consistency` from the saved size); check the origin line byte for byte; verify signature; prove append-only (smaller size fails, equal size needs equal root, larger needs RFC 9162 consistency proof); prove each event's inclusion; re-check previously seen events; save the checkpoint and verified event records.
- Caching: responses are `private` with `Vary: x-api-key`; no shared cache. Full tiles and full entry bundles are `private, max-age=604800, immutable`; everything else is `private, no-store`.
- Entry bundles contain event plaintext, so the whole surface needs the Activity Feed scope; any key that can read your Activity Feed can read your whole log. The proof endpoints are conveniences; all proofs are computable from tiles.
- `axt-verify run` re-reads events starting seven days (`--overlap`) before the newest event previously read; `axt-verify checkpoint` does checkpoint and append-only steps only; `axt-verify events FILE` verifies exported events without touching the feed or state; `--save FILE`, `--from FILE`, `--from-trusted` support your own checkpoint archive. With a parent-organization key, run one copy per child organization (own `--org` and `--state`).

## Related

- [access-transparency.md](./access-transparency.md)
- [compliance-activity-feed.md](./compliance-activity-feed.md)
- [compliance-api.md](./compliance-api.md)
- [compliance-errors.md](./compliance-errors.md)
- [cmek.md](./cmek.md)
