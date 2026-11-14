# Copilot Code Review API

Endpoints to read and update Copilot code review policy, runner configuration and settings at enterprise, organization and repository level.

公式ドキュメント: https://docs.github.com/en/rest/copilot/copilot-code-review

## Signature / Usage

| Method | Path | Description |
|---|---|---|
| GET | `/enterprises/{enterprise}/copilot/policies/code-review` | Get the enterprise policy |
| PUT | `/enterprises/{enterprise}/copilot/policies/code-review` | Set the enterprise policy |
| GET | `/orgs/{org}/copilot/policies/code-review` | Get the organization policy (configured and effective) |
| PUT | `/orgs/{org}/copilot/policies/code-review` | Set the organization policy |
| GET | `/orgs/{org}/copilot/code-review/runner` | Get the organization runner configuration |
| PUT | `/orgs/{org}/copilot/code-review/runner` | Set the organization runner configuration |
| GET | `/orgs/{org}/copilot/code-review/settings` | Get organization settings (default review effort) |
| PATCH | `/orgs/{org}/copilot/code-review/settings` | Update organization settings |
| GET | `/repos/{owner}/{repo}/copilot/code-review/settings` | Get repository settings |
| PATCH | `/repos/{owner}/{repo}/copilot/code-review/settings` | Update repository settings |

Send `X-GitHub-Api-Version: 2026-03-10` (the official curl examples omit this header).

```curl
curl -L \
  -X PUT \
  https://api.github.com/orgs/ORG/copilot/code-review/runner \
  -d '{
  "runner_type": "labeled",
  "runner_labels": [
    "copilot-review"
  ],
  "runner_group_name": "copilot-runners",
  "allow_repository_customization": false
}'
```

## Options / Props

| Endpoint | Body / response fields |
|---|---|
| enterprise policy | `policy_state`: `enabled_for_all_organizations` / `disabled_for_all_organizations` / `configured_by_organization_admins` |
| organization policy | PUT body `enabled` / `disabled`. GET returns `configured_state`, `effective_state`, `managed_by` (`enterprise` / `organization`) |
| organization runner | `runner_type` (`standard` / `labeled`), `runner_labels`, `runner_group_name`, `allow_repository_customization`; GET also returns `configured_by` (`code_review` / `coding_agent`) |
| organization settings | `default_review_effort` (`inherit` clears the organization value); GET also returns `available_review_efforts` |
| repository settings | `review_effort` (`inherit` clears it), `severity_filter` (`no_filter` / `low` / `low_and_medium`), `custom_instructions_enabled`, `mcp_enabled` |

## Notes

- Authorization: enterprise endpoints need an enterprise owner or the `read_enterprise_ai_controls` / `write_enterprise_ai_controls` permission; OAuth app tokens and classic PATs need `read:enterprise` (read) or `admin:enterprise` (write); GitHub App tokens and fine-grained PATs are not supported. Organization endpoints need an organization owner (`manage_billing:copilot`, or `read:org` / `admin:org`). Repository endpoints need a repository administrator (`repo` scope)
- Until an organization saves a runner configuration, GET reports the values inherited from the Copilot coding agent runner configuration with `configured_by: coding_agent`; after a successful PUT it becomes `code_review`
- A `labeled` runner requires at least one label in `runner_labels` or a `runner_group_name`; a `standard` runner accepts neither
- Repository settings do not enable Copilot code review, and can be stored while an enterprise or organization policy disables it
- Organization settings PATCH fails with `409` and code `SETTING_NOT_EDITABLE` when the organization cannot change a submitted setting. The whole request is validated before any change, so invalid input changes nothing
- For cloud agent configuration see `coding-agent-management.md`; for usage reports see `usage-metrics.md`
- Source: https://docs.github.com/en/rest/copilot/copilot-code-review (Article Body API, fetched 2026-11-14)

## Related

- [coding-agent-management.md](./coding-agent-management.md)
- [usage-metrics.md](./usage-metrics.md)
