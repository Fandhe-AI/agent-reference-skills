# Run Codex Security in GitLab CI/CD

Run Codex Security in GitLab CI/CD to scan committed changes and protected branches, publish findings to GitLab Security, and optionally propose verified fixes in draft merge requests.

## Signature / Usage

Create a masked, hidden, protected GitLab CI/CD variable `CODEX_SECURITY_API_KEY` (OpenAI Platform API key with Codex Security access), with environment scope `codex-security/openai`. Start with this scan-only pipeline in a test project:

```yaml
stages:
  - security_scan
  - security_gate

.codex-security-merge-request:
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event" && $CI_MERGE_REQUEST_SOURCE_PROJECT_ID == $CI_PROJECT_ID && $CI_MERGE_REQUEST_SOURCE_BRANCH_PROTECTED == "true" && $CI_MERGE_REQUEST_TARGET_BRANCH_PROTECTED == "true"'

codex-security:
  extends: .codex-security-merge-request
  stage: security_scan
  image: node:26-bookworm-slim
  environment:
    name: codex-security/openai
    action: access
  variables:
    GIT_DEPTH: "0"
  before_script:
    - apt-get update -qq
    - apt-get install -y -qq --no-install-recommends ca-certificates git python3 ripgrep
    - npm install --prefix /tmp/codex-security-cli --ignore-scripts --no-audit --no-fund @openai/codex-security@0.1.20
  script:
    - |
      set -eu
      test -n "${CODEX_SECURITY_API_KEY:-}"

      CODEX_SECURITY_BIN="/tmp/codex-security-cli/node_modules/.bin/codex-security"
      RESULTS_DIR="/tmp/codex-security-results-$CI_JOB_ID"
      ARTIFACT_DIR="codex-security-artifacts"
      BASE_REVISION="$(git merge-base \
        "$CI_MERGE_REQUEST_DIFF_BASE_SHA" "$CI_COMMIT_SHA")"
      install -d -m 700 "$RESULTS_DIR" "$ARTIFACT_DIR/results"

      codex_security_api_key="$CODEX_SECURITY_API_KEY"
      unset CODEX_SECURITY_API_KEY
      set +e
      OPENAI_API_KEY="$codex_security_api_key" \
        "$CODEX_SECURITY_BIN" scan . \
          --diff "$BASE_REVISION" \
          --head "$CI_COMMIT_SHA" \
          --auth api-key \
          --output-dir "$RESULTS_DIR" \
          --json
      scan_exit="$?"
      set -e
      unset codex_security_api_key

      case "$scan_exit" in
        0|1|2) ;;
        *) exit "$scan_exit" ;;
      esac

      "$CODEX_SECURITY_BIN" export "$RESULTS_DIR" \
        --export-format sarif \
        --source-root "$CI_PROJECT_DIR" \
        --output "$ARTIFACT_DIR/results.sarif"
      test -s "$ARTIFACT_DIR/results.sarif"
      cp -R "$RESULTS_DIR"/. "$ARTIFACT_DIR/results/"
      printf '%s\n' "$scan_exit" > "$ARTIFACT_DIR/scan-exit-code.txt"
      exit 0
  artifacts:
    when: always
    access: maintainer
    expire_in: 7 days
    paths:
      - codex-security-artifacts/
    reports:
      sarif: codex-security-artifacts/results.sarif

codex-security-gate:
  extends: .codex-security-merge-request
  stage: security_gate
  image: alpine:3.20
  needs:
    - job: codex-security
      artifacts: true
  script:
    - exit "$(cat codex-security-artifacts/scan-exit-code.txt)"
```

Prerequisites: a trusted GitLab runner supporting the Codex sandbox's user namespace; Maintainer or Owner role; an OpenAI API key with Codex Security access (Trusted Access for Cyber may be required for full-repository scans); GitLab Ultimate 19.2 or later (SARIF 2.1.0 ingestion); full Git history for merge base calculation.

The production pipeline (downloadable from `https://learn.chatgpt.com/docs/security/cli/ci/gitlab.yml`, saved as `.gitlab-ci.yml`) adds `security_scan`, `security_remediation`, `security_publish`, and `security_gate` stages. Scan-only reporting requires only `CODEX_SECURITY_API_KEY`.

## Options / Props

Scan profile by trigger:

| Trigger | Target | Mode | Effort |
|---------|--------|------|--------|
| Protected same-project merge request | Committed diff | `standard` | `low` |
| Opt-in protected default-branch push or manual | Full repository | `standard` | `high` |
| Opt-in schedule on protected default branch | Full repository | `deep` | `xhigh` |

Scanner exit codes preserved by the final gate:

| Exit | Meaning |
|------|---------|
| `0` | The scan completed with complete coverage and passed its policy. |
| `1` | The scan completed and found an issue at or above the configured threshold. |
| `2` | The scan had incomplete coverage or an input or runtime error. |

Variables:

