---
source: https://docs.cloud.google.com/armor/docs/adaptive-protection-overview
---

# Adaptive Protection overview

Cloud Armor Adaptive Protection uses machine-learning models to detect anomalous Layer 7 traffic (HTTP floods and similar), generate an attack signature, and produce a suggested Cloud Armor WAF rule. It is enabled per security policy and applies to all backend services the policy is attached to. Full alerts (signature and suggested rule) require Cloud Armor Enterprise; otherwise you receive only a basic alert with a confidence score and attack size.

## Signature / Usage

### Example attack signature in an alert

```text
...
headerSignatures: [
  0: {
   name: "Referer"
   significantValues: [
    0: {
     attackLikelihood: 0.95
     matchType: "MATCH_TYPE_EQUALS"
     proportionInAttack: 0.6
     proportionInBaseline: 0.01
     value: "foo.attacker.com"
    }
   ]
  }
...
```

Reading: 60 percent of attack traffic and 1 percent of baseline traffic has this `Referer`; 95 percent of the traffic matching it is attack traffic. Blocking it would block 60 percent of the attack and 1 percent of baseline traffic.

### Substring match example

```text
...
headerSignatures: [
  0: {
   name: "RequestUri"
   significantValues: [
    0: {
     attackLikelihood: 0.95
     matchType: "MATCH_TYPE_CONTAINS"
     proportionInAttack: 0.9
     proportionInBaseline: 0.01
     value: "/api?"
    }
   ]
  }
...
```

### Rule status field in an alert

```text
 ]
ruleStatus: RULE_GENERATED
attackSize: 5000
}
```

### Deploy a suggested rule

Create a rule in the security policy that protects the targeted backend services, paste the expression from the `suggestedRule` section of the alert (for example `evaluateAdaptiveProtection('11275630857957031521')`) into the match condition, and set the action to `deny`. Deploy it in preview mode first.

### Auto-deploy suggested rules

Create a placeholder rule with your chosen priority and action whose match expression is `evaluateAdaptiveProtectionAutoDeploy()`; it evaluates to `true` for requests Adaptive Protection identifies as attack traffic. Actions `allow`, `deny`, `throttle` and `redirect` are supported; preview mode logs without acting.

## Options / Props

### Rule status values

| Rule status | Description |
|-------------|-------------|
| `RULE_GENERATED` | A usable rule was generated normally |
| `BASELINE_TOO_RECENT` | Not enough time to accumulate reliable baseline traffic; up to one hour is necessary to generate rules |
| `NO_SIGNIFICANT_VALUE_DETECTED` | No headers have significant values associated with attack traffic, so no rule could be generated |
| `NO_USABLE_RULE_FOUND` | No usable rule could be created |
| `ERROR` | An unspecified error occurred when creating the rule |

### Alert fields

| Field | Meaning |
|-------|---------|
| `alertId` | Unique ID used to refer to an alert, including when reporting feedback |
| `backendService` | Backend service under attack |
| `confidence` | Number between 0 and 1: how strongly the event is rated an attack |
| `matchType` | `MATCH_TYPE_CONTAINS` or `MATCH_TYPE_EQUALS` |
| `attackLikelihood` / `proportionInAttack` / `proportionInBaseline` | Likelihood a matching request is malicious; share of attack traffic and of baseline traffic with this value |
| `suggestedRule` | `action`, `evaluation` (`impactedAttackProportion`, `impactedBaselineProportion`, `impactedBaselinePolicyProportion`) and `expression` |
| `attackSize` | Queries per second (QPS) |

### Granular model thresholds

| Option | Applies to |
|--------|-----------|
| Load (maximum load per the configured Application Load Balancer) | Backend service only; not available for granular traffic units or serverless backends such as Cloud Run, Cloud Run functions, or external origin backends |
| Absolute QPS (peak queries per second) | Backend service or granular traffic unit |
| Relative to baseline QPS (multiple of the long-term baseline; `2` is double) | Backend service or granular traffic unit |

### Permissions to use the dashboard

| Permission |
|------------|
| `compute.securityPolicies.list` |
| `compute.backendServices.list` |
| `logging.logEntries.list` |

## Notes

- Required logs, stored in Cloud Logging or routed to a logging bucket Cloud Armor can access: `networksecurity.googleapis.com/dos_attack`, `networksecurity.googleapis.com/network_dos_attack`, `networksecurity.googleapis.com/network_dos_attack_mitigations`.
- Training period of at least one hour after enabling before alerts are generated. Creating a new security policy discards the old baseline and Adaptive Protection must re-train; do not create new security policies during an attack.
- Not counted by Adaptive Protection: requests served directly from Cloud CDN and requests rejected by a Cloud Armor security policy.
- Recommended: deploy suggested rules in preview mode first, check effects on every backend service the policy is attached to, and give the rule a higher priority than rules with the `allow` action; allow exceptions with a higher-priority `allow` rule (lower number). The `deny` rule affects production traffic once enforced.
- For granular models, a match condition such as `evaluateAdaptiveProtectionAutoDeploy() && request.headers['host'] == ... && request.path == ...` restricts an auto-deployed rule to a traffic unit (the source gives it inline with `...`; fill in your own values).
- Behind an upstream proxy such as a third-party CDN, configure the `userIpRequestHeaders` field so the proxy's address is not mistaken for an attacker.
- Alerts also appear as Security Command Center findings in the Cloud Armor card under the Application DDoS Attacks category (see the `gcp-security-compliance` skill). Suggested alerting-policy threshold: start with `confidence > 0.5`, and raise it if the impacted baseline rate is unacceptable.
- Machine learning and privacy: models use derived statistical properties, not raw IPs or header values; a common model trained only on artificial data is shared at first, and after you report a false attack event the models become local to your projects.
- You can report an event error from the dashboard to train the models.
- The `ruleStatus` / `attackSize` example above is a fragment of an alert and is shown as `text`; the full log payload example in the source (alertId, headerSignatures, suggestedRule, resource labels) is omitted.
- Console dashboard steps (Network Security, Cloud Armor, **Apply**) are omitted; see the source page.
- Source: https://docs.cloud.google.com/armor/docs/adaptive-protection-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [configure-waf.md](./configure-waf.md)
- [armor-enterprise-overview.md](./armor-enterprise-overview.md)
- [rate-limiting-overview.md](./rate-limiting-overview.md)
