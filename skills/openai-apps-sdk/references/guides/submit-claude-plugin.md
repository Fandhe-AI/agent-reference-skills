# Submit your Claude Code plugin to OpenAI

Guide for submitting an existing Claude Code plugin or connector to OpenAI: choose a skills-only, remote MCP, or desktop-only path, then convert Claude-specific declarations.

## Signature / Usage

| What you have | What to submit |
| --- | --- |
| Skills and no MCP server | Upload a skills-only plugin (portal: **Create plugin** -> **Skills only**). |
| A public HTTPS MCP endpoint | Create a remote MCP submission (**With MCP**). Include any skills in the same draft. |
| A local MCP server | Follow "Submit desktop-only plugins" (`/plugins/deploy/desktop-only`) for eligibility and submission instructions. |

Minimum archive layout for a skills-only direct upload (archive root, or its single top-level directory):

```text
.claude-plugin/plugin.json      # nonempty "description" required
skills/<skill-name>/SKILL.md    # at least one valid skill
```

Domain verification for a remote MCP submission (serve the portal's exact token):

```text
/.well-known/openai-apps-challenge
```

## Options / Props

Skills-only plugin: how to handle each Claude plugin element.

| What your Claude plugin has | What to do |
| --- | --- |
| `skills` | Keep each skill with its `SKILL.md`, scripts, references, and assets. A direct Claude archive upload must include at least one skill at `skills/<skill-name>/SKILL.md`. |
| Manifest-declared custom skill directories | Keep the directories and their manifest declarations in the archive. |
| Skills that explicitly refer to Claude | Replace Claude-specific references with provider-neutral language, such as "the model." Keep a product name only when the instruction genuinely applies to that product. |
| `commands`, `commands/`, `agents`, or `agents/` | Convert reusable behavior to skills. Turn each Markdown command into a skill, move reusable agent procedures into skills, and merge useful persona instructions into the relevant skill. |
| `hooks` or `hooks/hooks.json` | Remove lifecycle hooks before public directory submission. If the plugin depends on lifecycle hooks, distribute it so users can install it manually in Codex desktop. |
| `userConfig` or `${user_config.*}` | OpenAI doesn't run Claude installation prompts or expand `user_config` variables. See "Replace Claude `userConfig`" below. If the plugin needs credentials or persistent user settings, use an MCP server. |
| Skills that create or update Claude live artifacts | Not currently supported. Remove instructions that require creating, reopening, refreshing, or updating an artifact; return the content as regular conversation output (e.g. standard tables). Artifact-specific HTML, persistence, refresh behavior, and interactions aren't preserved. |
| `bin/`, `settings`, `settings.json`, `CLAUDE.md`, or `.claude/settings*.json` | Keep required helpers and instructions in the plugin. Call bundled executables with package-relative paths, and remove Claude-only settings. |
| `outputStyles`, `lspServers`, `experimental.themes`, `experimental.monitors`, `channels`, or `dependencies` | Move essential behavior into skills, then remove the Claude declaration. Contact your OpenAI partner if the core workflow requires inbound channel messages. |
| `.claude-plugin/plugin.json` | Keep the manifest for a direct Claude archive upload. The portal converts it to `.codex-plugin/plugin.json`. |
| `.claude-plugin/marketplace.json`, `.mcp.json`, `mcpServers`, `.app.json`, or `apps` | Don't rely on these. A skills-only upload excludes MCP server configuration, and you can't submit an existing MCP server integration by reference. |

Remote MCP submission: differences from the skills-only table.

| What your Claude integration has | What to do |
| --- | --- |
| A remote MCP server | Reuse the server implementation. Submit a stable, public HTTPS endpoint that uses Streamable HTTP. |
| A local MCP server or Claude Desktop extension (`.mcpb`) | Deploy to a public HTTPS URL, or follow "Submit desktop-only plugins". The portal doesn't accept `.mcpb` files. |
| Skills or manifest-declared custom skill directories | Include the skills in the same **With MCP** submission. |
| `userConfig` or `${user_config.*}` | Move each value to an explicit input, OAuth, hosted storage, or Codex-local configuration. |
| `.app.json`, `apps`, or an existing MCP server integration | Submit the MCP server endpoint directly. You can't submit an existing MCP server integration by reference. |
| `outputStyles`, `lspServers`, `experimental.themes`, `experimental.monitors`, `channels`, or `dependencies` | Move essential behavior into skills or MCP tools, then remove the Claude declaration. |

(`skills`, Claude references, `commands`/`agents`, `hooks`, and live artifacts are handled as in the skills-only table.)

Replace Claude `userConfig`: OpenAI plugins don't run `userConfig` installation prompts or expand `${user_config.*}` references. Remove them and replace each value:

| What the value controls | OpenAI replacement |
| --- | --- |
| A choice that can change for each task | Add an explicit skill or MCP tool input. Ask for the value only when the workflow needs it. |
| A credential for a remote service | Use OAuth 2.1 through the remote MCP server. Don't put secrets in the skill archive, manifest, instructions, or default values. |
| A preference that should persist | Store it in the hosted service and associate it with the authenticated user. Let the user update it through an explicit workflow or tool input. |
| A setting for a Codex-local script or hook | Use a documented environment variable or config file. Check it before use and return an actionable error when missing. Don't make this local setting necessary for the core ChatGPT workflow. |
| A fixed value that is the same for all users | Put a non-secret default in the skill instructions or hosted service configuration. |

## Notes

- Claude uses separate submission processes for Claude Code plugins and MCP connectors. OpenAI uses one plugin package that can contain skills, MCP servers, or both. Claude marketplace listings and approvals don't transfer.
- Skills-only upload steps: (1) confirm the archive has `.claude-plugin/plugin.json` with a nonempty `description` and at least one valid skill; (2) open the plugin submission portal (`https://platform.openai.com/plugins`), select **Create plugin**, choose **Skills only**, upload; (3) review the generated `.codex-plugin/plugin.json` (the portal adds missing interface defaults and normalizes text fields); (4) test the imported skills in a clean environment (no undeclared local packages, files, or credentials); (5) complete listing and review fields, fix every scan result, submit the draft.
- If the archive doesn't qualify for direct upload, create the OpenAI manifest and package layout per "Package your plugin" and "Build skills".
- Remote MCP submission steps: deploy at the production HTTPS endpoint using Streamable HTTP (use OAuth 2.1 when the server accesses private user data or acts for a user); add accurate tool schemas and safety annotations and test confirmation for write/destructive actions; convert commands/agents to skills; in the portal choose **Create plugin** -> **With MCP**, submit the endpoint, add skills to the same draft; verify the server domain, configure authentication, complete listing and review fields, fix every scan result, submit.
- Domain verification: you must serve the portal's exact token from `/.well-known/openai-apps-challenge` on the MCP host or an allowed parent host.
- OAuth and workspace domain restrictions: expose a UserInfo Endpoint returning the user's `email` claim and `email_verified: true`; advertise and enable the `openid` and `email` scopes.
- If a skills-only plugin needs a credential or a setting that persists between conversations, add an MCP server (OAuth + hosted storage). If the value only affects the current task, stay skills-only and collect it as an explicit skill input.
- Requirements: **Apps Management** write access in the owning OpenAI organization, plus individual or business identity verification. Every plugin must complete OpenAI review.
- Contact your OpenAI partner before submitting if the core value requires local execution, arbitrary access to files on the user's computer, hardware or application access, offline operation, or inbound channel messages (may need product-specific review).
- If the plugin includes skills, review their instructions using the instruction-following guidance in Build skills before submitting.
- If the portal reports a package validation code, use the submission error reference.
- Source: https://developers.openai.com/plugins/guides/submit-claude-plugin (local `.md` twin copy, fetched 2026-10-17).

## Related

- [Optimize Metadata](./optimize-metadata.md)
- [Security & Privacy](./security-privacy.md)
