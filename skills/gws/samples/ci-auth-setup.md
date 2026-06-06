# CI and Headless Authentication Setup

Configure gws for use in CI pipelines and environments without a browser.

```bash
# ── Step 1: Interactive machine (one-time setup) ──────────────────────────────

# Authenticate with only the scopes needed for your CI job
# (keeps total scope count below the ~25-scope unverified-app limit)
gws auth login -s drive,gmail,sheets

# Export credentials with plaintext tokens
gws auth export --unmasked > credentials.json

# ── Step 2: CI environment ────────────────────────────────────────────────────

# Option A: Exported OAuth credentials file
# Store credentials.json as a CI secret, then at runtime:
export GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE=/path/to/credentials.json
gws drive files list   # Works without browser interaction

# Option B: Service account key JSON (no interactive login required)
export GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE=/path/to/service-account.json
gws drive files list

# Option C: Pre-obtained access token from gcloud (highest priority)
export GOOGLE_WORKSPACE_CLI_TOKEN="$(gcloud auth print-access-token)"
gws drive files list

# ── Scope restriction for unverified (testing-mode) OAuth apps ────────────────
# Limit scopes to avoid the ~25-scope cap during development / testing
gws auth login -s drive,gmail
# Then export and use as shown in Option A above

# ── Optional: enable debug logging in CI ─────────────────────────────────────
export GOOGLE_WORKSPACE_CLI_LOG=gws=debug
export GOOGLE_WORKSPACE_CLI_LOG_FILE=/var/log/gws

# ── Script-friendly exit code handling ───────────────────────────────────────
gws drive files list
EXIT=$?
if [ $EXIT -eq 2 ]; then
  echo "Auth error — check GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE" >&2
  exit 1
elif [ $EXIT -eq 1 ]; then
  echo "API error — check the Google API response" >&2
  exit 1
fi
```

## Notes

- Auth precedence (highest to lowest): `GOOGLE_WORKSPACE_CLI_TOKEN` → `GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE` → encrypted credentials from `gws auth login` → plaintext `~/.config/gws/credentials.json`.
- Never commit `credentials.json` to source control; store it as an encrypted CI secret (e.g., GitHub Actions secret, Vault).
- `-s drive,gmail,sheets` in `gws auth login` restricts the OAuth consent to only the named services, keeping the scope count low for unverified apps in testing mode.
- `GOOGLE_WORKSPACE_CLI_TOKEN` bypasses credential file resolution entirely and is refreshed externally (e.g., by `gcloud`).
- Exit code `2` always means an auth failure; exit code `3` means a bad argument was supplied before any API call.
