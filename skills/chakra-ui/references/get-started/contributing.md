# Contributing

Chakra UI welcomes contributions of all sizes — documentation fixes, component demos, bug reports, feature proposals, and code improvements.

## Architecture

Chakra UI v3 is built on two foundational projects:

- **[Zag.js](https://zagjs.com)** — component logic structured as state machines
- **[Ark UI](https://ark-ui.com)** — converts Zag.js state machines into headless UI components

This architecture minimizes the code within Chakra UI itself while delegating logic and accessibility to these specialized libraries.

## Ways to Contribute

1. **Documentation** — fix typos, improve explanations, add missing information
2. **Component demos** — submit PRs to `apps/compositions/src/examples`
3. **Bug reports** — open a GitHub issue with reproduction steps
4. **Feature proposals** — open a discussion on GitHub Discussions
5. **Code quality** — refactoring, performance improvements, test coverage

## Security Vulnerabilities

- Report vulnerabilities via **GitHub Security Advisories** (private), not public issues
- Include: issue type, affected package/version, reproduction steps, and impact assessment
- Security updates are released for the **latest major version only**
- The codebase avoids `dangerouslySetInnerHTML`; all rendering goes through React's JSX

Full security policy: `SECURITY.md` in the main repository.

## Notes

- Current version: 3.34.0
- Repository: [github.com/chakra-ui/chakra-ui](https://github.com/chakra-ui/chakra-ui)

## Related

- [Installation](./installation.md)
- [Migration](./migration.md)
