---
source: https://docs.cloud.google.com/security-command-center/docs/how-to-mute-findings
---

# Mute findings in Security Command Center

Muting hides a finding from the default view in the Google Cloud console. You can mute findings manually or programmatically, or create static or dynamic mute rules (mute configs) that silence existing and future findings. Applies to Standard-legacy, Standard, Premium, and Enterprise (Deprecated) tiers.

## Signature / Usage

### Create a mute config

The help's default `--type` is `static`; the help also accepts `--type=dynamic` (immutable after creation).

```bash
gcloud scc muteconfigs create test-mute-config \
    --organization=123 --description="This is a test mute config" \
    --filter="category=\"XSS_SCRIPTING\""
```

### Mute or unmute one finding

```bash
gcloud scc findings set-mute 789 \
    --organization=organizations/123 --source=456 --mute=MUTED
```

```bash
gcloud scc findings set-mute 789 \
    --organization=organizations/123 --source=456 --mute=UNMUTED
```

## Options / Props

### Static vs dynamic mute rules

| Static mute rules | Dynamic mute rules |
|---|---|
| Indefinitely act on findings. | Act temporarily with an expiration time, or indefinitely if no expiration is set. |
| Don't apply to existing findings (except when created in the Google Cloud console, which retroactively mutes existing ones). | Apply to existing and new findings. |
| Take precedence over dynamic mute rules. | Lower priority; overridden by static rules when both apply. |

### Finding properties related to muting

| Property | Meaning |
|---|---|
| `mute` | `UNDEFINED` at creation; `MUTED` when muted manually or by a rule; `UNMUTED` when a user unmutes. |
| `muteUpdateTime` | When the finding was muted or unmuted. |
| `muteInitiator` | Principal or mute rule that muted the finding. |
| `muteInfo` | Mute rule type and which rules matched. |
| `muteInfo.staticMute` | Static mute state (`state`, `applyTime`); overrides any dynamic rules. |
| `muteInfo.dynamicMuteRecords` | Records of matching dynamic rules (`muteConfig`, e.g. `organizations/123/muteConfigs/examplemuteconfig`; `matchTime`). |

### Scope and roles

| Item | Detail |
|---|---|
| Role scope | Organization-level roles see rules for all folders and projects; folder-level roles manage rules for that folder and subfolders / projects; project-level roles manage rules in specific projects. |
| Tier support | Premium supports roles at organization, folder and project levels; Standard only at the organization level. |
| Data residency | If enabled, a rule applies only to the Security Command Center location in which it is created (a rule created in `us` doesn't mute findings stored in `eu`); the location can't be changed after creation (delete and recreate). |

## Notes

- Using static and dynamic rules together isn't recommended: static rules override dynamic ones. Unless you already use static rules, use dynamic rules exclusively; migration guidance is in "Migrate from static to dynamic mute rules".
- When a dynamic rule expires, Security Command Center removes the rule from the finding; if no other dynamic rule matches, `mute` resets to `UNDEFINED`.
- Muting has advantages over disabling detectors: custom filters, temporary or indefinite muting, and assets are still scanned (findings are generated but hidden).
- A rule filter written for `Project A` but created under `Project B` might not match any findings.
- `SCC error` class findings can't be muted. Muting a finding doesn't exclude it from the **Compliance** page or compliance reports.
- Mute rules don't support all finding properties; see "Unsupported finding properties for mute rules".
- Mute rules hide findings from review and can suppress real issues: a static rule mutes indefinitely. Try rules on a disposable project or narrow filter first and review muted findings periodically (query `mute="MUTED"`).
- Snippets taken from https://docs.cloud.google.com/sdk/gcloud/reference/scc/muteconfigs/create and https://docs.cloud.google.com/sdk/gcloud/reference/scc/findings/set-mute (gcloud 593.0.0 help). With no `--location`, the help says the request goes to the SCC V1 API; pass `--location` to use the V2 API.
- Source: https://docs.cloud.google.com/security-command-center/docs/how-to-mute-findings (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [finding-lifecycle-overview.md](./finding-lifecycle-overview.md)
- [review-manage-findings.md](./review-manage-findings.md)
- [how-to-build-findings-query-console.md](./how-to-build-findings-query-console.md)
