# Codex GitHub Action

`openai/codex-action@v1` runs Codex in CI/CD jobs, applies patches, or posts reviews from a GitHub Actions workflow. Installs the Codex CLI, starts a Responses API proxy for the provided key, and runs `codex exec` under the permissions you specify.

## Signature / Usage

```yaml
- name: Run Codex
  id: run_codex
  uses: openai/codex-action@v1
  with:
    openai-api-key: ${{ secrets.OPENAI_API_KEY }}
    prompt-file: .github/codex/prompts/review.md
    output-file: codex-output.md
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `prompt` / `prompt-file` | string (choose one) | Inline instructions or a repo path (e.g. `.github/codex/prompts/`) to the task text. |
| `codex-args` | JSON array or shell string | Extra `codex exec` flags, e.g. `["--ephemeral"]` or `--profile ci`. |
| `model` / `effort` | string | Overrides the Codex agent configuration; empty for defaults. |
| `sandbox` | `workspace-write` \| `read-only` \| `danger-full-access` | Sandbox mode matched to the permissions the run needs. |
| `output-file` | string | Path to save the final Codex message for later steps/artifacts. |
| `codex-version` | string | Pins a specific CLI release; blank uses the latest published version. |
| `codex-home` | string | Shared Codex home directory to reuse config/MCP setups across steps. |
| `safety-strategy` | `drop-sudo` (default) \| `unprivileged-user` \| `unsafe` | Removes `sudo` before running Codex (irreversible for the job); Windows runners require `unsafe`. |
| `unprivileged-user` / `codex-user` | boolean / string | Pairs with `safety-strategy: unprivileged-user` to run Codex as a specific account. |
| `read-only` | boolean | Blocks file/network changes but still runs with elevated privileges — not sufficient alone to protect secrets. |
| `allow-users` / `allow-bots` | string | Restricts who can trigger the workflow; default is write-access collaborators only. |

## Notes

- Prerequisites: store the OpenAI key as a GitHub secret (e.g. `OPENAI_API_KEY`); use a Linux or macOS runner (Windows needs `safety-strategy: unsafe`); check out the code before invoking the action; choose `prompt` or `prompt-file`.
- Emits the last Codex message via the `final-message` output; map it to a job output (e.g. `final_message: ${{ steps.run_codex.outputs.final-message }}`) or a later step. `output-file` saves only the final Codex message; upload it as an artifact to keep it after the job (the official page phrases this as collecting the full transcript, but the file contains only the final message). To capture every event, use the JSONL event stream from `codex exec --json` (see Non-interactive mode). For structured data pass `--output-schema` through `codex-args` to enforce a JSON shape.
- Sample workflow: a `codex` job (`contents: read`, checkout `refs/pull/<n>/merge`, `fetch-depth: 0`, `persist-credentials: false`) runs the action with `prompt-file: .github/codex/prompts/review.md` and `output-file: codex-output.md`; a `post_feedback` job (`issues: write`, `pull-requests: write`) posts the final message via `actions/github-script@v7` (`github.rest.issues.createComment`).
- Manage privileges: `safety-strategy` `drop-sudo` (default) removes `sudo` irreversibly for the job and protects secrets in memory; `unprivileged-user` pairs with `codex-user` (ensure that user can read and write the checkout); `read-only` still runs with elevated privileges; `sandbox` limits filesystem and network access within Codex (choose the narrowest option); `allow-users` / `allow-bots` restrict triggers (default: write-access users only).
- Troubleshooting: setting both `prompt` and `prompt-file` is an error (provide exactly one); "responses-api-proxy didn't write server info" means the API key is missing or invalid (the proxy starts only when `openai-api-key` is provided); if `sudo` unexpectedly succeeded, ensure no earlier step restored it and the runner is Linux or macOS; permission errors after `drop-sudo` need write access granted first (e.g. `chmod -R g+rwX "$GITHUB_WORKSPACE"` or the unprivileged-user pattern); "Unauthorized trigger blocked" means adjusting `allow-users` / `allow-bots`.
- Security checklist: limit who can start the workflow, sanitize prompt inputs from PR/issue/commit text (prompt injection), keep `safety-strategy` on `drop-sudo` or an unprivileged user, run Codex as the last step in a job, and rotate keys if proxy logs or output might have exposed secrets.
- Typical CI-autofix pattern: a read-only job (`contents: read`) runs Codex and uploads only the diff as a patch artifact (no repo write, no `OPENAI_API_KEY` in the second job); a separate job with `contents: write` / `pull-requests: write` applies the patch and opens the PR.

## Related

- [Non-interactive mode](./non-interactive-mode.md)
- [Codex SDK](./codex-sdk.md)
