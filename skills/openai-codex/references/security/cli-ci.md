# Run Codex Security in CI

Run the Codex Security CLI in CI to review the exact changes in a pull request or merge request, keep findings and coverage, upload SARIF, and optionally fail the check at a chosen severity. Start with advisory results, review scan quality and runtime, then add a severity policy. The public `@openai/codex-security` package is installed from npm; running scans still requires Codex Security access. This page gives a GitHub Actions workflow; for GitLab use [Run Codex Security in GitLab CI/CD](./cli-ci-gitlab.md). The same scan and export commands work in other CI systems.

## Signature / Usage

Store an OpenAI API key as the secret `CODEX_SECURITY_API_KEY` and map it directly to the scan step's `OPENAI_API_KEY` (scoped to the scan process; select it with `--auth api-key`). Run only for repositories and pull requests you trust: scans use the runner's local permissions, don't pause for approval, and can inherit the job environment (keep unrelated tokens and cloud credentials out). The runner needs Node.js 22 (22.13.0 or later), 24, or 26; Python 3.10+; `@openai/codex-security` installed outside the repository checkout; and PR head and base history so Git can calculate the merge base. For private or internal repositories, enable GitHub Code Security before uploading SARIF.

```yaml
name: Codex Security scan

on:
  pull_request:

jobs:
  codex-security:
    if: github.event.pull_request.head.repo.full_name == github.repository && github.actor != 'dependabot[bot]'
    runs-on: ubuntu-latest
    permissions:
      actions: read
      contents: read
      security-events: write
    steps:
      - name: Set up Node.js
        uses: actions/setup-node@820762786026740c76f36085b0efc47a31fe5020 # v7
        with:
          node-version: "26"

      - name: Set up Python
        uses: actions/setup-python@5fda3b95a4ea91299a34e894583c3862153e4b97 # v7
        with:
          python-version: "3.14"

      - name: Install Codex Security
        run: |
          set -euo pipefail
          npm install \
            --prefix "$RUNNER_TEMP/codex-security" \
            --ignore-scripts \
            --no-audit \
            --no-fund \
            @openai/codex-security

      - name: Verify Codex Security
        env:
          CODEX_SECURITY_BIN: ${{ runner.temp }}/codex-security/node_modules/.bin/codex-security
        run: |
          set -euo pipefail
          test -x "$CODEX_SECURITY_BIN"
          "$CODEX_SECURITY_BIN" --version

      - name: Check out the pull request
        uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7
        with:
          ref: ${{ github.event.pull_request.head.sha }}
          fetch-depth: 0
          persist-credentials: false

      - name: Scan the pull request
        env:
          OPENAI_API_KEY: ${{ secrets.CODEX_SECURITY_API_KEY }}
          CODEX_SECURITY_BIN: ${{ runner.temp }}/codex-security/node_modules/.bin/codex-security
          CODEX_SECURITY_STATE_DIR: ${{ runner.temp }}/codex-security-state
          BASE_SHA: ${{ github.event.pull_request.base.sha }}
          HEAD_SHA: ${{ github.event.pull_request.head.sha }}
          SCAN_DIR: ${{ runner.temp }}/codex-security-results
        run: |
          set -euo pipefail
          BASE_REVISION="$(git merge-base "$BASE_SHA" "$HEAD_SHA")"
          "$CODEX_SECURITY_BIN" scan . \
            --diff "$BASE_REVISION" \
            --head "$HEAD_SHA" \
            --auth api-key \
            --output-dir "$SCAN_DIR" \
            --json > "$RUNNER_TEMP/codex-security.json"

      - name: Export SARIF
        id: export-sarif
        if: always()
        env:
          CODEX_SECURITY_BIN: ${{ runner.temp }}/codex-security/node_modules/.bin/codex-security
          SCAN_DIR: ${{ runner.temp }}/codex-security-results
          SARIF_FILE: ${{ runner.temp }}/codex-security.sarif
        run: |
          set -euo pipefail
          if test -f "$SCAN_DIR/scan-manifest.json"; then
            "$CODEX_SECURITY_BIN" export "$SCAN_DIR" \
              --export-format sarif \
              --source-root "$GITHUB_WORKSPACE" \
              --output "$SARIF_FILE"
            echo "available=true" >> "$GITHUB_OUTPUT"
          fi

      - name: Upload SARIF
        if: always() && steps.export-sarif.outputs.available == 'true'
        uses: github/codeql-action/upload-sarif@e4fba868fa4b1b91e1fdab776edc8cfbe6e9fb81 # v4
        with:
          sarif_file: ${{ runner.temp }}/codex-security.sarif
          ref: refs/pull/${{ github.event.pull_request.number }}/head
          sha: ${{ github.event.pull_request.head.sha }}
          category: codex-security

      - name: Preserve scan results
        if: always()
        uses: actions/upload-artifact@043fb46d1a93c77aae656e7c1c64a875d1fc6a0a # v7
        with:
          name: codex-security-results
          path: |
            ${{ runner.temp }}/codex-security-results
            ${{ runner.temp }}/codex-security.json
          if-no-files-found: warn
          retention-days: 7
```

