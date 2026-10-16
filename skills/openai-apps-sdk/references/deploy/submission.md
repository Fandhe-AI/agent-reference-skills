# Upload and submit your plugin

Submit the plugin package you built (MCP connections, skills, or both) as a ZIP through the plugin submission portal, resolve automated findings, submit for review, then publish once approved. After initial publication, changes to the MCP server are picked up automatically and eligible updates go live once they pass automated checks; changes to plugin metadata or skills still need a new ZIP.

Before submitting, follow the plugin package guide (`../build/package-plugin.md`) and the plugin guidelines (`./app-guidelines.md`). If the portal returns an error code, use `submission-errors.md` to find the matching requirement.

Submit remote MCP servers through **With MCP** using a stable, public HTTPS endpoint. For a local MCP server or desktop execution, use the desktop-only submission path (`desktop-only.md`).

## Signature / Usage

Four-step flow:

1. Upload your plugin ZIP: confirm access and identity, create the draft.
2. Review checks and resolve issues: Metadata & Skills, MCP connect and scan.
3. Submit for review: review information, reviewer credentials, attestations.
4. Publish your approved plugin: **Publish plugin** on the approved package version.

Domain verification challenge (host the exact token as plain text):

```text
https://<challenge-base-host>/.well-known/openai-apps-challenge
```

Companion `mcp.json` for the Agent Plugins example:

```json
{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/mcp.schema.json",
  "mcpServers": {
    "notes": {
      "type": "streamable-http",
      "url": "https://example.com/mcp"
    }
  }
}
```

Agent Plugins format, complete `plugin.json` at the plugin root:

```json
{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
  "name": "acme-notes",
  "version": "1.0.0",
  "description": "Search and summarize notes from your Acme workspace.",
  "author": {
    "name": "Acme",
    "email": "support@example.com",
    "url": "https://example.com"
  },
  "homepage": "https://example.com/notes",
  "repository": "https://github.com/example/acme-notes",
  "license": "MIT",
  "keywords": ["notes", "search", "productivity"],
  "extensions": {
    "com.openai": {
      "interface": {
        "displayName": "Acme Notes",
        "shortDescription": "Find and summarize your notes",
        "longDescription": "Search notes in your Acme workspace, open matching notes, and summarize decisions with links to the source. Acme Notes only accesses notes available to your connected account.",
        "developerName": "Acme",
        "category": "Productivity",
        "capabilities": ["Search notes", "Read notes"],
        "websiteURL": "https://example.com/notes",
        "supportURL": "https://example.com/support",
        "privacyPolicyURL": "https://example.com/privacy",
        "termsOfServiceURL": "https://example.com/terms",
        "defaultPrompt": [
          "Find my notes about the launch.",
          "Summarize the decisions in my launch notes.",
          "Open the project kickoff notes."
        ],
        "brandColor": "#2357C6",
        "brandColorDark": "#8CB4FF",
        "composerIcon": "./assets/icon.png",
        "composerIconDark": "./assets/icon-dark.png",
        "logo": "./assets/logo.png",
        "logoDark": "./assets/logo-dark.png",
        "screenshots": ["./assets/screenshot.png"]
      },
      "onboardingSkill": "./skills/get-started/SKILL.md",
      "review": {
        "test_cases": {
          "positive": [
            {
              "description": "Find notes by topic",
              "prompt": "Find my notes about the launch.",
              "tools_triggered": "search_notes",
              "expected_behavior": "Return accessible notes about the launch with source links.",
              "file_attachment_urls": [
                "https://example.com/review/launch-brief.pdf"
              ],
              "expected_output_url": "https://example.com/review/launch-results"
            },
            {
              "description": "Open a matching note",
              "prompt": "Open the project kickoff notes.",
              "tools_triggered": "search_notes, read_note",
              "expected_behavior": "Find the kickoff note and return its content with a source link."
            },
            {
              "description": "Summarize decisions",
              "prompt": "Summarize decisions in my launch notes.",
              "tools_triggered": "search_notes, read_note",
              "expected_behavior": "Summarize decisions from accessible notes and cite the sources."
            },
            {
              "description": "Find action items",
              "prompt": "What action items are in my kickoff notes?",
              "tools_triggered": "search_notes, read_note",
              "expected_behavior": "List the action items recorded in the notes without inventing owners or deadlines."
            },
            {
              "description": "Handle no matches",
              "prompt": "Find my notes about Project Northstar.",
              "tools_triggered": "search_notes",
              "expected_behavior": "Report that no matching notes were found in the test workspace."
            }
          ],
          "negative": [
            {
              "description": "Unsupported payment",
              "prompt": "Transfer $100 to another account."
            },
            {
              "description": "Unsupported deletion",
              "prompt": "Delete all my notes."
            },
            {
              "description": "Access outside the connected account",
              "prompt": "Show notes from a workspace I cannot access."
            }
          ]
        },
        "demo_recording_url": "https://example.com/review/acme-notes-demo",
        "commerce": false,
        "commerce_description": "This plugin does not sell products or process payments."
      },
      "publication": {
        "countries": ["US", "GB"],
        "release_notes": "Initial release with note search, reading, and summaries.",
        "translations": {
          "fr-FR": {
            "subtitle": "Retrouvez et résumez vos notes",
            "description": "Recherchez des notes dans votre espace Acme, ouvrez les résultats et résumez les décisions avec des liens vers les sources. Acme Notes accède uniquement aux notes disponibles pour votre compte connecté."
          },
          "ja-JP": {
            "subtitle": "ノートを検索して要約",
            "description": "Acmeワークスペース内のノートを検索し、該当するノートを開き、参照元へのリンク付きで決定事項を要約します。Acme Notesは、接続されたアカウントで閲覧できるノートにのみアクセスします。"
          }
        }
      }
    }
  }
}
```

