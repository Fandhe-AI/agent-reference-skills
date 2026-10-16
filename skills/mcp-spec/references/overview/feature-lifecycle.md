---
source: https://modelcontextprotocol.io/community/feature-lifecycle
---

# Feature Lifecycle

Policy for how individual MCP specification features move through Active, Deprecated, and Removed states (adopted via SEP-2596).

## Signature / Usage

Deprecation in `schema.ts` is expressed with a `@deprecated` JSDoc tag referencing the deprecation SEP and the revision in which the deprecation takes effect:

```ts
/**
 * @deprecated <reference to the deprecation SEP and the revision in which the deprecation takes effect>
 */
```

(Placeholder form; the policy prescribes the content of the tag, not an exact string.)

## Options / Props

Feature states:

| State | Meaning | Implementer expectation |
|-------|---------|-------------------------|
| Active | The feature is part of the Current specification revision. | Implement per the feature's normative requirements. |
| Deprecated | The feature remains in the specification but is scheduled for removal. A migration path is documented. | New implementations should not adopt the feature. Existing implementations should migrate before the earliest removal date. |
| Removed | The feature has been deleted from `draft` and will be absent from the next Current revision. It remains documented in the Final revision it last appeared in. | Implementations targeting that next Current revision must not depend on the feature. |

Roles:

| Action | Who |
|--------|-----|
| Propose deprecation, extension, or restoration | Any contributor, per the SEP process |
| Sponsor | A Maintainer or Core Maintainer |
| Approve a deprecation SEP | Core Maintainers |
| Decide a removal during release preparation | Core Maintainers |
| Approve an extension or restoration SEP | Core Maintainers |
| Approve expedited removal | Core Maintainers |

Lead Maintainers retain veto authority over each approval.

## Notes

- Scope: features of the MCP core specification (protocol messages, capabilities, transports, schema types, normative behavioral requirements). The revision lifecycle (Draft, Current, Final) is defined in the versioning guide.
- A Deprecated feature MAY be restored to Active by a SEP that supersedes the deprecation SEP; the minimum window is measured afresh if deprecated again.
- Deprecation criteria: superseded by another feature; security, privacy or interoperability risk; negligible adoption; other reasons the Core Maintainers deem appropriate.
- A deprecation SEP must: identify the feature (link to `schema.ts` and prose); state the rationale; document the migration path (a replacement must be Active in the revision where deprecation takes effect); specify the minimum deprecation window (at least twelve months, measured from the release of the revision in which the feature is first marked Deprecated).
- On Final: `@deprecated` JSDoc tag, a deprecation notice in the prose, a "Deprecated" entry in that revision's `changelog.mdx`, and a row in the deprecated registry.
- Tier 1 SDKs must mark the API surface deprecated using the language's native mechanism in their next release, and should emit a runtime warning when a deprecated feature is exercised. Removal from the specification does not oblige an SDK to drop the feature; that is governed by the SDK's own revision-support policy.
- Removal is at the discretion of the Core Maintainers after the window elapses; features may remain Deprecated much longer.
- Expedited removal: the twelve-month floor may be shortened for an active security risk (published advisory or documented in-the-wild exploitation with no in-place mitigation), but at least ninety days must remain between Deprecated and earliest removal.
- Source: tag `2026-07-28` raw, retrieved 2026-10-16. The page links its deprecated registry at `docs/specification/draft/deprecated.mdx`; for this skill the registry is `deprecated-features.md`.

## Related

- [Deprecated Features](./deprecated-features.md)
- [Key Changes (2026-07-28)](./key-changes.md)
- [Versioning (concepts)](./concepts-versioning.md)
