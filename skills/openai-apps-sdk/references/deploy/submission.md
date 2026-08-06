# Submit Plugins

Use the plugin submission portal to submit a plugin for review when ready to publish it for public use. A plugin can contain skills, an MCP server, or both:

- A skills-only plugin that packages reusable workflows.
- An MCP-only plugin (custom UI optional).
- A plugin combining an MCP server with uploaded or MCP-imported skills.

If the portal returns an error code, use `submission-errors.md` to find the matching requirement.

## Before you submit

### Submit the MCP server, not an existing integration reference

You cannot submit a plugin that references an existing, already-published integration. If the plugin's MCP server already exists in ChatGPT or Codex, submit it from scratch as a new MCP-backed plugin submission — the portal scans and validates the tool metadata from the submitted server details.

### Get plugin submission access

Requires an organization role with plugin submission write access, labeled **Apps Management** in the Platform:

1. Open OpenAI Platform roles settings.
2. Select the organization that owns the plugin.
3. Open or create the submitter's role.
4. Set **Apps Management** to **Write**.
5. Save and assign the role.
6. Reload the plugin submission portal.

Organization owners already have these permissions; non-owner submitters need write access to create/edit/submit drafts and read access to view drafts/review status.

### Verify your developer or business identity

Every public submission needs a verified developer or business identity in the OpenAI Platform, matching the name, website, support contact, privacy policy, and terms in the public listing.

1. Sign in to the OpenAI Platform.
2. Select the publishing organization.
3. Open organization settings.
4. Complete **individual verification** (personal name) or **business verification** (company name).
5. Select the verified identity in the **Developer Identity** field on the submission form.

Reviewers may reject submissions with unverified or mismatched publisher identity. If the identity shows verified but the form doesn't recognize it, confirm you're submitting from the same org/project where it was verified, and that the submitter has **Apps Management** write access.

### Prepare required materials

| Material | What to prepare |
|---|---|
| Listing details | Plugin name, short description, long description, logo, category, website, support URL, privacy policy URL, terms URL |
| Developer identity | Verified individual or business identity in the OpenAI Platform |
| MCP server | For MCP plugins: public MCP server URL, domain verification access, authentication details, demo credentials if needed, CSP, accurate tool metadata |
| Tool annotations | For MCP plugins: `readOnlyHint`, `openWorldHint`, `destructiveHint` for every tool |
| Skills | Final skill bundle, or an MCP server exposing static skills for **Scan Tools** to import |
| Prompts | Starter prompts showing useful, realistic workflows |
| Test cases | Five positive and three negative test cases with clear expected behavior |
| Availability | Countries/regions where the plugin should be available |
| Release notes | Summary of what's submitted and what changed since any prior version |

## Create a plugin submission

1. Open the plugin submission portal.
2. Select **Create plugin**.
3. Choose the submission type: **Skills only**, or **With MCP** (MCP-only or MCP + skills).

The portal saves the submission as a draft while completing the form.

## Complete the form

### Info

- **Plugin name** — customer-facing product/workflow name.
- **Descriptions** — short (concise) and long (workflow details).
- **Developer Identity** — verified individual or business identity.
- **Logo and category** — production-ready brand assets.
- **Website, support, privacy, and terms URLs** — public URLs matching the publisher.

Review MCP responses against the privacy policy before submitting; remove unnecessary personal data, auth secrets, debug payloads, internal identifiers, and undisclosed user-related fields.

### MCP

1. Choose the MCP server URL type: **Universal** (one fixed URL for all users/orgs) or **Template** (only when OpenAI has approved a workspace-specific URL).
2. Enter the URL(s): Universal → production **MCP Server URL**; Template → **Example MCP Server URL** + **Template MCP Server URL**.
3. Configure authentication and provide reviewer-ready demo credentials if sign-in is required.
4. Define a CSP that allows the exact domains the UI fetches from.
5. Complete domain verification if the portal shows **Domain not verified** — host the exact token at `/.well-known/openai-apps-challenge`.
6. Select **Scan Tools**.
7. Review discovered tools, imported skills, domains, validation output, and tool metadata.
8. Fix issues, deploy, and rescan as needed.

#### Template MCP server URLs

Most plugins should use **Universal**. Template URLs are supported only for trusted developers with an established OpenAI relationship. `{name}` placeholders start with a letter, contain only letters/numbers/underscores, and are unique within the URL. The example URL must replace each placeholder with a real, publicly accessible value.

```text
Example MCP Server URL: https://acme.example.com/mcp
Template MCP Server URL: https://{workspace}.example.com/mcp
```

Do not enter an existing integration ID or point the portal at an existing published integration — the submission must provide MCP server URL and review materials directly, even for a server that already backs a published integration.

#### Domain verification

Place the exact verification token at:

```text
https://<challenge-base-host>/.well-known/openai-apps-challenge
```

