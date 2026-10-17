# Contributing to Better Auth

Guide for contributing code, plugins, and documentation to the Better Auth open-source project.

## Signature / Usage

```bash
git clone https://github.com/YOUR-USERNAME/better-auth.git
cd better-auth
pnpm install
cp -n ./docs/.env.example ./docs/.env
```

```bash
git remote add upstream https://github.com/better-auth/better-auth.git
git checkout main
git pull upstream main
git checkout -b feature/your-feature-name
pnpm dev          # start the main dev server
pnpm -F docs dev  # start the docs dev server
```

Test instance (import from `better-auth/test`):

```typescript
import { describe, it, expect } from "vitest";
import { getTestInstance } from "better-auth/test";

describe("Feature", () => {
    it("should work as expected", async () => {
        const { client } = await getTestInstance();
        expect(client).toBeDefined();
    });
});
```

## Notes

- Getting started: review existing [issues](https://github.com/better-auth/better-auth/issues) and [pull requests](https://github.com/better-auth/better-auth/pulls), and join [Discord](https://discord.gg/better-auth) for community discussion
- Requires Node.js (LTS preferred) and pnpm
- Bug reports: search "good first issue" labels, include reproduction steps and expected behavior, comment on an issue before starting work to avoid duplicate effort
- Framework integrations: prioritize framework-agnostic solutions, keep integrations minimal and maintainable; all integrations currently live in the main package
- Social provider integrations: review the social provider contribution policy (`CONTRIBUTING.md#social-provider-integrations` in the main repo) before proposing a built-in social provider or provider helper. Community helpers can be developed independently using the Generic OAuth plugin and submitted for listing under Community Provider Helpers in Other Social Providers
- Plugin development: core plugins require an issue discussion first; community plugins can be developed independently following the existing plugin architecture
- Documentation contributions: fix typos/errors, add examples, keep docs in sync with code changes
- Testing uses Vitest, with test files placed alongside their source files; the test instance helper `getTestInstance` is imported from `better-auth/test` and offers `runWithUser(email, password, async (headers) => ...)` and `signInWithTestUser()` (returning `runWithDefaultUser`) for async session context
- For help: open an issue, ask in Discord, or contact maintainers directly

## Related

- [faq](./faq.md)
- [resources](./resources.md)
