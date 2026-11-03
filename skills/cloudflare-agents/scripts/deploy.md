---
source: https://developers.cloudflare.com/agents/getting-started/quick-start/, https://developers.cloudflare.com/agents/examples/slack-agent/, https://developers.cloudflare.com/agents/examples/email-agent/, https://developers.cloudflare.com/agents/model-context-protocol/guides/remote-mcp-server/
---

# Deploy

Register secrets and deploy an Agent to Cloudflare.

## Signature / Usage

### Register secrets

> **Warning**: This creates or overwrites secrets on the production Worker. Enter values at the prompt (standard input), not as command-line arguments. Do not commit the local development `.dev.vars` file (add it to `.gitignore`).

```sh
npx wrangler secret put SLACK_CLIENT_ID
npx wrangler secret put SLACK_CLIENT_SECRET
npx wrangler secret put SLACK_SIGNING_SECRET
npx wrangler secret put OPENAI_API_KEY
npx wrangler secret put OPENAI_BASE_URL
```

Slack Agent example. `OPENAI_BASE_URL` is not needed if you do not use AI Gateway.

```sh
npx wrangler secret put EMAIL_SECRET
```

Email Agent example. `yarn wrangler secret put EMAIL_SECRET` and `pnpm wrangler secret put EMAIL_SECRET` work the same way.

### Deploy an Agent

> **Warning**: This publishes to production (`*.workers.dev` or a route). Anyone who knows the URL can call the Agent, so verify the caller in your Worker before sharing it.

```sh
npx wrangler deploy
```

The deployed URL has the form `https://my-agent.<YOUR_SUBDOMAIN>.workers.dev/agents/assistant/demo`.

### Deploy a remote MCP server

> **Warning**: This publishes to production. The authless template can be called by anyone.

```sh
npx wrangler@latest deploy
```

If a Git repository is already connected to the Worker through Workers Builds, pushing to or merging a pull request into the main branch also deploys.

## Notes

- Secrets are entered at the prompt (standard input) and never passed as arguments. Production secrets are separate from the local `.dev.vars` file.

## Related

- For `wrangler deploy` and `wrangler secret` flag details, see the cloudflare-wrangler skill.
- `mcp.md` — connecting MCP clients after deployment
