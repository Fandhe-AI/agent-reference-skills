# Auth

Sign in, check status, and sign out of the Codex CLI.

## Sign in with ChatGPT

```bash
codex login
```

Opens the browser-based ChatGPT sign-in flow. Uses your ChatGPT workspace credentials and follows enterprise permissions/data policies.

## Sign in with an API key

```bash
printenv OPENAI_API_KEY | codex login --with-api-key
```

Uses usage-based access through your OpenAI Platform account at standard API rates.

## Device code authentication (headless environments)

```bash
codex login --device-auth
```

For environments without a browser (e.g. remote servers, containers).

## Check authentication status

```bash
codex login status
```

## Sign out

```bash
codex logout
```

> **警告**: Credentials are cached locally at `~/.codex/auth.json`. Treat this file like a password — it contains access tokens. Don't commit it, paste it into tickets, or share it in chat.
