# Run bulk security scans

Discover GitHub repositories or run resumable security scans from a CSV inventory using `npx @openai/codex-security bulk-scan`.

## Signature / Usage

GitHub discovery (interactive):

```bash
gh auth login
npx @openai/codex-security bulk-scan
```

Steps: choose personal account or organization → review repositories active within 90 days → search/select repositories → choose results directory → confirm campaign. Discovery excludes archived repositories and forks; selections are recorded in `<output-directory>/repositories.csv`.

GitHub Enterprise Server:

```bash
gh auth login --hostname github.example.com
GH_HOST=github.example.com npx @openai/codex-security bulk-scan
```

CSV inventory:

```csv
id,repository,revision,scope,mode
payments,https://github.com/example/payments.git,0123456789abcdef0123456789abcdef01234567,services/api,standard
identity,https://github.com/example/identity.git,fedcba9876543210fedcba9876543210fedcba98,,deep
```

```bash
npx @openai/codex-security bulk-scan repositories.csv \
  --output-dir /path/outside/repositories/security-scans \
  --workers 4
```

## Options / Props

| Column | Required | Description |
|--------|----------|-------------|
| `id` | Yes | Unique identifier (letters, numbers, `.`, `-`, `_`) |
| `repository` | Yes | HTTPS URL, SSH URL, or local path (relative paths resolve from CSV directory) |
| `revision` | Yes | Full 40- or 64-character Git commit SHA — no branches/tags/short hashes |
| `scope` | No | Repository-relative directory to scan; omit for full repository |
| `mode` | No | `standard` or `deep`; omit to use the command's selected mode |

| Flag | Default | Description |
|------|---------|-------------|
| `--workers` | `4` | Concurrent repository scans |
| `--mode` | — | Mode for rows without their own `mode` |
| `--max-attempts` | `1` | Retries for temporary repository/scan errors |
| `--model` / `--effort` | `gpt-5.6-sol` / `xhigh` | Model and reasoning effort |

## Campaign results

```text
security-scans/
├── manifest.json
├── results.jsonl
├── checkouts/
└── artifacts/
    └── <repo-id>/
        └── attempt-1/
            ├── scan-manifest.json
            ├── findings.json
            ├── coverage.json
            └── report.md
```

A repository counts as complete only when its scan has complete coverage and all required artifacts exist.

Export a single repository's result:

```bash
npx @openai/codex-security export \
  /path/outside/repositories/security-scans/artifacts/payments/attempt-1 \
  --export-format sarif \
  --output /path/outside/repositories/payments.sarif
```

## Resume / retry

Run the original command with the same CSV and output directory to resume; the CLI skips a repository only when its receipt and all required artifacts still exist. Don't change the repository inventory for an existing output directory — use a new output directory instead.

Exit codes: `0` all succeeded, `2` repository/coverage/input error, `130` Ctrl-C, `143` SIGTERM.

## Docker

```bash
docker compose run --rm codex-security \
  bulk-scan /input/repositories.csv \
  --output-dir /output \
  --workers 4
```

Requires a Linux Docker host supporting unprivileged user namespace creation. Supply `GH_TOKEN`/`GITHUB_TOKEN` for private repositories; set `CODEX_SECURITY_GIT_HOST` for GitHub Enterprise Server.

## Notes

- Don't change the repository inventory for an existing output directory — the CLI checks the pinned manifest and rejects a different campaign; use a new output directory when repositories, revisions, scopes, or modes change
- Results can contain source excerpts and vulnerability details; keep the output directory private, outside scanned repositories, and subject to an appropriate retention policy

## Related

- [Codex Security CLI quickstart](./cli-quickstart.md)
- [Codex Security CLI reference](./cli-reference.md)
- [Codex Security CLI FAQ](./cli-faq.md)
