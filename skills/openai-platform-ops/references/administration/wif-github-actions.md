# WIF: GitHub Actions

Use GitHub Actions as a Workload Identity Provider by exchanging a GitHub-issued OIDC token for a short-lived OpenAI access token, avoiding long-lived API keys in repository secrets.

## Signature / Usage

```yaml
permissions:
  id-token: write
  contents: read
```

```bash
AUDIENCE="https://api.openai.com/v1"
ENCODED_AUDIENCE=$(jq -rn --arg audience "$AUDIENCE" '$audience | @uri')

TOKEN=$(curl -sSf -H "Authorization: bearer $ACTIONS_ID_TOKEN_REQUEST_TOKEN" \
  "${ACTIONS_ID_TOKEN_REQUEST_URL}&audience=${ENCODED_AUDIENCE}" | jq -r .value)
```

## Options / Props

Key claims: `iss` (`https://token.actions.githubusercontent.com`), `aud`, `sub` (built from workflow metadata), `repository`, `repository_owner`, `ref`, `workflow`, `workflow_ref`, `environment`, `run_id`, `run_number`, `run_attempt`, `job_workflow_ref`.

| Mapping key | Recommended use |
|-------------|-------------------|
| `repository` | Restrict to a specific repo |
| `ref` | Restrict to a specific branch/tag |
| `workflow_ref` | Preferred over `workflow` for privileged mappings — pins the exact workflow file path + ref |
| `environment` | Restrict to a GitHub Environment (e.g. `production`) |

## Notes

- Grant only `id-token: write` (and `contents: read` for `actions/checkout`) — `id-token: write` does not grant repo write access.
- Prefer `workflow_ref` over `workflow`: workflow names can be renamed and multiple files can share a name.
- Avoid overly broad mappings such as `repository_owner == "my-org"` alone unless every repo in that owner should be trusted.
- Never grant production credentials to mappings that would match forked-repo pull requests (forks may run attacker-controlled code).
- Store `OPENAI_WIF_AUDIENCE`, `OPENAI_IDENTITY_PROVIDER_ID`, `OPENAI_SERVICE_ACCOUNT_ID` as GitHub Actions variables (not secrets — they identify the mapping, not a bearer credential).

## Related

- [Workload Identity Federation](./workload-identity-federation.md)
