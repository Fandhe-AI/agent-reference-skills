# Documentation

Guide for contributing documentation changes to ZMK, which uses Docusaurus as its documentation framework.

## Signature / Usage

```bash
# From the docs/ folder
npm ci                    # Install dependencies (first time or after source updates)
npm start                 # Launch local dev server at http://localhost:3000

# Before submitting
npm run prettier:format   # Auto-format
npm run prettier:check    # Verify formatting
npm run lint              # Run linter
npm run build             # Full build check — all must pass
```

## Notes

- Read the [Clean Room Policy](./clean-room.md) before contributing.
- Node.js/npm is required; already included in the ZMK dev container.
- VS Code + Docker users: the local server requires a manual restart after saving changes; auto-reload is not available in that environment.
- Use **American English** spelling and grammar.
- Heading case: Title Case for the first three heading levels; sentence case for all levels below.
- Prettier and lint cannot enforce language conventions — manual review is required.
- All checks (`prettier:check`, `lint`, `build`) must pass before opening a PR.

## Related

- [Clean Room Policy](./clean-room.md)
- [Pull Requests](./pull-requests.md)
