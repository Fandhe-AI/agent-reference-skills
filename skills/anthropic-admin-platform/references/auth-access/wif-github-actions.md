<!-- source: https://platform.claude.com/docs/en/manage-claude/wif-providers/github-actions / last verified: 2026-08-07 -->

# Use WIF with GitHub Actions

Authenticate GitHub Actions workflows to the Claude API with short-lived identity tokens instead of long-lived API keys, using GitHub's hosted issuer at `https://token.actions.githubusercontent.com`.

## Signature / Usage

```yaml
permissions:
  id-token: write
  contents: read

steps:
  - name: Fetch GitHub OIDC token
    run: |
      curl -sS -H "Authorization: Bearer $ACTIONS_ID_TOKEN_REQUEST_TOKEN" \
        "$ACTIONS_ID_TOKEN_REQUEST_URL&audience=https://api.anthropic.com" \
        | jq -r .value > /tmp/gha-jwt
```

## Options / Props

| `sub` claim form | Trigger |
|-------------------|---------|
| `repo:<owner>/<repo>:ref:refs/heads/<branch>` | Push to a branch |
| `repo:<owner>/<repo>:pull_request` | Pull-request run |
| `repo:<owner>/<repo>:environment:<name>` | Environment-gated deployment |

## Notes

- Claude API WIF for GitHub Actions; distinct from OpenAI's own `wif-github-actions.md` under `openai-platform-ops`.
- Requires `id-token: write` permission at the workflow or job level. Fetch via `ACTIONS_ID_TOKEN_REQUEST_URL`/`ACTIONS_ID_TOKEN_REQUEST_TOKEN`, or `actions/github-script`'s `core.getIDToken(audience)`.
- Token also carries `repository`, `repository_owner`, `ref`, `sha`, `workflow`, `actor`, `event_name` — matchable via `claims`.
- Each GitHub-issued token expires roughly 5 minutes after issuance; the request endpoint stays valid for the whole job, so re-fetch as needed (or wrap in a background loop) for long-running jobs.
- Scoping warning: `subject_prefix` of `repo:your-org/*` alone matches every repo in the org, and without a `ref` constraint also matches `pull_request` runs from forks. Pin to a single repo (`repo:your-org/your-repo:*`), add `claims.ref` for a protected branch, and add `claims.repository_owner` as defense in depth.

## Related

- [workload-identity-federation.md](./workload-identity-federation.md)
- [authentication.md](./authentication.md)
