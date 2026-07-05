# Testing

Overview of test types and commonly used tools for testing a Next.js application.

## Types of tests

- **Unit Testing**: individual units in isolation — a function, hook, or component.
- **Component Testing**: focused unit testing of React components — rendering, props, and behavior in response to user events.
- **Integration Testing**: how multiple units (components, hooks, functions) work together.
- **End-to-End (E2E) Testing**: user flows in a production-like environment (a real browser).
- **Snapshot Testing**: captures a component's rendered output and compares it against a saved snapshot to flag unexpected changes.

## Async Server Components

`async` Server Components are new to the React ecosystem and not fully supported by some unit-testing tools (Jest, Vitest currently don't support them). Prefer **End-to-End Testing** over unit testing for `async` components.

## Notes

- See per-tool setup guides: [Jest](./jest.md), [Vitest](./vitest.md), [Playwright](./playwright.md), [Cypress](./cypress.md).

## Related

- [Jest](./jest.md)
- [Vitest](./vitest.md)
- [Playwright](./playwright.md)
- [Cypress](./cypress.md)
