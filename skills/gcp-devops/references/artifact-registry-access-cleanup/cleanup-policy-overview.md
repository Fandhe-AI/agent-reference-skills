---
source: https://docs.cloud.google.com/artifact-registry/docs/repositories/cleanup-policy-overview
---

# Artifact Registry cleanup policies overview

Cleanup policies automate deletion and retention of artifact versions to manage storage cost and preserve releases. Delete policies remove versions you no longer need; keep policies exempt versions from deletion.

## Signature / Usage

Policy file with one delete policy and two keep policies (illustrates delete vs conditional keep vs most-recent-versions keep):

```json
[
  {
    "name": "delete-prerelease",
    "action": {"type": "Delete"},
    "condition": {
      "tagState": "tagged",
      "tagPrefixes": ["alpha", "v0"],
      "olderThan": "30d"
    }
  },
  {
    "name": "keep-tagged-release",
    "action": {"type": "Keep"},
    "condition": {
      "tagState": "tagged",
      "tagPrefixes": ["release"],
      "packageNamePrefixes": ["webapp", "mobile"]
    }
  },
  {
    "name": "keep-minimum-versions",
    "action": {"type": "Keep"},
    "mostRecentVersions": {
      "packageNamePrefixes": ["webapp", "mobile", "sandbox"],
      "keepCount": 5
    }
  }
]
```

## Options / Props

| Item | Value |
|---|---|
| Delete policy | Minimum or maximum age for deletion plus optional filters. |
| Conditional keep policy | Criteria for retaining artifacts that delete policies would otherwise remove. |
| Keep most recent versions | Keep a number of versions. Cannot be combined with Conditional keep criteria in the same cleanup policy. |
| Max policies per repository | 10 |
| Deletion limit | 600,000 deletions per repository, per day; counts against the per-project delete request quota. |
| Supported repositories | Standard and remote repositories, all formats. |
| Schedule | Background job runs periodically; changes take effect within approximately one day (dry runs and active runs). |

## Notes

- A keep policy only exempts artifacts; it does not delete anything. To delete artifacts outside the keep parameters, add at least one delete policy.
- Priority: if a version matches both a delete and a keep policy, the keep policy wins. If it matches several delete policies, the one with the shortest retention period applies (for example `commit-` tags after 24 hours beat all tagged images after seven days).
- Order example: policies (1) delete images older than 100 days, (2) keep version prefix 2.0.6, (3) delete images with a `default` tag. Image A (120 days, `default`, 2.0.1) is deleted; Image B (150 days, `default`, 2.0.6) is kept by the keep policy; Image C (20 days, `patch`, 1.9.2) is kept.
- For `gcr.io` repositories, the original Container Registry upload date is preserved only if you used the automatic migration tool; with other copy tooling the creation time is the date copied to Artifact Registry.
- Repository attachments are not subject to cleanup policies; they are deleted when the image they are attached to is deleted.
- Deletion is irreversible. Run a dry run first and try policies on a disposable project.
- Snippet taken from https://docs.cloud.google.com/artifact-registry/docs/repositories/cleanup-policy
- Source: https://docs.cloud.google.com/artifact-registry/docs/repositories/cleanup-policy-overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [cleanup-policy.md](./cleanup-policy.md)
- [protect-artifacts.md](./protect-artifacts.md)