The challenge endpoint must return only that plugin's token (no JSON, no list of tokens, no multiple tokens from the same URL). **Challenge Base URL** is an optional HTTPS origin (the MCP host name or a parent host name; paths are ignored) telling the portal where to check the token.

If two plugins with MCP share the same host name but differ only by path, they share the same default challenge URL and cannot be verified separately via different tenant paths (path is ignored) — use a parent origin, a distinct MCP host name, or contact OpenAI support. Do not replace another plugin's existing challenge token unless it no longer needs it.

### Tool metadata and annotations

Every tool should have clear names, descriptions, schemas, and output structure; add output schemas where they help.

| Annotation | Use it when |
|---|---|
| `readOnlyHint` | `true` only when the tool fetches/looks up/lists/retrieves/previews/computes information without changing anything; `false` if it can create/update/delete/send/enqueue/run jobs/start workflows/write logs or otherwise change state |
| `openWorldHint` | For write tools: `true` if it can change publicly visible internet state (posting online, sending external messages, publishing content, pushing code, submitting third-party forms); `false` only if entirely closed/private and can't change public internet state |
| `destructiveHint` | For write tools: `true` if it can delete, overwrite, revoke access, or send unrevocable messages/transactions, or cause another irreversible side effect; otherwise `false` |

### Skills

Add skills either by:

- Uploading the final skill bundle (skills-only or skills-plus-MCP submissions).
- Importing static skills from the MCP server — **Scan Tools** imports them into the draft.

Use the same file tree and instructions tested locally. Each skill should include a clear `SKILL.md` with trigger conditions and task instructions, referenced scripts/templates/assets, and minimal scoped instructions.

OpenAI scans uploaded and MCP-imported skills for policy compliance and security risks (sensitive information, unnecessary access requests, instructions conflicting with safe/expected behavior); failures may block submission or require remediation.

MCP-imported skills are a submission-time snapshot — published plugins do not update them live. After changing a skill on the server, select **Scan Tools** again and review before submitting a new version.

To remove all MCP-imported skills: keep the skills extension enabled, return `{ "skills": [] }` without a `nextCursor`, and scan again. Removing the extension or returning an invalid response preserves the previous snapshot.

### Prompts

Add starter prompts showing the plugin's highest-value workflows — specific enough to show when to use the plugin, general enough to adapt. Examples: "Investigate checkout errors from the last release and summarize likely root causes."; "Create a P1 incident brief from the latest support tickets and related deploys."; "Review unsuccessful deployment logs and recommend the next debugging step."

### Testing

Submit at least five positive and three negative test cases.

Positive test case: user prompt, expected tool/skill/workflow behavior, expected result shape, test account/fixture data.

Negative test case: user prompt/scenario, expected refusal/clarification/safe fallback behavior, why the plugin shouldn't act.

Demo credentials must complete every test without MFA, SMS, email confirmation, or private-network access.

### Global

Choose countries/regions where the plugin should be available — only locations where the publisher, product, support, and legal terms are ready.

### Submit

Review the full draft. In release notes, summarize: what the plugin does; whether it's an initial submission or update; what changed since the prior submitted version; anything reviewers should know about test credentials/expected data/setup. Complete policy attestations only after confirming accuracy, then select **Submit for Review**.

## Public publishing flow

1. Submit through the portal (starts review; doesn't publish immediately).
2. OpenAI reviews (timelines may vary; no expedited review).
3. After approval, the developer chooses when to publish, from the portal.
4. After publication, the plugin appears in the universal Plugins Directory shared by ChatGPT and Codex.

MCP-only, skills-only, and skills-plus-MCP plugins all appear in the Plugins Directory.

## Notes

- For metadata-specific maintenance rules (how published MCP metadata versions work), see `review-requirements.md`.

## Final checklist

- Submitter has **Apps Management** write access.
- Publisher has a verified developer or business identity.
- MCP server uses a public, production URL.
- Plugins with UI define a CSP for the exact domains the component fetches from.
- Reviewer credentials work without MFA, email confirmation, SMS confirmation, or private-network access.
- Tool names, descriptions, schemas, and annotations match actual behavior.
- Every tool has accurate `readOnlyHint`, `openWorldHint`, `destructiveHint` values.
- Tool responses don't include unnecessary personal data, auth secrets, debug payloads, internal identifiers, or undisclosed user-related fields.
- Skills tested locally with the final file tree; MCP-imported skills match the latest **Scan Tools** snapshot.
- Starter prompts show realistic user workflows.
- Five positive and three negative test cases included.
- Privacy policy, terms, support, and website URLs are public and match the publisher identity.

## Related

- [Review Requirements](./review-requirements.md)
- [Submission Errors](./submission-errors.md)
- [Connect and Test](./connect-and-test.md)
- [App Guidelines](./app-guidelines.md)