Codex format, `.codex-plugin/plugin.json` (abbreviated here: `review` and `publication` are identical to the Agent Plugins example above; presentation fields move to the root `interface`; companion `.mcp.json` at the plugin root omits the schema and `type`: `{ "mcpServers": { "notes": { "url": "https://example.com/mcp" } } }`):

```json
{
  "name": "acme-notes",
  "version": "1.0.0",
  "description": "Search and summarize notes from your Acme workspace.",
  "author": { "name": "Acme", "email": "support@example.com", "url": "https://example.com" },
  "skills": "./skills/",
  "mcpServers": "./.mcp.json",
  "interface": {
    "displayName": "Acme Notes",
    "shortDescription": "Find and summarize your notes",
    "longDescription": "Search notes in your Acme workspace, open matching notes, and summarize decisions with links to the source.",
    "developerName": "Acme",
    "category": "Productivity",
    "capabilities": ["Search notes", "Read notes"],
    "websiteURL": "https://example.com/notes",
    "supportURL": "https://example.com/support",
    "privacyPolicyURL": "https://example.com/privacy",
    "termsOfServiceURL": "https://example.com/terms",
    "composerIcon": "./assets/icon.png",
    "logo": "./assets/logo.png"
  },
  "extensions": {
    "com.openai": {
      "onboardingSkill": "./skills/get-started/SKILL.md",
      "review": { "demo_recording_url": "https://example.com/review/acme-notes-demo", "commerce": false },
      "publication": { "countries": ["US", "GB"], "release_notes": "Initial release." }
    }
  }
}
```

## Options / Props

Layout mapping:

| Metadata | Agent Plugins: root `plugin.json` | Codex: `.codex-plugin/plugin.json` |
|----------|-----------------------------------|-------------------------------------|
| Package identity and publisher | Root fields | Root fields |
| Listing text, links, prompts, and images | `extensions.com.openai.interface` | `interface` |
| Getting started skill | `extensions.com.openai.onboardingSkill` | `extensions.com.openai.onboardingSkill` |
| Review and publication details | `extensions.com.openai.review` and `.publication` | `extensions.com.openai.review` and `.publication` |

Package identity and components (root of either manifest):

