# tooling

| Name | Description | Path |
|------|-------------|------|
| eslint-plugin-react-hooks | `eslint-plugin-react-hooks` provides ESLint rules to enforce the Rules of React. | [eslint-plugin-react-hooks.md](./eslint-plugin-react-hooks.md) |
| component-hook-factories | Validates against higher order functions defining nested components or hooks. | [lint-component-hook-factories.md](./lint-component-hook-factories.md) |
| config | Validates the compiler configuration options. | [lint-config.md](./lint-config.md) |
| error-boundaries | Validates usage of Error Boundaries instead of try/catch for errors in child components. | [lint-error-boundaries.md](./lint-error-boundaries.md) |
| exhaustive-deps | Validates that dependency arrays for React hooks contain all necessary dependencies. | [lint-exhaustive-deps.md](./lint-exhaustive-deps.md) |
| gating | Validates configuration of gating mode. | [lint-gating.md](./lint-gating.md) |
| globals | Validates against assignment/mutation of globals during render, part of ensuring that side effects must run outside of render. | [lint-globals.md](./lint-globals.md) |
| immutability | Validates against mutating props, state, and other values that are immutable. | [lint-immutability.md](./lint-immutability.md) |
| incompatible-library | Validates against usage of libraries which are incompatible with memoization (manual or automatic). | [lint-incompatible-library.md](./lint-incompatible-library.md) |
| preserve-manual-memoization | Validates that existing manual memoization is preserved by the compiler. | [lint-preserve-manual-memoization.md](./lint-preserve-manual-memoization.md) |
| purity | Validates that components/hooks are pure by checking that they do not call known-impure functions. | [lint-purity.md](./lint-purity.md) |
| refs | Validates correct usage of refs, not reading/writing during render. | [lint-refs.md](./lint-refs.md) |
| rules-of-hooks | Validates that components and hooks follow the Rules of Hooks. | [lint-rules-of-hooks.md](./lint-rules-of-hooks.md) |
| set-state-in-effect | Validates against calling setState synchronously in an effect, which can lead to re-renders that degrade performance. | [lint-set-state-in-effect.md](./lint-set-state-in-effect.md) |
| set-state-in-render | Validates against unconditionally setting state during render, which can trigger additional renders and potential infinite render loops. | [lint-set-state-in-render.md](./lint-set-state-in-render.md) |
| static-components | Validates that components are static, not recreated every render. | [lint-static-components.md](./lint-static-components.md) |
| unsupported-syntax | Validates against syntax that React Compiler does not support. | [lint-unsupported-syntax.md](./lint-unsupported-syntax.md) |
| use-memo | Validates that the `useMemo` hook is used with a return value. | [lint-use-memo.md](./lint-use-memo.md) |
| React Developer Tools | Use React Developer Tools to inspect React components, edit props and state, and identify performance problems. | [react-developer-tools.md](./react-developer-tools.md) |
| React Performance tracks | React Performance tracks are specialized custom entries that appear on the Performance panel's timeline in your browser developer tools. | [react-performance-tracks.md](./react-performance-tracks.md) |
| Using TypeScript | TypeScript is a popular way to add type definitions to JavaScript codebases. | [typescript.md](./typescript.md) |
