# Plugin Guidelines

Developer guidelines covering the MCP server and optional UI in a plugin, and the minimum standard a published plugin must meet to remain available in the universal directory shared by ChatGPT and Codex. For the complete submission flow (skills, portal steps, review, approval, publishing), see `submission.md`. Also review the optional UI guidelines for interaction, layout, and design patterns.

## Plugin fundamentals

### Purpose and originality

Plugins should serve a clear purpose, reliably do what they promise, and provide functionality/workflows not natively supported by the products' built-in capabilities, meaningfully helping satisfy common user intents. Only use owned or permitted intellectual property. No misleading/copycat designs, impersonation, spam, or static frames with no meaningful interaction. Plugins must not imply they are made or endorsed by OpenAI.

### Quality and reliability

Plugins must behave predictably and reliably; results must be accurate and relevant. Errors, including unexpected ones, must have clear messaging or fallback behaviors. Thoroughly test the MCP server, tools, and optional UI across a wide range of scenarios before submitting. Trial or demo plugins are not accepted.

### Plugin name, description, and optional screenshots

Names and descriptions must be clear, accurate, straightforward. Avoid overly generic names, especially single-word dictionary terms not tied to the brand. Screenshots are optional (only for plugins with UI) — don't submit screenshots for plugins without UI; screenshots must accurately represent functionality and meet required dimensions.

### Tools

#### Clear and accurate tool names

- Unique within the MCP server.
- Plain language directly reflecting the action, ideally a verb (e.g. `get_order_status`).
- Avoid misleading, overly promotional, or comparative language (e.g. `pick_me`, `best`, `official`).

#### Descriptions that match behavior

- Describe what the tool does.
- Must not favor/disparage other plugins or services, or try to influence tool selection over competitors.
- Must not recommend overly broad triggering beyond explicit user intent/purpose.
- Unclear or incomplete descriptions can cause rejection.

#### Correct annotation

- `readOnlyHint` — label tools that only retrieve/list data and don't change anything outside the conversation.
- Write or destructive tools (create/update/delete/post/send) must explicitly set `readOnlyHint` and `destructiveHint`.
- Tools interacting with external systems, accounts, public platforms, or creating publicly-visible content must set `openWorldHint`.
- Incorrect/missing labels are a common rejection cause — double-check all three annotations and provide a detailed justification for each.

#### Minimal and purpose-driven inputs

- Input fields must directly relate to the tool's stated purpose.
- Don't request full conversation history, raw chat transcripts, or broad contextual fields "just in case." A brief task-specific user-intent field is allowed only when it meaningfully improves execution without expanding data collection beyond what's reasonably necessary and disclosed in the privacy policy.
- Rely on coarse system-provided geographic location; don't request precise location (GPS coordinates, addresses).

#### Predictable, auditable behavior

- No hidden or implicit side effects.
- If a tool sends data outside the current environment (posting content, sending messages), this must be clear from the tool definition.
- Tools should be safe to retry, or explicitly indicate when retries may cause repeated effects.

### Authentication and permissions

Authentication flows must be transparent and explicit; users must be informed of all requested permissions, limited to what's necessary.

#### Test credentials

Provide a login and password for a fully featured demo account with sample data. Plugins requiring additional login steps (new account sign-up, 2FA through an inaccessible account) are rejected.

## Commerce and monetization

Plugins may conduct commerce **only for physical goods**. Selling digital products or services (subscriptions, digital content, tokens, credits), directly or via freemium upsells, is not allowed.

Users may sign in to an existing paid account and access already-included features. Plugins must not display subscription plans, initiate new subscriptions, or promote upgrades. If a feature requires a different plan/entitlement, the plugin may explain that (informational only, no checkout/transaction flow).

Plugins may:

- Explain that a feature is unavailable on the user's current plan/entitlement.
- Link to an informational page describing available plans/entitlement options.

Plugins may not:

- Link directly to a checkout or other transactional page.
- Link to a page that explicitly initiates upgrade/subscribe/purchase.

### Prohibited goods and services

Plugins may not sell, promote, facilitate, or meaningfully enable:

- **Adult content & sexual services**: pornography, explicit sexual media, live-cam services, adult subscriptions; sex toys/dolls, BDSM gear, fetish products.
- **Gambling**: real-money gambling, casino credits, sportsbook wagers, crypto-casino tokens.
- **Illegal or regulated drugs**: marijuana/THC products, psilocybin, illegal substances; CBD exceeding legal THC limits.
- **Drug paraphernalia**: bongs, dab rigs, drug-use scales, cannabis grow equipment marketed for drugs.
- **Prescription & age-restricted medications**: prescription-only drugs (insulin, antibiotics, Ozempic, opioids); age-restricted Rx (testosterone, HGH, fertility hormones).
- **Illicit goods**: counterfeit/replica products; stolen goods; financial-fraud tools (skimmers, fake POS); piracy tools/cracked software; wildlife/environmental contraband.
- **Malware, spyware & surveillance**: malware, ransomware, keyloggers, stalkerware; covert surveillance devices (spy cameras, IMSI catchers, hidden trackers).
- **Tobacco & nicotine**: tobacco products; nicotine products (vapes, e-liquids, pouches).
- **Weapons & harmful materials**: firearms, ammunition, firearm parts; explosives, fireworks, bomb-making materials; illegal/age-restricted weapons (switchblades, brass knuckles, banned crossbows); self-defense weapons (pepper spray, stun guns, tasers); extremist merchandise/propaganda.

