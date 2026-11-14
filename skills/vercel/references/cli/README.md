# cli

| Name | Description | Path |
|------|-------------|------|
| vercel activity | View activity events for a linked project or team, with filtering by type, date range, and project. | [activity.md](./activity.md) |
| vercel agent-runs | Read Agent Runs data from the terminal: find projects with activity, list runs, inspect run metadata, and read conversation traces. | [agent-runs.md](./agent-runs.md) |
| vercel agent | Generate or update a section about Vercel deployment best practices in the project's agent guidance file (`AGENTS.md` or `CLAUDE.md`). | [agent.md](./agent.md) |
| vercel ai-gateway | Manage AI Gateway resources from the Vercel CLI: API keys, budgets, routing rules, virtual models, models, leaderboards, and coding agent setup. | [ai-gateway.md](./ai-gateway.md) |
| vercel alerts | List recent alerts for a linked project, a specific project, or an entire team. Supports AI investigation summaries and alert rule management. | [alerts.md](./alerts.md) |
| vercel alias | Apply custom domain aliases to Vercel deployments. | [alias.md](./alias.md) |
| vercel api | Make authenticated HTTP requests to the Vercel API from the terminal. Beta command. | [api.md](./api.md) |
| vercel billing | Group of commands for your team's billing: plan and balance due, usage, contracts, Spend Management budgets, and invoices. | [billing.md](./billing.md) |
| vercel bisect | Binary search through deployments to find when a bug was introduced, similar to `git bisect` but without rebuilding each commit. | [bisect.md](./bisect.md) |
| vercel blob | Interact with Vercel Blob storage: upload, download, list, delete, copy files, and manage stores. | [blob.md](./blob.md) |
| vercel billing budgets | View and manage Spend Management budgets (team, project, product, or organization) from the terminal. | [budgets.md](./budgets.md) |
| vercel build | Build a Vercel Project locally or in a CI environment. Output is placed in `.vercel/output` (Build Output API v3 format). | [build.md](./build.md) |
| vercel buy | Purchase Vercel products (credits, addons, subscriptions, domains) from the CLI. | [buy.md](./buy.md) |
| vercel cache | Manage CDN cache, Runtime cache and Data cache for a project: purge, invalidate, or dangerously delete cached content. | [cache.md](./cache.md) |
| vercel certs | Manage SSL certificates for domains: list, issue, and remove. Vercel manages certificates automatically. | [certs.md](./certs.md) |
| vercel changelog | List recent Vercel product updates with full Markdown content, or search the changelog, from the terminal. No login or linked project needed. | [changelog.md](./changelog.md) |
| vercel ci | Enable or disable repositories for Vercel CI (Beta) and inspect, read logs of, search, or rerun CI runs. | [ci.md](./ci.md) |
| vercel comments | Review and manage existing Vercel Toolbar comment threads from the terminal: list, inspect, reply, resolve, reopen, open, update, and delete. New threads are created with the Vercel Toolbar. Available on all plans. | [comments.md](./comments.md) |
| vercel connect | Manage Vercel Connect connectors: discover services, create connectors, attach/detach projects, request runtime tokens, revoke tokens, add phone contacts. | [connect.md](./connect.md) |
| vercel billing contract | View contract commitment information for your Vercel account: contract periods, commitment types, and values. | [contract.md](./contract.md) |
| vercel crons | Manage Cron Jobs from the Vercel CLI: add cron entries to `vercel.json`, list them, and trigger them on demand. Beta command. | [crons.md](./crons.md) |
| vercel curl | Make HTTP requests to Vercel deployments with automatic deployment protection bypass. | [curl.md](./curl.md) |
| vercel daemons | Manage Daemons for a project: list and inspect production daemons, override regional instance counts, and inspect or restart individual instances. | [daemons.md](./daemons.md) |
| vercel deploy-hooks | Manage Deploy Hooks: list, create, and delete deploy hook URLs that trigger new deployments when called. | [deploy-hooks.md](./deploy-hooks.md) |
| vercel deploy | Deploy a Vercel project. Default command when no subcommand is specified. | [deploy.md](./deploy.md) |
| vercel dev | Replicate the Vercel deployment environment locally to test Functions and Middleware without deploying. | [dev.md](./dev.md) |
| vercel dns | Manage DNS records for domains: list, inspect, add, update, remove, and import zone files. | [dns.md](./dns.md) |
| vercel docs | Search the Vercel docs and print docs pages as Markdown from the terminal. No login or linked project needed. | [docs.md](./docs.md) |
| vercel doctor | Check your Vercel CLI setup: version, install, login, team, project link, `vercel.json`, and Vercel status. | [doctor.md](./doctor.md) |
| vercel domains | List, inspect, verify, add, remove, purchase, renew, move, transfer in, search, price, check availability of, and manage automatic renewal for domains under the current scope. | [domains.md](./domains.md) |
| vercel drains | Manage drains that send logs, traces, Web Analytics events, and Speed Insights metrics to a custom HTTP endpoint. | [drains.md](./drains.md) |
| vercel env | Manage environment variables in Vercel Projects: list, add, update, remove, pull to file, and run commands with env vars. | [env.md](./env.md) |
| vercel feedback | Send feedback about Vercel from the terminal. No login or linked project needed. | [feedback.md](./feedback.md) |
| vercel firewall | Manage Vercel Firewall: custom rules, IP blocks, system bypass, attack mode, and system mitigations. Custom rule and IP block changes are staged until published. | [firewall.md](./firewall.md) |
| vercel flags | Manage Vercel Flags (feature flags) for a project: create, list, inspect, version history, evaluation metrics, update variants, set/split/rollout, targeting, rules, targets, segments, entities, labels, project connections, datafile, SDK keys, overrides, and archive/delete. | [flags.md](./flags.md) |
| vercel git | Manage Git provider repository connections for a Vercel Project. | [git.md](./git.md) |
| vercel global-config | Manage Global Config stores from the CLI: list, create, inspect, update, delete, and manage items, read tokens, and backups. Renamed from Edge Config (the `vercel edge-config` alias is not confirmed in the current official page). | [global-config.md](./global-config.md) |
| Vercel CLI Global Options | Options available across all Vercel CLI commands. | [global-options.md](./global-options.md) |
| vercel guidance | Enable or disable guidance messages shown after CLI commands. | [guidance.md](./guidance.md) |
| vercel health | Read Vercel platform status, active incidents, scheduled maintenance, and recently resolved incidents from your terminal. | [health.md](./health.md) |
| vercel help | Display help information for Vercel CLI commands. | [help.md](./help.md) |
| vercel httpstat | Visualize HTTP request timing statistics for Vercel deployments with automatic deployment protection bypass. Beta command. | [httpstat.md](./httpstat.md) |
| vercel init | Initialize a Vercel supported framework example locally from the official examples repository. | [init.md](./init.md) |
| vercel inspect | Retrieve information about a Vercel deployment by URL or ID. | [inspect.md](./inspect.md) |
| vercel install | Alias for `vercel integration add`. Install a marketplace integration and provision a resource. | [install.md](./install.md) |
| vercel integration | Manage marketplace integrations: provision resources, discover integrations, manage installations, and control individual resources. | [integration.md](./integration.md) |
| vercel kb | Browse, search, and read Vercel Knowledge Base guides from your terminal. | [kb.md](./kb.md) |
| vercel kms | Manage Vercel KMS issuers, rotate signing keys, and control which projects can sign tokens (beta). | [kms.md](./kms.md) |
| vercel link | Link a local directory to a Vercel Project. Stores metadata in `.vercel/project.json`. | [link.md](./link.md) |
| vercel list | List recent deployments for the currently-linked Vercel Project. Alias: `vercel ls`. | [list.md](./list.md) |
| vercel login | Authenticate with your Vercel account through the CLI. | [login.md](./login.md) |
| vercel logout | Log out of your Vercel account through the CLI. | [logout.md](./logout.md) |
| vercel logs | Query runtime logs for a Vercel project; `vercel logs requests` lists CDN request records. | [logs.md](./logs.md) |
| vercel mcp | Configure MCP clients (Claude Code, Cursor, VS Code with Copilot, Claude.ai) to use Vercel's hosted MCP endpoint at `https://mcp.vercel.com`. | [mcp.md](./mcp.md) |
| vercel metrics | Query observability metrics and inspect available metrics, dimensions, and aggregations. Most metrics require Observability Plus. | [metrics.md](./metrics.md) |
| vercel microfrontends | Manage Vercel Microfrontends: create groups, add/remove projects, pull configuration for local development. Alias: `vercel mf`. | [microfrontends.md](./microfrontends.md) |
| vercel monitors | Manage monitors (the rules that decide when Vercel alerts your team) from the terminal. Replaces the deprecated `vercel alerts rules` command tree. | [monitors.md](./monitors.md) |
| vercel oauth-apps | Register Vercel Apps (OAuth) and manage team installations: register new apps, review installation requests, install with permissions, uninstall. | [oauth-apps.md](./oauth-apps.md) |
| vercel open | Open the current linked project in the Vercel Dashboard in the default browser. | [open.md](./open.md) |
| vercel organizations | Create and manage organizations (several Vercel teams under one billing team) and their child teams. | [organizations.md](./organizations.md) |
| Vercel CLI Overview | Command-line interface for managing Vercel Projects, deployments, domains, environment variables, and more from a terminal. | [overview.md](./overview.md) |
| vercel pricing | Read the public Vercel pricing table and list features grouped by the lowest plan that includes them (Hobby, Pro, Enterprise). | [pricing.md](./pricing.md) |
| vercel project | Manage Vercel Projects: list, create, inspect, update, rename, delete, pause/resume production traffic, and configure checks, protection, members, access groups, analytics, Speed Insights, Observability Plus, and OIDC tokens. Alias: `vercel projects`. | [project.md](./project.md) |
| vercel promote | Promote an existing deployment to be the current production deployment (assign production domains to it). | [promote.md](./promote.md) |
| vercel pull | Sync environment variables and project settings to a local cache under `.vercel/` for use by `vercel build` and `vercel dev`. | [pull.md](./pull.md) |
| vercel redeploy | Rebuild and redeploy an existing deployment. | [redeploy.md](./redeploy.md) |
| vercel redirects | Manage project-level redirects that apply to all deployments and environments without requiring a new deployment. | [redirects.md](./redirects.md) |
| vercel remove | Remove deployments by URL/ID or remove all deployments for a project. Alias: `vercel rm`. | [remove.md](./remove.md) |
| vercel rollback | Roll back production deployments to a previous deployment. | [rollback.md](./rollback.md) |
| vercel rolling-release | Manage rolling releases to gradually roll out new deployments to a fraction of users. Alias: `vercel rr`. | [rolling-release.md](./rolling-release.md) |
| vercel routes | Manage project-level routing rules (rewrites, redirects, header transforms) that apply to all deployments. Changes are staged until published. | [routes.md](./routes.md) |
| vercel sandbox | Entry point for managing Vercel Sandbox from the CLI. Modeled on the Docker CLI. | [sandbox.md](./sandbox.md) |
| vercel schedules | Manage Vercel Schedules for the linked project: inspect, enable, disable, invoke any schedule, and create, update, delete dynamic schedules that target a queue topic. Beta. | [schedules.md](./schedules.md) |
| vercel security | Run your team's security checks from the terminal. Surfaces the same checks as the team's Security Dashboard, lists the findings behind each check, and can output the raw report as JSON. | [security.md](./security.md) |
| vercel setup | Prepare your machine for coding agents in two steps: install the Vercel plugin for Claude Code, Codex, and OpenCode, and connect local coding agents to AI Gateway. | [setup.md](./setup.md) |
| vercel signup | Create a new Vercel account through Vercel CLI. After sign-up completes, you are signed in to the CLI with the new account. | [signup.md](./signup.md) |
| vercel skills | Discover agent skills relevant to the current project or search the skill catalog. | [skills-cmd.md](./skills-cmd.md) |
| vercel storage | Manage storage resources (Vercel Blob and Global Config stores) and their project connections. | [storage.md](./storage.md) |
| vercel switch | Switch the active team scope in the Vercel CLI. | [switch.md](./switch.md) |
| vercel environments (target) | List the project's environments, including custom environments beyond production, preview, and development. The official page is now titled `vercel environments`. | [target.md](./target.md) |
| vercel teams | Manage teams: list, create, invite members, switch scope, inspect SAML/SSO, list or remove members, and check join-request status. `vercel switch` is a top-level alias for `vercel teams switch`. | [teams.md](./teams.md) |
| vercel telemetry | Enable or disable CLI telemetry collection. | [telemetry.md](./telemetry.md) |
| vercel templates | Search templates, inspect their requirements, and deploy an application from a new GitHub repository. | [templates.md](./templates.md) |
| vercel token-pass | Connect supported coding agents to Token Pass through AI Gateway by creating a Token Pass API key and updating local agent configuration. | [token-pass.md](./token-pass.md) |
| vercel tokens | Manage personal Vercel authentication tokens: list, create, and revoke access tokens for the Vercel API and CLI. | [tokens.md](./tokens.md) |
| vercel traces | Search spans across a team, inspect request traces, capture session traces, and manage project trace sampling rules. | [traces.md](./traces.md) |
| vercel upgrade | Upgrade the Vercel CLI to the latest version and manage automatic updates. | [upgrade.md](./upgrade.md) |
| vercel billing usage | View billing usage and costs for the current billing period or a custom date range. | [usage.md](./usage.md) |
| vercel vcr | Entry point for managing Vercel Container Registry (VCR) from the CLI: list, inspect, create, and delete repositories, browse tags, and manage images. | [vcr.md](./vcr.md) |
| vercel webhooks | Manage webhooks for your Vercel account: list, inspect, create, and remove. Beta command. | [webhooks.md](./webhooks.md) |
| vercel whoami | Display the username of the currently logged-in Vercel user. | [whoami.md](./whoami.md) |
