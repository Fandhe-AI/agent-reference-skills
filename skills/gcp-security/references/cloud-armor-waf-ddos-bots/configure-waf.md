---
source: https://docs.cloud.google.com/armor/docs/configure-waf
---

# Set up preconfigured WAF rules

How to set up and tune Cloud Armor preconfigured web application firewall (WAF) rules with `evaluatePreconfiguredWaf(...)` expressions: sensitivity levels, signature opt-out / opt-in, the request body inspection limit, and a rule that denies bodies larger than the inspection limit. Every example creates a rule at priority `PRIORITY` in security policy `POLICY_NAME`.

## Signature / Usage

### Rule at a sensitivity level

`SENSITIVITY` enables all signatures with sensitivity less than or equal to that value. Use one expression per rule (see Notes).

```bash
gcloud compute security-policies rules create PRIORITY \
    --security-policy POLICY_NAME  \
    --expression "evaluatePreconfiguredWaf('RULE_NAME', {'sensitivity': SENSITIVITY})" \
    --action deny-403
```

### Opt out signatures

The listed signatures are not evaluated.

```bash
gcloud compute security-policies rules create PRIORITY \
    --security-policy POLICY_NAME  \
    --expression "evaluatePreconfiguredWaf('RULE_NAME', {'sensitivity': SENSITIVITY, 'opt_out_rule_ids': ['SIGNATURE_1', 'SIGNATURE_2']})" \
    --action deny-403
```

### Opt in signatures (sensitivity 0 only)

```bash
gcloud compute security-policies rules create PRIORITY \
    --security-policy POLICY_NAME  \
    --expression "evaluatePreconfiguredWaf('RULE_NAME', {'sensitivity': 0, 'opt_in_rule_ids': ['SIGNATURE_1', 'SIGNATURE_2']})" \
    --action deny-403
```

### Set the request body inspection limit

Adapted (not in the official docs): `gcloud compute` changed to `gcloud beta compute`; in gcloud 593.0.0 `--request-body-inspection-size` exists only on the beta and alpha tracks of `security-policies update`.

```bash
gcloud beta compute security-policies update POLICY_NAME \
    --request-body-inspection-size=8kB
```

### Deny requests larger than the inspection limit

Bodies beyond the limit are not inspected. The source suggests a rule that denies requests larger than the inspection limit to help ensure that no uninspected content reaches your backends (8192 bytes = 8 kB). The rule reads only the `Content-Length` request header, so it cannot limit a body whose size isn't declared in that header (for example, chunked transfer encoding); also limit request body size at the backend.

```bash
gcloud compute security-policies rules create 10 \
    --security-policy my-policy \
    --expression "int(request.headers['content-length']) > 8192" \
    --action deny-403 \
    --description "Block requests greater than 8 kB"
```

For the 64 kB limit the source uses `> 65536` and the description `Block requests greater than 64 kB`.

### Concrete examples

Sensitivity 3 for `sqli-v422-stable`:

```bash
gcloud compute security-policies rules create PRIORITY \
    --security-policy POLICY_NAME  \
    --expression "evaluatePreconfiguredWaf('sqli-v422-stable', {'sensitivity': 3})" \
    --action deny-403
```

Sensitivity 2 for `xss-v422-stable`, opting out `owasp-crs-v042200-id941370-xss` (a JavaScript global variables check):

```bash
gcloud compute security-policies rules create PRIORITY \
    --security-policy POLICY_NAME  \
    --expression "evaluatePreconfiguredWaf('xss-v422-stable', {'sensitivity': 2, 'opt_out_rule_ids': ['owasp-crs-v042200-id941370-xss']})" \
    --action deny-403
```

Only `owasp-crs-v042200-id941150-xss` (disallowed HTML attributes, sensitivity level 2) from `xss-v422-stable`:

```bash
gcloud compute security-policies rules create PRIORITY \
    --security-policy POLICY_NAME  \
    --expression "evaluatePreconfiguredWaf('xss-v422-stable', {'sensitivity': 0, 'opt_in_rule_ids': ['owasp-crs-v042200-id941150-xss']})" \
    --action deny-403
```

## Options / Props

| Item | Value |
|------|-------|
| `--request-body-inspection-size` | 8KB, 16KB, 32KB, 48KB, 64KB (beta help; gcloud upper-cases the value, so the source's `8kB` is accepted); applies to all preconfigured WAF rules in the policy |
| Inspected request body | Only the first 64 kB at most (8 / 16 / 32 / 48 / 64 kB depending on the limit) |
| `opt_in_rule_ids` | Allowed only when `'sensitivity': 0` |
| `opt_out_rule_ids` | List of signature names not evaluated |

## Notes

- Use only one expression per rule; combining with `||` is possible but exceeding the maximum expression size is the risk the source warns about.
- The examples use `--action deny-403` and take effect immediately. The gcloud 593.0.0 help for `rules create` has a `--preview` flag; the source recommends testing rules before enforcing (see the preview mode text in the rate limiting and Adaptive Protection pages).
- Console (Advanced mode, Match field) forms of the expressions are omitted; see the source page.
- Corrected from the official docs: `gcloud compute security-policies update POLICY_NAME --request-body-inspection-size=8kB`. The GA `gcloud compute security-policies update` in gcloud 593.0.0 rejects the flag ("unrecognized arguments ... --request-body-inspection-size flag is available in one or more alternate release tracks"); the beta help lists it, so the example uses `gcloud beta`. The flag is a beta feature of gcloud; recheck the GA track when gcloud is updated. The full flag list is in the `gcp-compute` skill.
- The source says the rule helps ensure that no uninspected content reaches backends. The expression `int(request.headers['content-length']) > 8192` evaluates the declared `Content-Length` header only, not the body actually received, so it is a header-based supplementary limit rather than a body-size guarantee.
- Source: https://docs.cloud.google.com/armor/docs/configure-waf (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [rate-limiting-overview.md](./rate-limiting-overview.md)
- [adaptive-protection-overview.md](./adaptive-protection-overview.md)
- [threat-intelligence.md](./threat-intelligence.md)