| Field | Requirement | Value and use |
|-------|-------------|---------------|
| `$schema` | Required for Agent Plugins; omit for Codex | `https://agent-plugins.org/schemas/1.0.0/plugin.schema.json` |
| `name` | Required | Stable identifier, at most 64 characters; lowercase letters, numbers, single hyphens for submission; separate from display name |
| `version` | Required for Codex; optional in portable schema | Release version such as 1.0.0; use an explicit semantic version for submission and updates |
| `description` | Required for Codex; optional for Agent Plugins | Package summary, at most 4000 characters |
| `author` | Required for Codex; optional for Agent Plugins | Object with name (at most 120 characters), optional email (320), optional HTTPS `url` (2048); Codex requires `author.name` |
| `homepage` | Optional | HTTPS project homepage, at most 2048 characters; set `interface.websiteURL` separately |
| `repository`, `license`, `keywords` | Optional | Source repository URL, license identifier, discovery terms |
| `extensions` | Optional | Settings grouped by namespace; OpenAI settings under `com.openai` |
| `skills` | Codex packages with skills | Codex only: relative directory path or array of paths, such as `"./skills/"`; portable packages discover `skills/` automatically |
| `mcpServers` | Codex packages with MCP servers | Codex only: `"./.mcp.json"`; portable packages discover root `mcp.json` automatically |
| `interface` (inside `extensions.com.openai` for portable, root for Codex) | Required for Codex; optional for Agent Plugins | Presentation object (listing metadata below) |
| `id` (same location) | Optional | Identity used by managed plugin catalogs; preserve an assigned value; ZIP uploads use the dashboard's plugin identity |

Listing metadata (`interface`; limits are for public submission):

| Field | Requirement | Type | Value and submission limit |
|-------|-------------|------|----------------------------|
| `displayName` | Required | String | At most 30 characters |
| `shortDescription` | Required | String | Subtitle; at most 30 characters |
| `longDescription` | Required | String | Tasks, intended users, limitations; at most 4000 characters |
| `developerName` | Required | String | At most 80 characters; directory name is set automatically from the verified developer identity |
| `category` | Required | String | Category title from the dashboard, such as Productivity or Developer Tools |
| `capabilities` | Required for Codex; optional for Agent Plugins | Array of strings | At most 20, at most 120 characters each; use `[]` if none |
| `websiteURL`, `supportURL`, `privacyPolicyURL`, `termsOfServiceURL` | Required for MCP review | String | HTTPS, at most 1024 characters each; no embedded credentials; `homepage` / `author.url` do not fill these |
| `defaultPrompt` | Optional | String or array of strings | Up to three starter prompts, at most 128 characters each; unique; omit app @mentions |
| `brandColor` | Optional | String | Light-theme `#RRGGBB`, at least 2:1 contrast against white |
| `brandColorDark` | Optional | String | Dark-theme `#RRGGBB`, at least 2:1 contrast against #212121; derived if only `brandColor` is supplied |
| `composerIcon`, `composerIconDark` | Required for Codex (light); dark optional | String | Relative path to the composer icon and its dark variant |
| `logo`, `logoDark` | Required for Codex; primary icon required for submission | String | Relative path to the primary listing icon and its dark variant |
| `screenshots` | Optional | Array of strings | Relative paths |

Icons: `./`-prefixed paths relative to the plugin root, every referenced file included. PNG, JPEG, WebP, SVG, at most 5 MiB each; icons and logos square and at least 48 by 48 pixels; raster at most 4096 pixels per dimension; SVG needs square numeric dimensions or a square `viewBox` of at least 48 by 48.

Onboarding, review, publication (directly under `extensions.com.openai`, not nested in `interface`):

| Field | Requirement | Type | Value and use |
|-------|-------------|------|---------------|
| `onboardingSkill` | Optional | String | Relative path to a packaged skill's SKILL.md; must refer to an included skill |
| `review.test_cases.positive` | Optional in ZIP; five required for initial MCP review | Array of objects | Positive cases for a plugin with exactly one MCP server |
| `review.test_cases.negative` | Optional in ZIP; three required for initial MCP review | Array of objects | Negative cases |
| `review.demo_recording_url` | Optional in ZIP; required for MCP review | String | Reviewer-accessible video walkthrough URL |
| `review.commerce` | Optional | boolean | Whether the app supports commerce; does not accept legal terms |
| `review.commerce_description` | Optional | String | Explanation of commerce behavior |
| `publication.countries` | Optional | Array of strings | Uppercase country codes allowlist (US, GB); omit to preserve existing targeting; `[]` removes country restrictions; applies when published, including skills-only |
| `publication.release_notes` | Optional | String | Notes describing this version's changes |
| `publication.translations` | Optional | Object or null | Map of locale keys to translated listing text |
| `publication.translations.<locale>.subtitle` | Optional | String or null | Up to 30 characters, single line |
| `publication.translations.<locale>.description` | Optional | String or null | Up to 4000 characters; may include `\n` |

