# Automation

Run Codex headlessly in scripts, CI pipelines, and GitHub Actions.

## Basic non-interactive invocation

```bash
codex exec "summarize the repository structure and list the top 5 risky areas"
```

Progress streams to stderr while only the final agent message goes to stdout, so output pipes cleanly.

```bash
codex exec "generate release notes for the last 10 commits" | tee release-notes.md
```

## Sandbox / permission levels

`codex exec` defaults to read-only mode. Use the least permission needed for the workflow.

```bash
codex exec --sandbox workspace-write "<task>"
```

> **警告**: `--sandbox danger-full-access` removes filesystem/network restrictions. Use only in isolated, trusted environments.

```bash
codex exec --sandbox danger-full-access "<task>"
```

## Machine-readable output

```bash
codex exec --json "summarize the repo structure" | jq
```

JSON Lines output captures all events for script consumption.

```bash
codex exec "Extract project metadata" \
  --output-schema ./schema.json \
  -o ./project-metadata.json
```

## Piping input into Codex

```bash
curl -s https://jsonplaceholder.typicode.com/comments \
  | codex exec "format the top 20 items into a markdown table" \
  > table.md
```

```bash
cat prompt.txt | codex exec -
```

Reads the prompt from stdin.

## Resume a session non-interactively

```bash
codex exec resume --last "fix the race conditions you found"
```

> **警告**: For CI/CD, prefer the Codex GitHub Action over passing API keys directly, and never set credentials as job-level environment variables in workflows that check out repository code.

## GitHub Action: PR review workflow

`openai/codex-action@v1` installs the Codex CLI, starts the Responses API proxy when given an API key, and runs `codex exec` under the permissions specified. This example workflow (from the official docs) reviews new pull requests and posts the result as a comment.

```yaml
name: Codex pull request review
on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  codex:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    outputs:
      final_message: ${{ steps.run_codex.outputs.final-message }}
    steps:
      - uses: actions/checkout@v5
        with:
          ref: refs/pull/${{ github.event.pull_request.number }}/merge
          fetch-depth: 0
          persist-credentials: false

      - name: Run Codex
        id: run_codex
        uses: openai/codex-action@v1
        with:
          openai-api-key: ${{ secrets.OPENAI_API_KEY }}
          prompt-file: .github/codex/prompts/review.md
          output-file: codex-output.md

  post_feedback:
    runs-on: ubuntu-latest
    needs: codex
    if: needs.codex.outputs.final_message != ''
    permissions:
      issues: write
      pull-requests: write
    steps:
      - name: Post Codex feedback
        uses: actions/github-script@v7
        with:
          github-token: ${{ github.token }}
          script: |
            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.payload.pull_request.number,
              body: process.env.CODEX_FINAL_MESSAGE,
            });
        env:
          CODEX_FINAL_MESSAGE: ${{ needs.codex.outputs.final_message }}
```

Replace `.github/codex/prompts/review.md` with your own prompt file, or use the `prompt` input for inline text instead of `prompt-file`.

Prerequisites:
- Store the OpenAI API key as a GitHub secret (e.g. `OPENAI_API_KEY`) and reference it in the workflow
- Run the job on a Linux or macOS runner; Windows requires `safety-strategy: unsafe`
- Check out the repository before invoking the action

Key inputs that map to `codex exec` options:

| Input | Purpose |
| --- | --- |
| `prompt` / `prompt-file` | Inline instructions or a repository path to the task text (choose one) |
| `codex-args` | Extra CLI flags as a JSON array (`["--ephemeral"]`) or shell string (`--profile ci`) |
| `model` / `effort` | Codex agent configuration; leave empty for defaults |
| `sandbox` | `workspace-write`, `read-only`, or `danger-full-access` |
| `output-file` | Save the final Codex message to disk |
| `codex-version` | Pin a specific CLI release |
| `codex-home` | Point to a shared Codex home directory to reuse config/MCP setups |

Privilege controls:

| Input | Purpose |
| --- | --- |
| `safety-strategy` | Default `drop-sudo` removes `sudo` before running Codex (irreversible for the job). Windows requires `unsafe` |
| `unprivileged-user` | Pairs with `codex-user` to run Codex as a specific unprivileged account |
| `allow-users` / `allow-bots` | Restrict who can trigger the workflow (default: write-access users only) |

> **警告**: Don't rely on `sandbox: read-only` alone to protect secrets — it still runs with elevated privileges unless combined with `safety-strategy`. Never leave `safety-strategy: unsafe` set on multi-tenant runners.

The action emits the final Codex message through the `final-message` output.

## Codex Security scan in CI

Install `@openai/codex-security` outside the repository checkout, then run a diff scan and export SARIF for upload.

```bash
npm install \
  --prefix "$RUNNER_TEMP/codex-security" \
  --ignore-scripts \
  --no-audit \
  --no-fund \
  @openai/codex-security@0.1.3
```

`npm install` does not define `CODEX_SECURITY_BIN` — set it explicitly to the installed binary path before invoking it (matches the CI example in `references/security/cli-ci.md`).

```bash
CODEX_SECURITY_BIN="$RUNNER_TEMP/codex-security/node_modules/.bin/codex-security"

"$CODEX_SECURITY_BIN" scan . \
  --diff "$BASE_REVISION" \
  --head "$HEAD_SHA" \
  --auth api-key \
  --output-dir "$SCAN_DIR" \
  --json > "$RUNNER_TEMP/codex-security.json"
```

```bash
"$CODEX_SECURITY_BIN" export "$SCAN_DIR" \
  --export-format sarif \
  --source-root "$GITHUB_WORKSPACE" \
  --output "$SARIF_FILE"
```

### Enforce a severity policy

```bash
--fail-on-severity high
```

Supported thresholds: `critical`, `high`, `medium`, `low`.

### Exit codes

| Code | Meaning |
| --- | --- |
| `0` | Scan completed successfully, policy passed |
| `1` | Finding detected at or above the severity threshold |
| `2` | Input/runtime error or incomplete coverage |
| `130` | Ctrl-C interrupt |
| `143` | SIGTERM termination |

Requires Node.js 22+, Python 3.10+, the `@openai/codex-security` package installed outside the repository, and an OpenAI API key stored as `CODEX_SECURITY_API_KEY`.
