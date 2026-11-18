---
source: https://docs.cloud.google.com/armor/docs/threat-intelligence
---

# Apply Google Threat Intelligence

Cloud Armor Enterprise subscribers can allow or block traffic to external Application Load Balancers by threat-intelligence category with the `evaluateThreatIntelligence('FEED_NAME')` match expression. Feeds are continually updated. The older third-party named IP address lists (`evaluatePreconfiguredExpr('sourceiplist-...')`) are deprecated in favor of these feeds. Both require Cloud Armor Enterprise.

## Signature / Usage

### Rule for a feed

`ACTION` can be `allow`, `deny` or `throttle`.

```bash
gcloud compute security-policies rules create 1000 \
    --security-policy=NAME \
    --expression="evaluateThreatIntelligence('FEED_NAME')" \
    --action="ACTION"
```

### Expressions with a user IP or an exclusion list

Use a User IP address (the second parameter defaults to `origin.ip`):

```text
evaluateThreatIntelligence('iplist-tor-exit-nodes', origin.user_ip)
```

Exclude an address or range from blocking (replace `ADDRESS`):

```text
evaluateThreatIntelligence('iplist-known-malicious-ips', ['ADDRESS'])
```

Both together:

```text
evaluateThreatIntelligence('iplist-known-malicious-ips', origin.user_ip, ['ADDRESS'])
```

### Named IP address lists (deprecated)

`provider-a` is a placeholder for a named list name, such as one returned by the list command below.

Adapted (not in the official docs): named IP address lists are referenced with `evaluatePreconfiguredExpr()`.

```bash
gcloud beta compute security-policies rules create 1000 \
    --security-policy POLICY_NAME \
    --expression "evaluatePreconfiguredExpr('provider-a')" \
    --action "allow"
```

Adapted (not in the official docs): named IP address lists are referenced with `evaluatePreconfiguredExpr()`.

```bash
gcloud beta compute security-policies rules create 750 \
    --security-policy POLICY_NAME \
    --expression "evaluatePreconfiguredExpr('sourceiplist-cloudflare')" \
    --action "allow"
```

List the preconfigured named lists (output: `sourceiplist-fastly`, `sourceiplist-cloudflare`, `sourceiplist-imperva`):

```bash
gcloud compute security-policies list-preconfigured-expression-sets \
    --filter="id:sourceiplist"
```

## Options / Props

### Feed names

| Feed name | Matches |
|-----------|---------|
| `iplist-tor-exit-nodes` | Tor exit nodes' IP addresses |
| `iplist-known-malicious-ips` | IP addresses known to attack web applications |
| `iplist-search-engines-crawlers` | IP addresses of search engine crawlers |
| `iplist-vpn-providers` | Ranges used by low-reputation VPN providers |
| `iplist-anon-proxies` | Ranges of open anonymous proxies |
| `iplist-crypto-miners` | Ranges of crypto mining sites |
| `iplist-cloudflare` | IPv4 and IPv6 ranges of Cloudflare proxy services |
| `iplist-fastly` | IP ranges of Fastly proxy services |
| `iplist-imperva` | IP ranges of Imperva proxy services |
| `iplist-public-clouds` | Public cloud IP addresses |
| `iplist-public-clouds-aws` | Ranges used by Amazon Web Services |
| `iplist-public-clouds-azure` | Ranges used by Microsoft Azure |
| `iplist-public-clouds-gcp` | Ranges used by Google Cloud |

### Named IP address list providers (deprecated)

| Provider | Source URLs | List name |
|----------|-------------|-----------|
| Fastly | `https://api.fastly.com/public-ip-list` | `sourceiplist-fastly` |
| Cloudflare | `https://www.cloudflare.com/ips-v4`, `https://www.cloudflare.com/ips-v6` | `sourceiplist-cloudflare` |
| Imperva | `https://my.imperva.com/api/integration/v1/ips` (requires a `POST`; `curl -d "" https://my.imperva.com/api/integration/v1/ips`) | `sourceiplist-imperva` |

## Notes

- Deprecated: "Google Cloud Armor named IP address lists are deprecated. We recommend that you use Google Threat Intelligence feeds instead."
- Categories: Tor exit nodes, known malicious IPs, search engines (allow for site indexing), VPN providers, anonymous proxies, crypto miners, public cloud ranges (block to avoid malicious automated tools, or allow if your service uses other public clouds).
- Named lists are not subject to the quota on the number of IP addresses per rule, cannot be user-created (only lists from partner third parties), and are synchronized daily; Cloud Armor syncs only when it detects changes in a valid format and does basic syntax validation. In the example, a CDN user allows only the CDN provider's ranges so other source addresses (for example `198.51.100.1`) are blocked.
- Named list availability: with Cloud Armor Enterprise you can create, update and delete rules with named lists in enrolled projects. If the subscription expires or you return to Standard you can only delete such rules or update them to remove the named list. Projects with existing named-list rules that were never enrolled can continue to use, update, delete and create rules with them.
- The source's `gcloud beta` form is kept for named lists (`beta compute security-policies rules create` exists in gcloud 593.0.0). The `allow` rules for `provider-a` and `sourceiplist-cloudflare` allow all traffic from that provider's ranges and are for the stated provider-allowlist purpose only. Blocking feeds such as VPN providers or public clouds can block real clients; the `rules create` command has a `--preview` flag (gcloud 593.0.0 help). The full flag list is in the `gcp-compute` skill.
- Corrected from the official docs: the source references named IP address lists with `evaluatePreconfiguredWaf('provider-a')` / `evaluatePreconfiguredWaf('sourceiplist-cloudflare')`; the Compute Engine API Discovery document (`SecurityPolicyRuleMatcher.expr`) names `evaluatePreconfiguredExpr('sourceiplist-*')` for these lists (Cloud Armor Enterprise, global security policies only).
- Source: https://docs.cloud.google.com/armor/docs/threat-intelligence (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [armor-enterprise-overview.md](./armor-enterprise-overview.md)
- [configure-waf.md](./configure-waf.md)