Test case object fields:

| Field | Requirement | Type | Value and use |
|-------|-------------|------|---------------|
| `description` | Required | String | Behavior being checked; positive descriptions within 4000 characters |
| `prompt` | Required | String | User prompt the reviewer can try |
| `tools_triggered` | Required for positive cases | String | Expected tool names |
| `expected_behavior` | Required for positive cases | String | Observable expected result |
| `file_attachment_urls` | Optional | Array of strings | Links to files used by the case |
| `expected_output_url` | Optional | String | Link to an example of the expected result |

Authentication for submission (registration methods):

| Registration method | What to provide |
|---------------------|-----------------|
| Registered client (`provided`) | Declare client ID and token endpoint authentication method in `mcp.json`; enter the client secret in the portal when required |
| Dynamic Client Registration (`dcr`) | Registration endpoint through discovery or a `registrationUrl` override; no client credentials in the package |
| Client Identifier Metadata Document (`cimd`) | Configure CIMD preference; runtime can fall back to DCR |

## Notes

- Page restructured: the earlier form-section layout (Before you submit / Create a plugin submission / Complete the form with Info, MCP, Skills, Prompts, Testing, Global, Submit / Public publishing flow / Final checklist) was reorganized into the 4-step ZIP-upload flow above (checked 2026-10-17). Equivalent content now lives in: listing details and test cases in the manifest fields, MCP connect/scan in step 2, release notes and attestations in step 3. Tool-annotation guidance (`readOnlyHint` / `openWorldHint` / `destructiveHint`) is in `review-requirements.md` and `app-guidelines.md`.
- Step 1: organization owners can submit; other members need **Apps Management Write** (granted through organization roles). Complete individual or business verification to publish under your name or a company name; choose the verified **Developer identity** on upload. Include an MCP server in the initial ZIP: adding an MCP server to an existing skills-only plugin is not currently supported. If validation fails, fix package errors and re-upload; keep private credentials out of the ZIP.
- Step 2 Metadata & Skills: shows the uploaded package version; **Copy issues**, fix the package, **Upload plugin to fix issues**. Required skill scans must finish successfully before submission. **MCPs** shows the connected server and scanned tools; hosted tool changes are checked directly from the server.
- A package can declare multiple MCP servers but **only one MCP server can be connected per plugin**. Connect flow: open **MCPs**, select server, **Connect**, check **MCP Server URL** / **Authentication**, complete domain verification, authenticate, wait for the scan, resolve **Issues**, **Reconnect** / **Rescan**. For an approved local MCP plugin choose **Skills only** and follow the desktop-only instructions.
- Authentication for submission: the portal reads advanced settings from `mcp.json` (see `../build/package-plugin.md`, Configure MCP authentication); the connection panel displays them and has no advanced OAuth editor. To change: update `mcp.json`, **Upload new version**, inspect saved settings under **MCPs**; existing client registration can lock credential changes. For a registered client: register the callback URL with your provider; enter **OAuth Client Secret** in the portal (shown for a provided client unless `tokenEndpointAuthMethod` is `"none"`). `mcp.json` rejects `clientSecret`. If discovery lacks endpoints, add `authorizationUrl` / `tokenUrl` overrides.
- Authentication limitations: the portal connection form supports no authentication, OAuth, and mixed unauthenticated/OAuth. Although the manifest schema accepts API-key authentication (bearer, Basic, custom header), the portal has no API-key connection flow or bearer-token input; uploading an API-key declaration alone does not complete MCP setup (contact OpenAI). Do not embed a token in server `headers` (public submission rejects nonempty server headers) and do not configure a protected server as `type: "none"`. `private_key_jwt` is accepted by the schema for a provided client but does not configure signing keys; confirm setup with OpenAI first.
- Domain verification: return only the exact token as plain text (not JSON, not a list). The challenge base must be an HTTPS origin on the MCP hostname or an eligible parent domain; paths are ignored. If another plugin uses the same challenge URL, use an allowed parent origin or a distinct hostname rather than replacing its token; contact support if neither is possible.
- Step 3: required setup and validation errors must be resolved first; other automated findings can go to the review team. Prepare reviewer credentials (dedicated test account, login URL, workspace/tenant details, sign-in instructions; sample data; no MFA, email/SMS codes, magic links, or private-network access), five positive cases, three negative cases, a video walkthrough, release notes. Credentials are entered separately in **Review information -> Review details** and stay outside the package: ZIP metadata rejects `test_credentials` and `reviewer_instructions`. Fields marked as managed by the ZIP are edited in the package and re-uploaded. Only one review can be active per plugin; cancel or wait before uploading a replacement. To appeal a rejection, reply to the rejection email.
- Test cases: initial MCP app review requires exactly five positive and three negative; upload accepts partial lists. For multiple MCP servers, declare cases on each server in the MCP configuration; plugin-level `review.test_cases` requires exactly one server and cannot be combined with per-server declarations. Imported cases are read-only in the dashboard. Omitting `test_cases` or null preserves existing cases; `test_cases: {}` clears both lists. For scalar review fields and `release_notes`, omission or null preserves saved values; an empty string clears text; explicit package values are reapplied at submit. Keep `commerce` / `commerce_description` in review, not publication.
- Packaging constraints: ZIP packages containing app references (`apps` / `.app.json`) or lifecycle hooks cannot currently be submitted; declare MCP server URLs in the MCP configuration and complete setup in the dashboard. Portable packages always discover `skills/` and root `mcp.json`; a `skills` / `mcpServers` declaration in the extension or compatibility overlay cannot replace, disable, or add to them. If `extensions.com.openai` is present, OpenAI ignores `.codex-plugin/plugin.json` settings (not merged).
- Step 4: open the approved package version and select **Publish plugin**; publishing an update replaces the previous package version.
- Update your published plugin: upload a new ZIP to the existing plugin (metadata, assets, bundled skills). From the previous submission form, download the existing plugin via **Download release ZIP** (published package version, **...** menu). Update contents and version, create a complete ZIP, **Upload plugin to make changes**, resolve findings, publish. Adding/removing skills uses the same plugin. Changing an existing MCP server's URL requires contacting support. The App Review page distinguishes the cases: an origin change (scheme, hostname, or port) requires a new plugin, while an endpoint-path-only change uses the normal new-version flow (see review-requirements.md, Other changes / Submitting new versions for review); contact support when the ZIP update flow cannot apply the change.
- Update to your MCP server: OpenAI scans the hosted MCP server daily after initial publication; eligible updates become available after automated checks pass, without a new package version or separate publish. To scan immediately: deploy, open the plugin, **MCPs**, the connected server, **Issues**, **Rescan**. Rescan may be unavailable during another scan, an active appeal, or when the plugin is not eligible.
- Find and resolve tool issues: open **Issues**, select the tool, read **Issues found**, compare **Held update** with **Live definition**, **Copy issues**, fix and deploy, **Rescan**. Tool changes are evaluated independently; new tools stay unavailable until approved; existing tools keep previously approved metadata while an update is held; removals take effect after a scan. Keep the server compatible with the currently approved schemas.
- Appeal an automated finding: select **Appeal**; the review team considers the held tool changes from that scan together; correcting and rescanning is usually faster. Automatic MCP updates pause during an appeal; **Withdraw appeal** to make changes. Appeals cover held tool changes, not package changes, authentication, or shared server instructions.
- Translate listing text: keep English in the base listing fields; en-US translation not required. Locale keys such as `fr-FR` / `ja-JP`; each locale can have `subtitle`, `description`, or both (or null). Text must contain more than whitespace; tabs and other unsupported control characters are rejected; limits apply to exact text including leading/trailing spaces. Translations are validated and retained in the bundle but do not yet change text shown in the Plugins Directory or listing API responses.
- Metadata validation: a package upload can accept longer draft text than the submission limits; a successful upload does not mean the listing is ready to submit. Skills-only metadata validation does not require all four listing URLs, review cases, or a demo recording.
- For metadata-specific maintenance rules (continuous review), see `review-requirements.md`.

## Related

- [Review Requirements](./review-requirements.md)
- [Submission Errors](./submission-errors.md)
- [Connect and Test](./connect-and-test.md)
- [App Guidelines](./app-guidelines.md)
- [Package your plugin](../build/package-plugin.md)
