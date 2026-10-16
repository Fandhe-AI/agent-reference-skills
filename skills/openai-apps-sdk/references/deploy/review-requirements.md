# Remote MCP server review requirements

Requirements that apply when a plugin includes a remote MCP server: organization verification, management permissions, server requirements, review snapshots, continuous review, and version maintenance. Submit the complete plugin (skills, MCP server, optional UI) through the plugin submission portal.

Only submit the plugin if you intend it to be publicly available in the countries you define during submission. For private or workspace-only use, use a custom MCP server connection instead.

## Before you submit the plugin

### Organization verification

Before submitting a plugin with MCP, complete identity verification in the OpenAI Platform Dashboard for the name you plan to publish under.

- Publish under your own name: complete **individual verification**.
- Publish under a business name: complete **business verification**.

Publishing under an unverified individual or business name is rejected during review.

### Plugin submission permissions

- `api.apps.write` — create plugin drafts with MCP and submit them for review.
- `api.apps.read` — view drafts and review status in the Dashboard.

Organization owners automatically have both permissions and can grant them to non-owners through roles.

### MCP server requirements

- The MCP server is hosted on a publicly accessible domain.
- Not using a local or testing endpoint.
- If the server returns UI, a content security policy (CSP) is defined that allows the exact domains the component fetches from.

### Template MCP server URLs

Most plugins should submit a universal MCP server URL (a single hosted endpoint for all users/organizations). Choose **Template** only when the plugin uses workspace-specific MCP server URLs (per-tenant/workspace endpoints). Template-based URLs are supported only for trusted developers with an established OpenAI relationship.

Template submissions require:

- **Example MCP Server URL** — a concrete, working MCP endpoint for review and automated checks (not a placeholder).
- **Template MCP Server URL** — the URL pattern describing which part changes across customer workspaces, using `{name}` placeholders (start with a letter, contain only letters/numbers/underscores, unique per URL).

```text
Example MCP Server URL: https://acme.example.com/mcp
Template MCP Server URL: https://{workspace}.example.com/mcp
```

The concrete example URL must match the template pattern after replacing each placeholder with a real value.

## Submit for review

1. In the plugin submission portal, add MCP server details (and OAuth credentials if OAuth is selected), then select **Scan Tools**.
2. Complete the required fields (plugin name, logo, description, company and privacy policy URLs, MCP and tool information, test prompts and responses, localization). Provide screenshots only if the plugin has UI.
3. Select **Submit for review**.

### Metadata stored during tool scanning

**Scan Tools** imports metadata advertised by the MCP endpoint into the draft: tool names, titles, descriptions, input/output schemas, security schemes, `_meta` fields, linked UI resource metadata (including CSP settings), and MCP server `instructions`. The dashboard displays the annotation values provided by the server — submission justifications explain why those values match tool behavior, they don't override the annotations. If a server advertises `readOnlyHint: false`, describing the tool as "functionally read-only" in the justification doesn't make it read-only; update the server annotation instead, redeploy, rescan, and resubmit.

Each organization can publish multiple unique plugins with MCP. For each MCP server integration, only one version may be published and only one may be in review at a time. To change a submission after submitting, withdraw via **Cancel Review** and resubmit the same version draft.

Projects with EU data residency currently cannot submit plugins with MCP servers for review; use a project with global data residency.

## Review and approval

### Reviews and checks

OpenAI may perform automated scans or manual reviews to understand how the plugin works and whether it may conflict with policies.

### Approval, rejection, and appeals

Approved plugins can be published from the submission portal. If rejected or removed because of the MCP server, tools, or UI, feedback on unsuccessful checks is provided; after fixing, resubmit. To appeal, reply to the rejection email with a clear rationale and any new information.

### Review and approval FAQs — common rejection reasons

- **Unable to connect to the MCP server using the given URL/test credentials**
  - The review team must be able to log into a demo account with no further configuration.
  - No MFA (SMS codes, email verification, or other verification schemes).
  - Credentials must work outside company/internal networks and must not be expired.
- **Test cases did not produce correct results**
  - Rerun each test case; outputs must match expected results with no UI errors.
  - Textual output must closely adhere to the request without extraneous or personally identifying information.
  - All test cases must pass on every supported ChatGPT/Codex surface where the plugin will be available.
- **Undisclosed user-related data types returned**
  - Audit MCP tool responses; remove unnecessary PII, telemetry/internal identifiers (session/trace/request IDs, timestamps, internal account IDs, logs), and auth secrets.
  - Update the privacy policy to disclose all categories of personal data collected/processed/returned, or remove fields that aren't needed.
  - A necessary user identifier must be explicitly requested and tied to user intent, not looked up and echoed by default.
