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

- Emits the last Codex message via the `final-message` output; map it to a job output or a later step.
- Run on a Linux or macOS runner unless `safety-strategy: unsafe` is set (required for Windows).
- Security checklist: limit who can start the workflow, sanitize prompt inputs from PR/issue/commit text (prompt injection), keep `safety-strategy` on `drop-sudo` or an unprivileged user, run Codex as the last step in a job, and rotate keys if proxy logs or output might have exposed secrets.
- Typical CI-autofix pattern: a read-only job (`contents: read`) runs Codex and uploads only the diff as a patch artifact (no repo write, no `OPENAI_API_KEY` in the second job); a separate job with `contents: write` / `pull-requests: write` applies the patch and opens the PR.

## Related

- [Non-interactive mode](./non-interactive-mode.md)
- [Codex SDK](./codex-sdk.md)