| Variable | When needed | Default or purpose |
|----------|-------------|--------------------|
| `CODEX_SECURITY_API_KEY` | Every scan | Protected, masked, hidden; scope to `codex-security/openai` |
| `CODEX_SECURITY_VERSION` | CLI upgrade | Pinned to `0.1.20`; retest before changing |
| `CODEX_SECURITY_FULL_SCAN_DEFAULT_BRANCH` | Default-branch full scans | Explicit opt-in; off by default |
| `CODEX_SECURITY_SCHEDULED_DEEP_SCAN` | Scheduled deep scans | Explicit opt-in; off by default |
| `CODEX_SECURITY_DEEP_MAX_TIME_HOURS` | Scheduled deep scans | Required time budget greater than `0` and less than `8` |
| `CODEX_SECURITY_DEEP_MAX_COST` | Scheduled deep scans | Required estimated USD cost guardrail greater than `0` |
| `CODEX_SECURITY_ENABLE_REMEDIATION` | Patch generation | Protected opt-in; off by default |
| `CODEX_SECURITY_VERIFICATION_COMMAND` | Patch generation | Protected regression test |
| `CODEX_SECURITY_SETUP_COMMAND` | Optional remediation setup | Protected dependency installation |
| `CODEX_SECURITY_REMEDIATION_EFFORT` | Optional remediation tuning | `high` |
| `CODEX_SECURITY_MAX_CHANGED_FILES` | Optional patch-size limit | `8`; allowed range `1` through `20` |
| `CODEX_SECURITY_CREATE_MR` | Draft merge request creation | Protected opt-in; off by default |
| `GITLAB_REMEDIATION_TOKEN` | Draft merge request creation | Developer project token scoped to `codex-security/publish` |
| `CODEX_SECURITY_GITLAB_INTERNAL_URL` | Optional self-hosted publishing | GitLab origin reachable from the runner |
| `CODEX_SECURITY_MR_TEST_COMMAND` | Draft merge request publishing | Required non-secret, project-specific regression test |
| `CODEX_SECURITY_MR_SETUP_COMMAND` | Optional remediation branch setup | Non-secret dependency setup |

## Notes

- The scan job runs by default only for same-project merge requests between protected branches. Fork pipelines and unprotected merge requests do not receive the scan credential.
- Masking and hiding a variable do not make untrusted CI code safe. Review every change to `.gitlab-ci.yml` before running a secret-bearing job.
- The production pipeline (`gitlab.yml`) publishes SARIF first and restores the policy in a separate `codex-security-gate` job. Its report job accepts exit codes `0` and `1`, and `2` only when the scan manifest proves completion, coverage is explicitly `partial`, and a non-empty SARIF report exists; other runtime, configuration, or export failures remain blocking. That example temporarily allows exit `2` while calibrating partial coverage; remove that allowance when incomplete coverage must block the pipeline. The scan-only example above performs no coverage check: its report job records `0`/`1`/`2` in `scan-exit-code.txt` and exits `0`, and `codex-security-gate` then fails the pipeline for `1` or `2`.
- Expected job artifacts: `scan-manifest.json`, `findings.json`, `coverage.json`, `results.sarif`, `scan-exit-code.txt`. Restrict artifact access because results can contain vulnerable source snippets.
- Default-branch scans create project vulnerability records; merge request findings appear only in the pipeline Security tab or merge request security widget.
- A completed diff scan applies only to that change and does not show the entire repository is clean.
- The CLI is pinned to `@openai/codex-security` `0.1.20`; retest authentication, artifacts, SARIF ingestion, and policy gating before changing the pin. `--max-cost` is an estimated cost guardrail, not a hard billing cap.
- The pipeline manages `CODEX_SECURITY_BIN`, `CODEX_SECURITY_EFFORT`, `CODEX_SECURITY_MODE`, `CODEX_SECURITY_STATE_DIR`, and `CODEX_SECURITY_TARGET`; do not configure them as project variables.
- Verified remediation is optional and runs only for protected default-branch pipelines. It requires complete coverage and a `high` or `critical` finding, confirms the regression test fails before patching, rejects changes to CI, credential, binary, or other protected files, and uses `verify-fix` (`fixed`, `still_vulnerable`, `inconclusive`); a patch is published only for `fixed`. The regression test must exit `1` before the fix and `0` afterward.
- Draft merge request publishing uses a Developer project access token (`api` and `write_repository` scopes) as protected, masked, hidden `GITLAB_REMEDIATION_TOKEN` scoped to the `codex-security/publish` environment. Do not substitute `CI_JOB_TOKEN`. It creates a `codex-security/fix-<finding-hash>` branch, reuses an existing open draft, and never merges automatically. Keep `CODEX_SECURITY_MR_TEST_COMMAND` unprotected.
- Remediation and publishing run before the final policy gate, so a verified draft merge request can be produced even when the gate later fails the pipeline.
- Source: https://learn.chatgpt.com/docs/security/cli/ci/gitlab (retrieved 2026-10).

## Related

- [Run Codex Security in CI](./cli-ci.md)
- [Codex Security CLI reference](./cli-reference.md)