- **Tool hint annotations don't match tool behavior**
  - `readOnlyHint`: `true` only for fetch/lookup/list/retrieve with no state change; `false` if the tool creates/updates/deletes/triggers actions.
  - `destructiveHint`: `true` if the tool can cause irreversible outcomes (deletion, overwrite, unrevocable sends, revoking access), with justification of what's irreversible and what safeguards exist; otherwise `false`.
  - `openWorldHint`: `true` if the tool writes to or changes publicly visible internet state (posting, sending external messages, publishing, pushing code, submitting third-party forms); `false` only if entirely closed/private and cannot change public internet state.

## Publication and distribution

- **Publish**: once approved, publish from the submission portal.
- **Discovery**: users find the plugin via direct link or search in the universal directory shared by ChatGPT and Codex. Enhanced distribution (directory placement, proactive suggestions) is limited and cannot be requested by developers.
- Before any press release or public announcement, contact press@openai.com to coordinate.

## Ongoing maintenance

### How published MCP metadata versions work

Treat the metadata exposed by the MCP server as a versioned API contract. Scanning stores the discovered metadata with the draft version; submitting sends that snapshot for review. After publication, continuous review updates tool definitions without requiring a new plugin version. Tool calls and UI resources continue to use the live MCP server.

### Continuous review and tool updates

OpenAI periodically fetches the MCP server's tools and compares them with the published definitions, including descriptions, schemas, and annotations.

- **Deleted tools**: removed from the published tool list as soon as a scan detects the deletion, without waiting for automated checks.
- **New tools**: made available after they pass automated checks; until then they are not available to users.
- **Changed tools**: the previous definition stays live until the updated definition passes automated checks or a scan detects that the tool was removed. Passing updates replace the previous definition automatically.

Each tool passes independently. Example: add `create_note`, change `search` to accept a `folder` parameter, and delete `archive_note`. The next scan removes `archive_note` immediately; if `create_note` passes but the `search` update is held, users get `create_note` and keep the old `search` definition without `folder`.

Keep the server compatible with the live definition while an update is held. OpenAI retains the definition, not a copy of the server implementation. An incomplete check does not approve an update, even if it has no findings.

### Other changes

| Change | Required action | When users see the change |
|---|---|---|
| Tool security schemes, tool `_meta` fields, UI resource references, or linked resource metadata, including CSP settings | Deploy the change; reviewed with the tool definition through continuous review | After the updated tool definition passes automated checks |
| MCP server `instructions` | Deploy the change; shared instructions are reviewed with the affected tools | After the required checks complete without holding existing tool updates or finding issues in the instructions |
| Backward-compatible content update served from the same published UI resource URI | Deploy the content update; no scan/submit/publish of a new version needed if URI and published contract stay compatible | After deployment (ChatGPT may serve cached resource contents for up to one hour) |
| Server-only fix or change to live tool results, including result `_meta` or business data | Deploy the server change; no new version needed if the published contract is preserved | Through the live endpoint after deployment |
| MCP server origin (`scheme`, `hostname`, or `port`) | Create a new plugin and complete scan, submission, review, publication; endpoint-path-only changes use the normal new-version flow | After publishing the new plugin or approved version |

Server changes take effect before a scan can discover or approve them. Keep existing input schemas and each published UI resource URI working during that gap. If a deployment breaks the live contract, roll back the server change rather than waiting for review.

### Submitting new versions for review

To change submitted plugin information or imported skills, create a new draft version of the existing plugin and resubmit it for review. Continuous tool review does not replace this process. Each resubmission starts a new review; describe what changed in the release notes. The MCP server origin can't change between versions of the same plugin (submit a new plugin for a new origin); the endpoint path can change in a new version. If additional changes are made between submission and approval, cancel the review from the portal and resubmit. Once an update is approved, publishing it replaces the previous version.

### Changing published metadata versions and removing the plugin

To replace a published version, publish an approved replacement directly from the portal; keep the current version published while the replacement is under review, and no prior removal from publication is needed. Remove the current version from publication only when intending to remove the plugin from public visibility (without a published replacement the plugin becomes unavailable). Delete the plugin from the submission portal to remove it from the organization and from ChatGPT/Codex entirely.

### Maintenance requirements

Plugins may be removed if inactive, unstable, or non-compliant, at any time and without notice (legal, security, or policy reasons).

## Notes

- No estimated review or update timelines are provided; do not contact support to request expedited review.
- Removed/reworded in the official docs (fetched 2026-10-17): the earlier statement that tool list / names / descriptions / schemas / annotations / security schemes / `_meta` / `instructions` changes always require a new version (deploy, update draft, scan, submit, publish) and the paragraph "Breaking changes to a published MCP server contract are unsupported" with its 3-step list (add new tools while honoring published contracts, submit as new version, publish and keep old contracts). Continuous review now updates tool definitions without a new plugin version. What remains: roll back a deployment that breaks the live contract rather than waiting for review.
- If the documentation does not answer a question before, during, or after submission, contact OpenAI support and include the ID shown in the plugin submission portal.

## Related

- [Connect and Test](./connect-and-test.md)
- [Submission](./submission.md)
- [Submission Errors](./submission-errors.md)
- [App Guidelines](./app-guidelines.md)