Also prohibited: fake IDs/forged documents/document falsification; debt relief, credit repair, or credit-score manipulation schemes; unregulated/deceptive/abusive financial services; lending, advance-fee, or exploitative credit-building schemes; speculative/deceptive/abusive crypto or NFT offerings; execution of money transfers, crypto transfers, or investment trades; government-service abuse/impersonation/benefit manipulation; identity theft, impersonation, or misuse-enabling identity-monitoring services; legal or quasi-legal services facilitating fraud/evasion/misrepresentation; negative-option billing, telemarketing, or consent-bypass schemes; high-chargeback, fraud-prone, or abusive travel services.

### Checkout

Plugins should use external checkout, directing users to complete purchases on the developer's own domain. Instant Checkout (beta) is currently limited to select marketplace partners. Until broadly available, standard external checkout is required — no other third-party checkout solutions may be embedded or hosted within the plugin UI.

### Advertising

Plugins must not serve advertisements and must not exist primarily as an advertising vehicle — every plugin must deliver clear, legitimate standalone functionality.

## Safety

### Usage policies

Do not engage in or facilitate activities prohibited under OpenAI usage policies; avoid high-risk behaviors exposing users to harm, fraud, or misuse. Stay current with evolving policy requirements — previously approved plugins later found in violation may be removed.

### Appropriateness

Plugins must be suitable for general audiences including ages 13-17; may not explicitly target children under 13. Mature (18+) experiences await appropriate age verification and controls.

### Respect user intent

Address the user's request directly; don't insert unrelated content, redirect the interaction, or collect data beyond what's reasonably necessary and consistent with the privacy policy.

### Fair play

No descriptions, titles, tool annotations, or other model-readable fields (tool or plugin level) that manipulate model selection of plugins/tools (e.g. instructing the model to prefer this plugin over others) or interfere with fair discovery. Descriptions must accurately reflect value without disparaging alternatives.

### Third-party content and integrations

- **Authorized access**: no scraping external websites, relaying queries, or integrating with third-party APIs without proper authorization and compliance with that party's terms.
- **Unofficial connectors**: plugins that primarily function as unofficial connectors/pass-through intermediary layers to third-party services cannot be approved.
- **Circumvention**: don't bypass API restrictions, rate limits, or access controls imposed by the third party.

### Iframes and embedded pages

Plugins with UI can opt in to iframe usage via `frameDomains` in the resource CSP (`_meta.ui.csp.frameDomains`), but this is discouraged. If used: intended only when embedding a third-party experience is essential (notebook, IDE, similar environment); such plugins receive extra manual review and are often not approved for broad distribution; any developer can test `frameDomains` in developer mode, but public-listing approval is limited to trusted scenarios.

## Privacy

### Privacy policy

Submissions must include a clear, published privacy policy covering at minimum: categories of personal data collected, purposes of use, categories of recipients, data retention timelines, and user controls offered. Follow the policy at all times; users can review it before installing.

### Data collection

- **Collection minimization**: gather only the minimum data required; inputs specific, narrowly scoped, explicitly linked to the task — no "just in case" fields or broad profile data.
- **Response minimization**: tool responses return only data directly relevant to the request and the tool's purpose — no diagnostic/telemetry/internal identifiers (session/trace/request IDs, timestamps, logging metadata) unless strictly required.
- **Restricted data** — do not collect/solicit/process: PCI DSS-covered payment card information; protected health information (PHI); government identifiers (e.g. SSNs); access credentials/authentication secrets (API keys, MFA/OTP codes, passwords).
- **Regulated sensitive data**: do not collect personal data considered "sensitive"/"special category" in the relevant jurisdiction unless strictly necessary for the tool's stated function, with legally adequate user consent, and explicit/prominent disclosure at or before collection.
- **Data boundaries**: avoid requesting raw location fields in the input schema — obtain location via the client's controlled side channel (environment metadata or a referenced resource) instead; the MCP server must not pull/reconstruct/infer the full chat log from the client or elsewhere, operating only on explicitly sent snippets/resources.

### Transparency and user control

- **Data practices**: no surveillance, tracking, or behavioral profiling (including metadata like timestamps, IP addresses, query patterns) unless explicitly disclosed, narrowly scoped, subject to meaningful user control, and aligned with OpenAI's usage policies.
- **Accurate action labels**: mark any tool that changes external state (create/modify/delete) as a write action; mark read-only only if side-effect-free and safe to retry. Destructive actions require clear labels and friction (e.g. confirmation).
- **Preventing data exfiltration**: any action sending data outside the current boundary (posting messages, sending emails, uploading files) must be surfaced as a write action so the client can require confirmation or run in preview mode.

## Developer verification

### Verification

All submissions must come from verified individuals or organizations, confirmed via the OpenAI Platform Dashboard general settings. Misrepresentation, hidden behavior, or attempts to game the system may result in program removal.

### Support contact details

Provide accurate, up-to-date customer support contact details where end users can reach the developer for help.

## Notes

- These guidelines are the minimum bar for staying in the directory; plugins with strong real-world utility and high user satisfaction may be eligible for enhanced distribution (directory placement, proactive suggestions) — developers cannot request this directly.

## Related

- [Submission](./submission.md)
- [Review Requirements](./review-requirements.md)
