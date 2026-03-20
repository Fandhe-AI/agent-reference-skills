# Related Tooling

Source: https://knip.dev/reference/related-tooling

## Unused Imports & Variables

Knip focuses on exported values across files, not internal variables. Use:

- **ESLint** — find unused variables within files
- **Biome** — linting for unused code
- **oxlint** — unused variable identification
- **remove-unused-vars** — removes unused code within files more aggressively

## Unused Properties

Knip cannot yet identify unused members of types, interfaces, or objects (including React props). Supported: unused enum/class members.

## Circular Dependencies

- **DPDM**
- **Madge**
- **skott**

## Technical Debt Cleanup

- **e18e.dev** — cleanup guidance
