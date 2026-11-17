---
source: https://docs.cloud.google.com/security-command-center/docs/how-to-investigate-threats
---

# Investigate and respond to threats

How to handle a threat finding in Security Command Center (Standard-legacy, Standard, Premium, and Enterprise (Deprecated) service tiers, except where a section says Premium and Enterprise only): review the finding, consult investigation guidance, identify related risks, then respond and manage the finding lifecycle.

## Signature / Usage

### Find related vulnerability and misconfiguration findings

Copy an attribute from the threat finding (for example the principal email) and filter the Findings page with it; `USER_EMAIL` is the placeholder for the copied address. Then use Quick filters > Finding class (for example `Vulnerability` and `Misconfiguration`) to narrow the results.

```text
access.principal_email="USER_EMAIL"
```

### Create a mute rule for a persistent false positive

The gcloud help example filters on the category `XSS_SCRIPTING`; replace the `--filter` expression with the category of the recurring false positive. `--type` defaults to `static` and is immutable after creation; `--expiry-time` applies only to dynamic configs.

```bash
gcloud scc muteconfigs create test-mute-config \
    --organization=123 --description="This is a test mute config" \
    --filter="category=\"XSS_SCRIPTING\""
```

## Options / Props

### Investigation workflow

| Step | Tiers | Detail |
|---|---|---|
| Before you begin | Standard-legacy, Standard, Premium, Enterprise (Deprecated) | Need IAM roles to view or edit findings and logs and to modify resources; see Security Command Center Access control. |
| Review the finding | Standard-legacy, Standard, Premium, Enterprise (Deprecated) | Findings page > Quick filters (for example Source display name: Event Threat Detection or Container Threat Detection) > open the finding under Category; the JSON tab shows its JSON definition. Findings carry resource names and numeric IDs, environment variables and asset properties, and links to MITRE ATT&CK entries and VirusTotal (the VirusTotal Indicator field, if available). |
| Consult investigation guidance | Premium, Enterprise (Deprecated) | Informal guidance in the Threat findings index; also high-level response recommendations for AI, Cloud Run, Compute Engine, GKE, Google Workspace and network threat findings. |
| Threats dashboard | Premium, Enterprise (Deprecated) | Threats page (Risk Overview): New threats over time (default range seven days), Top Threats (by severity `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`; by category; by project). Clicking an element applies filters and opens the Findings page. |
| Identify related risks | Standard-legacy, Standard, Premium, Enterprise (Deprecated) | Filter findings by an attribute copied from the threat (principal email, resource full name). |
| Respond to the threat | Standard-legacy, Standard, Premium, Enterprise (Deprecated) | Remediate yourself, then manage state and muting (below). |

### Finding state and muting

| Situation | Action |
|---|---|
| Issue resolved | Security Command Center does not set the state to `INACTIVE`; a threat finding stays `ACTIVE` until you manually change it. |
| False positive | Consider leaving the finding `ACTIVE` and mute it instead. |
| Persistent or recurring false positives | Create a mute rule to reduce the number of findings to manage. |
| True threat | Before setting `INACTIVE`, eliminate the threat and complete a thorough investigation of the detected threat, the extent of the intrusion and related findings and issues. |

## Notes

- Security Command Center provides no official remediation guidance for threat findings (unlike vulnerability and misconfiguration findings): threats are dynamic and indicate a possible active exploit, so a recommendation (for example quarantining a container for `Added Binary Executed`, or lowering permissions for `Brute Force: SSH`) might not address the root cause. The informal guidance is not guaranteed to be effective against any past, current or future threat. Security Command Center does not provide recommendations for findings from Event Threat Detection custom modules, because your organization defines those actions.
- VirusTotal is a separately priced offering with its own usage limits and features; you are responsible for its API usage policies and costs. VirusTotal might not contain hashes for all malware variants.
- The source says that in the Enterprise (Deprecated) service tier, threat findings matching specific criteria appear as Correlated Threats (Preview), which provide remediation recommendations mapped to MITRE ATT&CK tactics. The Correlated Threats page lists Premium and Enterprise (Deprecated); both are kept as written.
- Muting reduces the number of findings you have to manage and is not a remediation; a broad mute filter can hide real threats, so try a new mute rule with a narrow filter on a disposable project first.
- Snippet taken from https://docs.cloud.google.com/security-command-center/docs/how-to-use-event-threat-detection (the `access.principal_email` query of the Findings page query editor).
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/scc/muteconfigs/create (gcloud 593.0.0 help); all its examples use the Web Security Scanner category `XSS_SCRIPTING`.
- The Security Command Center Enterprise service tier will shut down on May 21, 2027; an organization using it automatically moves to the Premium service tier on or after that date.
- Source: https://docs.cloud.google.com/security-command-center/docs/how-to-investigate-threats (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview-threats.md](./overview-threats.md)
- [correlated-threats-overview.md](./correlated-threats-overview.md)
- [how-to-use-event-threat-detection.md](./how-to-use-event-threat-detection.md)
