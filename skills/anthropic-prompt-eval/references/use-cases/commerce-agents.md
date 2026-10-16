<!-- source: https://platform.claude.com/docs/en/about-claude/use-case-guides/commerce-agents / last verified: 2026-10-17 -->

# Commerce agent

Guide to building a shopping agent (customer-facing, inside your app) and a merchant agent (for the people running the store) on Claude, using Claude for commerce, an open-source blueprint with working implementations on the Messages API, the Claude Agent SDK, and Claude Managed Agents. Code, setup, and safety docs live in the [Claude for commerce repository](https://github.com/anthropics/commerce-agents); design rationale is in the engineering post [A guide to the anatomy of effective commerce agents](https://claude.com/blog/the-anatomy-of-effective-commerce-agents).

## Signature / Usage

Claude Code plugin commands shipped with the blueprint (the plugin reads the cloned repository as its reference):

```text
/scaffold-commerce-agent   # interview about your stack, then scaffold a shopping agent, a merchant agent, or both
/add-commerce-flow         # add one flow to an existing agent: copy its skill, wire its tools, write first eval cases
/author-commerce-evals     # build an eval suite with a runner, first cases against your catalog, and a replay gate for CI
/review-commerce-agent     # map an agent you already run, compare with the reference, convert the parts you pick
```

## Options / Props

Shopping vs. merchant agent:

| Name | Type | Description |
| --- | --- | --- |
| Shopping agent | agent | Lives inside your app; reaches catalog, cart, preferences, order, policy, and fulfillment services through a single backend interface you implement. No method on that interface places an order or moves money. Five on-demand skills: search and discovery, purchase research, planning toward a goal, customer care, memory and personalization. |
| Merchant agent | agent | Supports store operators; reaches analytics, catalog, inventory, pricing, and campaign systems through its own backend interface. Five skills: performance insights, inventory and operations, catalog and listings, pricing and promotions, marketing campaigns. |

Vertical examples (each includes a customer storefront and a merchant portal over fictional data): Retail, Travel, Telecom, Entertainment.

Runtimes: Messages API, Claude Agent SDK, Claude Managed Agents.

## Notes

- The blueprint is a reference implementation to fork and adapt, not a supported product or hosted service.
- Shopping agent grounding: products, prices, availability, and store terms come only from tool results in the conversation; cart writes accept only product IDs that a catalog or order tool returned in that session. Checkout stages a summary the customer confirms in your app; a hosted checkout URL is returned by your back end and rendered by the host without passing through the model.
- Merchant agent writes (listing update, price change, inventory action, promotion, campaign) are staged changes with a server-generated ID shown as a preview card. Guardrails (max price move, promotion depth, restock size, campaign budget, protected fields) are checked at staging and again at apply. A person must approve outside the conversation: a merchant portal button (Messages API), a confirmation prompt in the Agent SDK console, or an always-ask permission policy on the apply tool (Claude Managed Agents). An approval typed in chat approves nothing.
- The Messages API and Agent SDK runtimes run against the Claude API, Amazon Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry, or through your own gateway. The Claude Managed Agents path runs on the Claude API. The repository's deployment guide shows the model ID format each platform expects.
- The plugin also carries six skills (architecture, prompt caching, UI as tools, trust and safety, evals, merchant operations) that load when a Claude Code conversation matches them. These are Claude Code Agent Skills, distinct from the skills of the commerce agents themselves.
- Manual adaptation: implement the shopping or merchant backend interface over your services, switch off missing systems with configuration flags, and set brand name, assistant name, and voice. A pilot can implement search and product details and stub the rest.

## Related

- [Guides to common use cases](./overview.md)
- [Customer support agent](./customer-support-chat.md)