Severity policy (the GitHub example is report-only because it omits `--fail-on-severity`):

```bash
"$CODEX_SECURITY_BIN" scan . \
  --diff origin/main \
  --output-dir /path/outside/repository/results \
  --fail-on-severity high
```

Retry with an existing result directory (persistent or self-hosted runner):

```bash
"$CODEX_SECURITY_BIN" scan . \
  --diff origin/main \
  --output-dir /path/outside/repository/results \
  --archive-existing
```

## Options / Props

| Exit | Meaning |
|------|---------|
| `0` | The scan completed, and any configured severity policy passed |
| `1` | The completed scan contains a finding at or above the threshold |
| `2` | An input, execution, result-integrity, or required-output failure occurred |
| `130` | Ctrl-C interrupted the scan |
| `143` | SIGTERM terminated the scan |

Supported severity thresholds: `critical`, `high`, `medium`, `low` (a threshold includes findings from the current scan at that severity and above; earlier open findings in the repository summary don't affect the policy).

## Notes

- The workflow checks out the PR head, calculates its merge base, and scans the committed changes between those revisions; full history keeps the target exact. `persist-credentials: false` keeps the repository token out of Git config; installing the CLI before checkout and running its absolute path keeps repository-controlled executables away from the scan credential; `--auth api-key` explicitly selects the scoped key; the scan saves its history in a writable state directory outside the repository (`CODEX_SECURITY_STATE_DIR`).
- `--json` writes one complete JSON document to stdout (progress, summaries, and errors stay on stderr), unlike `codex exec --json`, which emits a JSON Lines event stream. The export step reads a completed, sealed scan and writes SARIF without touching the Codex runtime or credentials. Scan artifacts can contain vulnerable source snippets, evidence, and remediation details; set who can read them and how long to keep them.
- Coverage gaps don't change a completed scan's exit code or bypass its severity policy; exit `0` doesn't mean every file was reviewed (review excluded paths, deferred work, and open questions in `coverage.json`).
- Use a fresh runner directory per CI job; for a persistent or self-hosted runner use `--archive-existing` (archives earlier results and starts with an empty scan directory).
- The examples skip forked pull requests and Dependabot deliberately; run credentialed jobs only from a protected pipeline for trusted contributors. Third-party actions are pinned to full commit SHAs.
- GitLab: for protected default-branch scans, opt-in scheduled deep scans, separate SARIF policy gating, and optional verified draft merge requests see cli-ci-gitlab.md (protected variables, artifact access, and a separate policy gate so GitLab can ingest findings even when the scanner returns nonzero).
- Troubleshoot a CI scan: unknown Git ref or unexpected diff (fetch base and head history, compute the merge base, pass both revisions explicitly); protected or non-empty output directory (private directory outside the enclosing worktree, or `--archive-existing`); missing credentials (`CODEX_SECURITY_API_KEY` available to the trusted workflow and mapped directly to `OPENAI_API_KEY` for the scan process); scan history error (set `CODEX_SECURITY_STATE_DIR` to a writable directory outside the repository); Python setup error (Python 3.10+); incomplete coverage (review `coverage.json` and resolve reported gaps before rerunning); SARIF export error (confirm the scan completed and the full scan directory is available; export validates sealed artifacts); SARIF upload error (GitHub: Code Security enabled and permissions `actions: read`, `contents: read`, `security-events: write`; GitLab: GitLab Ultimate 19.2 or later and a SARIF 2.1.0 file via `artifacts:reports:sarif`).
- To invoke the plugin through `codex exec` see code-changes.md.

## Related

- [Codex Security CLI reference](./cli-reference.md)
- [Run Codex Security in GitLab CI/CD](./cli-ci-gitlab.md)
- [Review code changes for security](./code-changes.md)
