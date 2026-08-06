# Run Codex Security in CI

Scan pull-request changes, preserve structured results, upload SARIF, and set a severity policy using the `@openai/codex-security` CLI.

## Signature / Usage

Store an OpenAI API key as a secret `CODEX_SECURITY_API_KEY`. Runner needs Node.js 22+, Python 3.10+, `@openai/codex-security` installed outside the repository checkout, and full PR head/base history.

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
      - uses: actions/setup-node@v7
        with:
          node-version: "26"
      - uses: actions/setup-python@v7
        with:
          python-version: "3.14"
      - name: Install Codex Security
        run: |
          npm install --prefix "$RUNNER_TEMP/codex-security" \
            --ignore-scripts --no-audit --no-fund @openai/codex-security@0.1.3
      - uses: actions/checkout@v7
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
          BASE_REVISION="$(git merge-base "$BASE_SHA" "$HEAD_SHA")"
          "$CODEX_SECURITY_BIN" scan . --diff "$BASE_REVISION" --head "$HEAD_SHA" \
            --auth api-key --output-dir "$SCAN_DIR" --json > "$RUNNER_TEMP/codex-security.json"
      - name: Export SARIF
        id: export-sarif
        if: always()
        env:
          CODEX_SECURITY_BIN: ${{ runner.temp }}/codex-security/node_modules/.bin/codex-security
          SCAN_DIR: ${{ runner.temp }}/codex-security-results
          SARIF_FILE: ${{ runner.temp }}/codex-security.sarif
        run: |
          if test -f "$SCAN_DIR/scan-manifest.json"; then
            "$CODEX_SECURITY_BIN" export "$SCAN_DIR" --export-format sarif \
              --source-root "$GITHUB_WORKSPACE" --output "$SARIF_FILE"
            echo "available=true" >> "$GITHUB_OUTPUT"
          fi
      - uses: github/codeql-action/upload-sarif@v4
        if: always() && steps.export-sarif.outputs.available == 'true'
        with:
          sarif_file: ${{ runner.temp }}/codex-security.sarif
          category: codex-security
```

## Severity policy

```bash
"$CODEX_SECURITY_BIN" scan . \
  --diff origin/main \
  --output-dir /path/outside/repository/results \
  --fail-on-severity high
```

Thresholds: `critical`, `high`, `medium`, `low` (includes findings at that severity and above).

## Options / Props

| Exit | Meaning |
|------|---------|
| `0` | Scan complete, coverage complete, policy passed |
| `1` | Completed scan contains a finding at/above the threshold |
| `2` | Input/runtime error, or incomplete coverage |
| `130` | Ctrl-C interrupted |
| `143` | SIGTERM terminated |

## Notes

- `--json` writes one complete JSON document to stdout, unlike `codex exec --json` which emits a JSON Lines event stream
- `--auth api-key` explicitly selects the scoped credential; map the secret directly to `OPENAI_API_KEY` on the scan step only
- `persist-credentials: false` on checkout keeps the repository token out of Git config; install the CLI before checkout and invoke its absolute path to keep repository-controlled executables away from the scan credential
- For a persistent/self-hosted runner, use `--archive-existing` to preserve earlier results instead of failing on a non-empty output directory
- SARIF export requires GitHub Code Security enabled for private/internal repositories, and workflow permissions `actions: read`, `contents: read`, `security-events: write`
- Examples skip forked pull requests deliberately — run credentialed jobs only from a protected pipeline for trusted contributors
- The official workflow pins third-party actions to full commit SHAs (e.g. `actions/setup-node@820762786026740c76f36085b0efc47a31fe5020 # v7`); this page uses version tags for brevity, but pin to SHAs in a production security workflow

## Related

- [Codex Security CLI reference](./cli-reference.md)
- [Review code changes for security](./code-changes.md)
