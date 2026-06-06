# AI Skills

Chakra UI provides three Claude Code AI skills — reusable instruction sets that activate automatically based on user requests to streamline Chakra UI v3 development.

## Installation

Install all three skills at once:

```bash
npx skills add https://github.com/chakra-ui/chakra-ui/tree/main/skills
```

Claude Code auto-discovers installed skills; no additional configuration is needed.

## Available Skills

### chakra-ui-builder

Primary skill. Handles component creation, project setup, theming customization, and chart implementation.

- Activates on requests like "make me a login form" or "add Chakra to my Next.js app"
- Outputs complete, runnable code with proper imports
- Applies responsive styles at `base` and `md` breakpoints
- Auto-detects your framework (Next.js App/Pages Router, Vite, Remix)

### chakra-ui-migrate

Guides transitions from v2 to v3. Activates when users encounter breaking changes or ask what changed from v2.

Covers:
- Package changes (`@emotion/styled`, `framer-motion` removal)
- Provider setup adjustments
- Color mode handling changes
- Property renames (e.g., `isDisabled` → `disabled`)
- Compound component rewrites (e.g., `<Modal>` → `<Dialog.Root>`)
- Automated codemod process

### chakra-ui-refactor

Reviews existing code and converts it to v3 patterns. Analyzes code across six dimensions:

| Dimension | Description |
|-----------|-------------|
| Accessibility | ARIA roles, focus management |
| Responsive design | Breakpoint coverage |
| API correctness | v3 prop and component usage |
| Semantic tokens | Token usage instead of raw values |
| Component structure | Compound component patterns |
| Maintainability | Code organization and reuse |

Provides review-only assessment or full refactoring with explanations depending on request type.

## Notes

- Skills use default v3 patterns with v2 fallback when needed
- Dark mode is implemented via semantic tokens
- Framework detection is automatic; no manual configuration required

## Related

- [AI MCP Server](./ai-mcp-server.md)
- [AI LLMs](./ai-llms.md)
- [AI Rules](./ai-rules.md)
- [Installation](./installation.md)
